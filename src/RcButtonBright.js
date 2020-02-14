import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

function RcButtonBright(props) {
  let {
    style,
    title,
    textStyle,
    onPress,
  } = props;
  return (
    <TouchableOpacity style={
      [inverted?styles.invertBrightBtn:styles.signInButtonContainer,style]
    } onPress={onPress}>
      <Text style={[inverted?styles.InvertedbrightBtnText:styles.brightBtnText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
RcButtonBright.prototype = {
  active: PropTypes.bool,
  title: PropTypes.string
};
RcButtonBright.defaultProps = {
  event:{
    name:null,
      desc:null,
      id:0
  }
};
export default RcButtonBright;
const styles = StyleSheet.create({
    invertBrightBtn: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },
  signInButtonContainer: {
      backgroundColor: '#e1e000',
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center'
},
    brightBtnText: {
      padding: 10,
      paddingHorizontal:30
  },
    InvertedbrightBtnText: {
      color:"#ffffff",
      padding: 10,
      paddingHorizontal:30
  }
});
