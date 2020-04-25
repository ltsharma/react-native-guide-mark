import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ButtonProps } from './types';

const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: '#e1e000',
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brightBtnText: {
        padding: 10,
        paddingHorizontal: 30,
    },
});
function GuideButton({ style, title, textStyle, onPress }: ButtonProps): React.ReactElement {
    return (
        <TouchableOpacity style={[styles.btnContainer, style]} onPress={onPress}>
            <Text style={[styles.brightBtnText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}
export default GuideButton;
