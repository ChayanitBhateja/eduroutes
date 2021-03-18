import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import Colors from '../constants/colors';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import firestore from '@react-native-firebase/firestore';

import CurvedButton from '../components/CurvedButton';
import WideButton from '../components/socialAuthWideBtn';

const userDb = firestore().collection('users');

const Signin = props => {
  const [availableWidth, setAvailableWidth] = useState(
    Dimensions.get('window').width,
  );
  const [availableHeight, setAvailableHeight] = useState(
    Dimensions.get('window').height,
  );
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [confirmation, setConfirmation] = useState(null);
  const [otp, setOTP] = useState();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const { navigation } = props;

  console.log('====================================');
  console.log(navigation.getParam('userInDb'));
  console.log('====================================');

  let GoogleFlag = false;
  let FbFlag = false;

  const onAuthStateChanged = async (user) => {
    console.log('inside onAuthStateChanged');
    console.log('user: ', user);
    setUser(user);
    
    if (confirmation != null && user != null) {
      const snapshot = await userDb.where('phoneNumber', '==', phoneNumber).get();
      navigation.navigate(snapshot.empty ? 'Signup' : 'Home',  {
        name: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        uid: user.uid,
        account: 'phone',
      })
    }
    if (initializing) { 
      setInitializing(false);
    }
  };

  const updateDimensions = () => {
    setAvailableWidth(Dimensions.get('window').width);
    setAvailableHeight(Dimensions.get('window').height);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', updateDimensions);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
      subscriber;
    };
  });

  if (initializing) return null;

  const handleVerify = async () => {
    let pattern = /^\+([0-9]{2})\)?(\d{10})?$/;
    if (pattern.test(phoneNumber)) {
      const confirm = await auth().signInWithPhoneNumber(phoneNumber,true);
      setConfirmation(confirm);
       
    } else {
      alert(
        'Phone number is incorrect, make sure you use +91 in front of phone number and without spaces',
      );
    }
  };

  const handleSignin = async () => {
    let pattern = /^(\d{6})?$/;
    if (pattern.test(otp)) {
      try {
        setUser(await confirmation.confirm(otp));        
        const params =   {
          name: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          uid: user.uid,
          account: 'phone',
        }
        const phoneNumberSnapshot = await userDb.where('phoneNumber', '==', phoneNumber).get();       
        navigation.navigate(phoneNumberSnapshot.empty ? 'Signup' : 'Home', params);
      } catch (e) {
        alert("can't confirm OTP");
      }
    } else {
      alert('incorrect OTP');
    }
    /**
     * it is used with auth().verifyPhoneNumber();......
     * */
    // const authCredential = auth.PhoneAuthProvider.credential(confirmation.verificationId, otp);
    // console.log('authCredential: ', authCredential);
    // setUser(auth().signInWithCredential(authCredential));
  };

  const handleGoogleSignin = async () => {
    GoogleSignin.configure({
      webClientId:
        '581174260152-3au0is6s1neg16lur5vp9l1b114nid4s.apps.googleusercontent.com',
      forceConsentPrompt: true,      
    });
    GoogleSignin.hasPlayServices();
    const user = await GoogleSignin.signIn(); 
    const credential = auth.GoogleAuthProvider.credential(
      user.idToken,
      user.AccessToken,
    );

    const userCredential = await auth().signInWithCredential(credential);
    if (userCredential != null) {
      const {user, additionalUserInfo} = userCredential;
      if (additionalUserInfo.isNewUser) {
        firestore()
          .collection('users')
          .where('email', '==', user.email)
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              navigation.navigate('Signup', {
                name: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                uid: user.uid,
                account: 'google',
              });
            } else {
              navigation.navigate('Home', {
                name: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                uid: user.uid,
                account: 'google',
              });
            }
          });
      } else {        
        navigation.navigate('Home', {
          name: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          uid: user.uid,
          account: 'google',
        });
      }
      GoogleFlag = true;
    }
  };

  const handleFacebookLogin = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw new Error('user cancelled login process');
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Error obtaining Access Token');
    }

    const authCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    const userCredential = await auth().signInWithCredential(authCredential);
    if (userCredential !== null) {
      const {user, additionalUserInfo} = userCredential;
      if (additionalUserInfo.isNewUser) {
        userDb
          .where('email', '==', user.email)
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              navigation.navigate('Signup', {
                name: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                uid: user.uid,
                account: 'facebook',
              });
            } else {            
              navigation.navigate('Home', {
                name: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                uid: user.uid,
                account: 'facebook',
              });
            }
          });
      } else {
        navigation.navigate('Home', {
          name: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          uid: user.uid,
          account: 'facebook',
        });
      }

      FbFlag = true;
    }
  };

  const handleSignout = () => {
    if (GoogleFlag) {
      GoogleSignin.signOut();
      setUser(null);
      GoogleFlag = false;
    }
    else if (FbFlag) {
      LoginManager.logOut();
      setUser(null);
      FbFlag = false;
    }
    else {
      setUser(null);
      auth().signOut();
    }

  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../img/White-Eduroots-Logo.png')}
            style={{
              width: availableWidth / 2,
              height: availableHeight / 10,
              marginTop: availableHeight / 10,
            }}
          />
          <Text style={styles.welcomeText}>Welcome Back,</Text>
          <Text style={styles.signinText}>Sign in</Text>
        </View>
        <View style={styles.phoneAuth}>
          <View style={styles.phoneInput}>
            <TextInput
              placeholder="Enter Phone Number"
              onChangeText={number => {
                let num = number.replace('.', '');
                if (!NaN) {
                  setPhoneNumber(num);
                }
              }}
              value={phoneNumber}
              style={{
                borderBottomColor: Colors.active_grey,
                borderBottomWidth: 1,
              }}
              textContentType="telephoneNumber"
              keyboardType="numeric"
              maxLength={13}
            />
            <CurvedButton
              text="verify"
              style={{
                backgroundColor: 'green',
                width: 80,
                height: 30,
                marginTop: 10,
                marginLeft: 20,
              }}
              onPress={handleVerify}
            />
          </View>
          <TextInput
            placeholder="Entere OTP"
            style={styles.otpInput}
            onChangeText={text => setOTP(text)}
            value={otp}
          />
          <CurvedButton
            text="Sign in"
            style={styles.signinBtn}
            onPress={handleSignin}
          />
        </View>
        <View style={styles.socialAuth}>
          <WideButton
            source={require('../img/google_icon_img.png')}
            onPress={handleGoogleSignin}
            style={{marginBottom: 10}}>
            {' '}
            Sign in with Google
          </WideButton>
          <WideButton
            source={require('../img/facebook.png')}
            onPress={handleFacebookLogin}>
            {' '}
            Login with Facebook
          </WideButton>
          <CurvedButton
   text="Sign out"
   style={styles.signinBtn}
   onPress={handleSignout}
 />
        </View>
      </View>
    </ScrollView>
  );
  // return (
  //   <View>
  //     <Text>This is Signin Screen</Text>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header: {
    flex: 0.5,
  },

  welcomeText: {
    color: Colors.active_grey,
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 23,
  },

  signinText: {
    color: Colors.active_grey,
    marginLeft: 20,
    marginTop: 5,
    fontSize: 18,
  },

  phoneAuth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  phoneInput: {
    flexDirection: 'row',
    marginLeft: 100,
  },

  otpInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

  signinBtn: {
    marginTop: 30,
  },

  socialAuth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Signin;
