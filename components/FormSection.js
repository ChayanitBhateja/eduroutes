import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import colors from '../constants/colors';

let validationColor = colors.inactive_grey;
const FormSection = props => {
    const [enteredText, setEnteredText] = useState();
  const [validationColor, setValidationColor] = useState(colors.inactive_grey);
  
  useEffect(() => {
    setEnteredText(props.value);
  },[])

    useEffect(() => {
        if (enteredText != null) {            
            if (enteredText == '') {
              setValidationColor(colors.failed);
            } else if (enteredText.length > 0) {
              setValidationColor(colors.success);
            }
            props.handleValue(props.formName, enteredText);
        }
    },[enteredText]);

    const handleText = (txt) => {
        setEnteredText(txt);
    }

    let legend = props.legend;
  return (
    <View
      style={{
        borderColor: validationColor,
        ...styles.formSection,
        ...props.style,
      }}>
      <View style={styles.formTextView}>
        <Text style={styles.formText}>{legend}</Text>
      </View>
      <TextInput
        style={styles.Input}
        placeholder={'Enter ' + legend}
        onChangeText={handleText}
        value={enteredText}
        keyboardType={props.keyboardType}
        textContentType={props.textContentType}
        maxLength={props.maxLength}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    formSection: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        width:Dimensions.get('window').width / 1.15,
      },
    
      formTextView: {
        position: 'absolute',
        top: -17,
        marginLeft:15,
      },
      formText: {
        backgroundColor: 'white',
        padding: 5,
      },
});

export default FormSection;