import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';

const Header = props => {
  return(
      <View style={styles.container}>
      <Text style={{ ...props.style, ...styles.headerText }}>
              {props.children}
          </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    padding:5
  },
  headerText: {
    // fontWeight: 'bold',
    fontFamily:fonts.open_sans_regular,
    flexGrow: 1,
    color: colors.white,
  },
});

export default Header;