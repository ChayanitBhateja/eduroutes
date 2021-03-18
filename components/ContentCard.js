import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

import fonts from '../constants/fonts';

const CourseCard = props => {
    return (
      <View style={styles.container}>
        <WebView
          allowsFullscreenVideo={true}
          style={styles.webview}
          source={{uri: props.link}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
        <Text style={styles.text}>{props.name}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 300,
    padding: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.open_sans_regular,
  },
});

export default CourseCard;