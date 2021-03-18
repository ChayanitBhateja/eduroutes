import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import colors from '../constants/colors';
import FirestoreRef from '../constants/FirestoreRef';

const SplashScreen = props => {

  const handleImageLoaded = () => {    
    setTimeout( handleUserCheck,3000);
  }

  const handleUserCheck =async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userExistInDb = await FirestoreRef.users
        .where('uid', '==', user.uid)
        .get();
      props.navigation.navigate(userExistInDb.empty ? 'Signin' : 'Home', {
        userInDb: !userExistInDb.empty,
      });
    }   
    else {
      props.navigation.navigate('Signin');
    }
  }

    return (
      <View style={styles.screen}>
        <Image
    source={require('../img/White-Eduroots-Logo.png')}
          resizeMode="contain"
          onLoadEnd={handleImageLoaded}
          style={styles.headerLogo}></Image>
            </View>
  );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    justifyContent: 'center',
        backgroundColor:colors.white,
    },
      headerLogo: {
        height: 180,
      },
});

export default SplashScreen;