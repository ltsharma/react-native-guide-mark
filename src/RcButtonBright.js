import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

function RcButtonBright(props) {
  let {
    style,
    title,
    textStyle,
    onPress
  } = props;
  return (
    <TouchableOpacity style={
      [styles.btnContainer,style]
    } onPress={onPress}>
      <Text style={[styles.brightBtnText, textStyle]}>{title}</Text>
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
  btnContainer: {
      backgroundColor: '#e1e000',
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center'
},
    brightBtnText: {
      padding: 10,
      paddingHorizontal:30
  }
});
