import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
} from 'react-native';

import FirestoreRef from '../constants/FirestoreRef';
import Content from '../components/ContentView';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

function Home(props) {
  const [sectionArr, setSectionArr] = useState([]);
  
  useEffect(() => {    
    var coursesArr = []
    FirestoreRef.courses.get().then(snapshot => {
      var tempcoursesArr = [];
      snapshot.forEach(doc => {
        tempcoursesArr.push({
          categoryId: doc.get('categoryId'),
          courseLink: doc.get('courseLink'),
          courseName: doc.get('courseName'),
        });
        coursesArr = tempcoursesArr;
      });
    });

    FirestoreRef.categories.get().then(snapshot => {
      const tempArr = [];
      snapshot.forEach(doc => {
        const courses = coursesArr.filter(
          course => course.categoryId === doc.get('id'),
        );
        tempArr.push({title: doc.get('name'), data: courses, id: doc.id});
      });
      setSectionArr(tempArr);
    });

  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <ImageBackground
          source={require('../img/White-Eduroots-Logo.png')}
          resizeMode="contain"
          style={styles.headerLogo}></ImageBackground>
        <Text style={styles.categories}>Categories</Text>
      </View>
        <Content setContent={sectionArr} />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white,
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
});

export default Home;
