import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';

const CurvedButton = props => {
  
    return (        
      <TouchableOpacity  style={{...styles.button, ...props.style}} onPress={props.onPress}>
          <Text style={styles.txt}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 45,
    backgroundColor:Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },

  txt: {
    color: 'white',
  },
});

export default CurvedButton;