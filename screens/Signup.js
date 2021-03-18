import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import ImagePicker from 'react-native-image-picker';

import FormSection from '../components/FormSection';
import CurvedButton from '../components/CurvedButton';
import DOBPicker from "../components/dob";
import FirestoreRef from "../constants/FirestoreRef";

function Signup(props) {
  console.log('params: ',props.navigation.state.params);
  const [availableWidth, setAvailableWidth] = useState(Dimensions.get('window').width);
  const [fileData, setData] = useState();
  const [fileURI, setURI] = useState();
  const [chosenDate, setChosenDate] = useState();
  const { params } = props.navigation.state;
  const [user, setUser] = useState({
    name: params.name === null ? '' : params.name,
    email: params.email === null ? '' : params.email,
    phoneNumber: params.phoneNumber === null ? '' : params.phoneNumber,
    uid: params.uid === null ? '' : params.uid,
    dob: '',
    account: params.account
  });

  useEffect(() => {
    setUser({ ...user, dob: chosenDate });
  }, [chosenDate]);


  const handleChooseImage = () => {
    let options = {
      title: 'Select Image',
      maxWidth: 100,
      maxHeight: 100,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        alert('User cancelled image picker');
      } else if (response.error) {
        alert('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };        
      }      
      setData(response.data);
      setURI(response.uri);
    });
  }

  const handleChosenDate = (date) => {
    setChosenDate(new Date(date));
  }

  const handleUserValues = (ref, value) => {
    switch (ref) {
      case 'name':

        setUser({ ...user, name: value });
        break;
      
      case 'email':
        setUser({ ...user, email: value });
        break;
      
      case 'phoneNumber':  
          setUser({ ...user, phoneNumber: value });
        break;
      
      default:
        break;
    }
  }

  const onSubmit = () => {
    if(user.name !== '' && user.email !== '' && user.phoneNumber!== ''  && user.dob !== '' && user.uid !== ''){
      FirestoreRef.users.add({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dob: user.dob,
        account: user.account,
        uid: user.uid
      });

      props.navigation.navigate('Home');
    }
    else {
      alert('can\'t leave any blank field!');
    }

  }

  return (
    <View style={styles.container}>
      <View style={{width: availableWidth, ...styles.header}}>
        <Image
          source={require('../img/White-Eduroots-Logo.png')}
          resizeMode="contain"
          style={styles.eduroutesLogo}></Image>
        <Text style={styles.fillFormText}>Fill this Form to Signup</Text>
      </View>
      <View style={styles.scrollArea}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}>
          <Image
            source={
              {
                uri: !fileData  ? params.photoURL : 'data:image/jpg;base64,' + fileData,
              } || {uri: 'data:image/jpg;base64,' + fileData} ||
              require('../img/user_img.png')
            }
            style={{borderRadius: 60, width: 100, height: 100}}
          />
          <CurvedButton text="choose Image" onPress={handleChooseImage} />
          <FormSection
            legend="Name"
            style={styles.formSection}
            value={params.name}
            formName='name'
            handleValue={handleUserValues}
          />
          <DOBPicker dob={handleChosenDate} />
          <FormSection
            legend="Email"
            style={styles.formSection}
            value={params.email}
            formName='email'
            handleValue={handleUserValues}
          />
          <FormSection
            legend="PhoneNumber"
            style={styles.formSection}
            value={params.phoneNumber}
            textContentType="telephoneNumber"
            keyboardType="numeric"
            maxLength={13}
            formName='phoneNumber'
            handleValue={handleUserValues}
          />
          <CurvedButton text="Register" onPress={onSubmit}/>
        </ScrollView>
      </View>
    </View>
  );
  
  }
  export default Signup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  header: {
    flex:1.25,
    backgroundColor: "rgba(255,255,255,1)",
  },
  eduroutesLogo: {
    width: 200,
    height: 121,
    marginTop: 26
  },
  fillFormText: {
    color: "#121212",
    fontFamily: "roboto-regular",
    marginLeft: 11
  },
  socialAuthView: {
    flex:0.5,
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: 'center',
    alignItems:'center',
    // position: "absolute"
  },
  signUpUsing: {
    color: "#121212",
    fontFamily: "roboto-regular",
  },
  googleIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    width: 40,
    height:40,
  },
  facebookIcon: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    width: 40,
    height:40,
  },
  googleIconRow: {
    height: 30,
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 153,
    marginRight: 153
  },
  scrollArea: {
    flex:3,
    backgroundColor: "rgba(255 , 255, 255,1)",
  },
  scrollArea_contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems:'center',
  },

  formSection: {
    marginVertical:15,
  },
});