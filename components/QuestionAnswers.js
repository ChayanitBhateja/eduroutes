import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';

import CurvedButton from '../components/CurvedButton';
import fonts from '../constants/fonts';
import colors from '../constants/colors';

const QAComponent = props => {
  const toggleMarks = useRef(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [disableOption, setDisableOption] = useState(false);

  const questions = props.question.item;
  
  console.log('toggleMarks: ',toggleMarks.current);
  
  const handleOnPress = () => {
    props.nextBtnPress({counter:1, marksObtained:toggleMarks.current})
  }

  const handleOptionPress = (selectedOption) => {
    let marks = 0;
    console.log('selectedOption: ',selectedOption);

    
    if (selectedOption === questions.answer) {
      marks = 1;
    }
    toggleMarks.current = marks;    
    setShowAnswer(true);
  }

  useEffect(() => {
    if(showAnswer){
    setDisableOption(true);}
  }, [showAnswer]);


    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../img/White-Eduroots-Logo.png')}
          resizeMode="contain"
          style={styles.headerLogo}
          imageStyle={styles.headerLogo_imageStyle}
        />
        <Text style={styles.question}>Question: {questions.question}</Text>
        <FlatList data={questions.options} keyExtractor={(item, index) => index} renderItem={(option) => {          
           return (
            <TouchableOpacity
              disabled={disableOption}
              style={{...styles.options, backgroundColor:disableOption? colors.inactive_grey : colors.white}}
              onPress={handleOptionPress.bind({}, option.item)}>
              <Text style={{color: disableOption? colors.white : '#000000'}}>{option.item}</Text>
            </TouchableOpacity>
          );
        }} />
        <View style={styles.answer}>
          {showAnswer && <Text style={styles.answerText}>Answer: {questions.answer}</Text>}
          <CurvedButton
            style={styles.nextButton}
            onPress={handleOnPress}
            text="next"
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 1.15,
    // height: 500,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    flex: 1,
  },
  headerLogo: {
    height: 107,
  },

  question: {
    fontFamily: fonts.open_sans_bold,
    paddingHorizontal: 10,
  },

  options: {
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answer: {
    marginTop: 10,
    alignItems: 'center',
  },

  answerText: {
    color: colors.accent,
    fontSize: 18,
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
});

export default QAComponent;