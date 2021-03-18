import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../constants/colors';
import CurvedButton from '../components/CurvedButton';

const Result = props => {
    const { params } = props.route;
    console.log(params);
    
    const handleOnPress = () => {
        props.navigation.goBack();
        // props.navigation.popToTop();
    } 
    return(
        <View style={styles.container}>
          <View style={styles.resultBox}> 
              <View style={styles.heading}>
              <Text style={styles.resultText}>Result</Text>
              </View>
              <View style={styles.body}>
                  <Text style={{color:  props.marksObtained > 0 ? colors.success : colors.failed, ...styles.marks}}>{params.marksObtained}</Text>
                  <Text style={{color:colors.active_grey,...styles.marks}}>out of</Text>
                  <Text style={styles.marks}>{params.totalMarks}</Text>
              </View>
          </View>
          <CurvedButton style={styles.backButton} onPress={handleOnPress} text='Done' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    resultBox: {
        borderColor: colors.accent,
        borderWidth: 1,
        width: Dimensions.get('window').width / 1.65,
        height: Dimensions.get('window').height / 3,
        borderRadius: 30,
        overflow:"hidden",
    },

    heading: {
        flex: 1,
        backgroundColor: colors.accent,
        justifyContent: 'center',
        alignItems:'center'
    },

    resultText: {
        fontSize: 24,
        color:colors.white,
    },

    body: {
        flex: 3,
        justifyContent: 'center',
        alignItems:'center',
    },

    marks: {
      fontSize:32,
    },

    backButton: {
        marginTop: 20,
    },
});

export default Result;