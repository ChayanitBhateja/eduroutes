import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DOBPicker = props => {
  const [chosenDate, setDate] = useState(new Date());
    const [validationColor, setValidationColor] = useState(colors.inactive_grey);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  useEffect(() => {
        if (chosenDate != null) {            
            if (chosenDate.toString() == '') {
              setValidationColor(colors.failed);
            } else if (chosenDate.toString().length > 0) {
              setValidationColor(colors.success);
              props.dob(chosenDate);
            }
        }
        
    setShow(false);
    }, [chosenDate]);


  const handleDateChange = (newDate) => {
    setDate(newDate.nativeEvent.timestamp);
    }
  
  const showMode = currentMode => {
      
  console.log('====================================');
  console.log('reached here...');
  console.log('====================================');
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
    
    return (
      <TouchableOpacity
        style={styles.touchableBoundary}
        onPress={showDatepicker}>
        <View
          style={{
            borderColor: validationColor,
            ...styles.formSectionContainer,
            ...props.style,
          }}>
          <View style={styles.formTextView}>
            <Text style={styles.formText}>DOB</Text>
          </View>
          <View style={styles.Input}>
            <Text >{moment(chosenDate).format('MM Do YYYY ,hh:mm').substr(0,12)}</Text>
            </View>
          {show && (
            <DateTimePicker
              minimumDate={new Date(1980, 1, 1)}
              maximumDate={new Date()}
              mode={mode}
              value={new Date(chosenDate)}
              onChange={handleDateChange}
              display="default"
            />
          )}
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  touchableBoundary: {
    padding:5,
  },
  formSectionContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 10,
    width: Dimensions.get('window').width / 1.15,
    height: 50,
  },
  formTextView: {
    position: 'absolute',
    marginTop:-10,
    marginLeft: 15,   
  },
  formText: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },

  Input: {
    justifyContent: 'center',
    marginLeft:5,
  },
});

export default DOBPicker;