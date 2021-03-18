import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Navigator from './navigation/Navigator';
import Result from './screens/ResultScreen';
import QuizNav from './navigation/QuiztoResultNav';

export default function App() {
  return (
      <View style={styles.screen}>
      <Navigator />
      {/* <QuizNav /> */}
      {/* <Result marksObtained={0} totalMarks={10} /> */}
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});