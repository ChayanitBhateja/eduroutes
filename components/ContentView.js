import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Header from './ContentHeader';
import CourseCard from './ContentCard';

const Content = props => {
    const content = props.setContent;
    const handleRenderItem = (items, index) => {
      const details = items.item.data;
      return (
        <View style={styles.container}>
          <Header style={styles.headerText}>{items.item.title}</Header>
          <FlatList
            data={details}
            horizontal={true}
            keyExtractor={(item, index) => {
              return item.courseLink;
            }}
            renderItem={items => {
              return (
                <CourseCard
                  link={items.item.courseLink}
                  name={items.item.courseName}
                />
              );
            }}
          />
        </View>
      );
    };
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={content}
          renderItem={handleRenderItem}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 25,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
  },

  courseCardView: {
    marginLeft: 10,
  },
});

export default Content;