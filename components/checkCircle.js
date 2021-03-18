import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../constants/colors';


const Circle = props => {
  const [availableWidth, setWidth] = useState(Dimensions.get('window').width);
  const [availableHeight, setHeight] = useState(
    Dimensions.get('window').height,
  );

  useEffect(() => {
    const updateDimensions = () => {
      setWidth(Dimensions.get('window').width);
      setHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateDimensions);

    return Dimensions.removeEventListener('change', updateDimensions);
  }, []);

  let selected = props.setSelected;

  let image = selected ? (
    <View style={styles.imageView}>
      <Image source={require('../img/Green-Tick.png')} style={styles.tick} />
    </View>
  ) : null;


  return (
    <View
      style={{
        width: availableWidth / 3.5,
        height: availableHeight / 7,
      }}>
      {image}
      <TouchableOpacity
        onPress={() => props.handlePress(props.id)}
        style={{
          width: availableWidth / 3.6,
          height: availableHeight / 7,
          ...styles.studentCircle,
        }}>
        <Text style={{...styles.studentText, color: selected ? colors.active_grey : colors.inactive_grey}}>
          {props.children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  studentCircle: {
    borderRadius: 60,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  imageView: {
    elevation: 10,
  },

  tick: {
    width: 25,
    height: 25,
    // marginLeft:100,
    position: 'absolute',
    right: 15,
  },

  studentText: {
    fontWeight: 'bold',
  },
});

export default Circle;
