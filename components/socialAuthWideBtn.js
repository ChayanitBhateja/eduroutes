import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

const WideButton = props => {
  return (
    <TouchableOpacity
      style={{...props.style, ...styles.googleSignIn}}
      onPress={props.onPress}>
      <Image source={props.source} />
      <Text style={styles.signinText}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    googleSignIn: {
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: Dimensions.get('window').width / 1.75,
        height: Dimensions.get('window').height / 12,
      },
});

export default WideButton;