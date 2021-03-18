import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import CurvedButton from '../components/CurvedButton';
import Colors from '../constants/colors';
import Circle from '../components/checkCircle';
import colors from '../constants/colors';

const Seperator = ({label}) => (
  <View style={styles.midSection}>
    <View style={styles.midLeft}></View>
    <View>
      <Text style={styles.or}>{ label }</Text>
    </View>
    <View style={styles.midRight}></View>
  </View>
);

Seperator.defaultProps = {
    label: 'OR'
};

const Welcome = props => {
  const [availableWidth, setAvailableWidth] = useState(
    Dimensions.get('window').width,
  );
  const [availableHeight, setAvailableHeight] = useState(
    Dimensions.get('window').height,
  );
  const [selected, setSelected] = useState(null);

  const {navigation} = props;

  useEffect(() => {
    const updateDimensions = () => {
      setAvailableWidth(Dimensions.get('window').width);
      setAvailableHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateDimensions);
  }, []);

  const handleSignin = () => {
    navigation.navigate('Signin');
  };
  const handleCircleChange = type => {
    setSelected(type);
  };

  const handleSignup = () => {
    const selections = ['student', 'corp', 'phd'];
    if (selections.indexOf(selected) !== -1) {
      navigation.navigate('Signup', {userSelection: selection});
    } else {
      alert('Make a selection');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.upper}>
        <View>
          <Image
            source={require('../img/White-Eduroots-Logo.png')}
            style={{width: availableWidth / 1.25, height: availableHeight / 5}}
          />
        </View>
        <CurvedButton
          text="Sign in"
          onPress={handleSignin}
          style={({backgroundColor: Colors.accent}, styles.button)}
        />
      </View>
          <Seperator />
          <Seperator label="AND" />
      <View style={styles.lower}>
        <Text style={styles.signUpText}>Sign up as</Text>
        <View
          style={{
            ...styles.circlesGroup,
            width: availableWidth / 1.15,
            height: availableHeight / 6,
          }}>
          <Circle
            id="student"
            handlePress={handleCircleChange}
            setSelected={selected === 'student'}>
            Student
          </Circle>
          <Circle
            id="corp"
            handlePress={handleCircleChange}
            setSelected={selected === 'corp'}>
            Corporate
          </Circle>
          <Circle
            id="phd"
            handlePress={handleCircleChange}
            setSelected={selected === 'phd'}>
            Ph.D
          </Circle>
        </View>
        <TouchableOpacity
          style={{
            ...styles.signUpButton,
            width: availableWidth / 1.15,
            height: availableHeight / 15,
          }}
          onPress={handleSignup}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View>
      <Text>this is Welcome Screen</Text>
    </View>
  );
  
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },

  upper: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    marginTop: 50,
  },

  midSection: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-evenly',
  },
  midLeft: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:colors.active_grey,
    width: Dimensions.get('window').width / 2.25,
    height: 1,
    marginVertical: Dimensions.get('window').height / 45,
  },

  or: {
    fontSize: 25,
    color: colors.active_grey,
  },

  midRight: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.active_grey,
    width: Dimensions.get('window').width / 2.25,
    marginVertical: Dimensions.get('window').height / 45,
    height: 1,
  },

  lower: {
    flex: 1,
    backgroundColor: colors.accent,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    marginTop: 20,
    alignItems: 'center',
  },

  signUpText: {
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 30,
    fontSize: 24,
  },

  circlesGroup: {
    flexDirection: 'row',
    marginVertical: 40,
    justifyContent: 'space-evenly',
  },

  signUpButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.active_grey,
    justifyContent: 'center',
  },

  createAccountText: {
    paddingLeft: 15,
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.active_grey,
  },
});

export default Welcome;
