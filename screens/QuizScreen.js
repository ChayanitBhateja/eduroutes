import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { Picker } from "@react-native-community/picker";

import colors from '../constants/colors';
import FirestoreRef from '../constants/FirestoreRef';
import fonts from '../constants/fonts';
import QAComponent from '../components/QuestionAnswers';

const Quiz = props => {
  const [selected, setSelected] = useState(); 
  const [docs, setDocs] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [counter, setCounter] = useState(0);

  const marksObtained = useRef(0);

  
  useEffect(() => {
    console.log('inside first useEffect');
    //try....
    marksObtained.current = 0
    var tempDocs = []
    FirestoreRef.categories.get().then(snapshot => {
      snapshot.forEach(doc => {
        tempDocs.push(doc.get('name'))
      })
      setDocs(tempDocs);
    })
    var questionsArr = [] 
    FirestoreRef.mcq.get().then(snapshot => {
      snapshot.forEach(doc => {
        questionsArr.push(doc.data());
      })
      setQuestions(questionsArr);
    })
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      setCounter(0),
        marksObtained.current = 0;
    })

    return unsubscribe;
  },[props.navigation])

  var filteredQuestions = questions.filter(question => {
    return question.categoryName === selected;
  });

  const handleQuestionsRender = (questionData) => {
    if (questionData.index === counter && counter <= filteredQuestions.length) {
      return <QAComponent question={questionData} nextBtnPress={handleNextPress} />;
    }
    else if (counter >= filteredQuestions.length) {
      return (
        props.navigation.navigate('Result', { marksObtained: marksObtained.current, totalMarks: filteredQuestions.length }))
    }
  }
  const handleNextPress = (next) => {
    setCounter(counter + next.counter);
    marksObtained.current = marksObtained.current + next.marksObtained;
  }
  useEffect(() => {
    console.log('inside questions useEffect');
    setCounter(0);
    marksObtained.current = 0;
  }, [selected]);

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <ImageBackground
          source={require('../img/White-Eduroots-Logo.png')}
          resizeMode="contain"
          style={styles.headerLogo}
          imageStyle={styles.headerLogo_imageStyle}></ImageBackground>
        <Text style={styles.categories}>Enter your area of Interest</Text>
      </View>
      <Picker
        style={styles.dropdown}
        selectedValue={selected}
        onValueChange={value => { setSelected(value)}}>
        {docs.map((doc, index) => {
          return <Picker.Item label={doc} value={doc} key={index} />;
        })}
      </Picker>
      <FlatList
        contentContainerStyle={styles.questions}        
        data={filteredQuestions}
        renderItem={handleQuestionsRender}
        keyExtractor={(item) =>item.question}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  
  headerView: {
    height: 140,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  headerLogo: {
    height: 107,
  },

  categories: {
    color: colors.accent,
    fontSize: 22,
    fontFamily: fonts.open_sans_bold,
    marginTop: 1,
    marginLeft: 12,
  },

  dropdown: {
    height: 50,
    marginLeft: 5,
    width: "60%",
    color: '#344953',
    justifyContent: 'center',
  },

  questions: {
    alignItems: 'center'
  },

});

export default Quiz