import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
    return (
        <Pressable 
            onPress={onPress} 
            style={[
                styles.container, 
                styles[`container_${type}`],
                bgColor ? {backgroundColor: bgColor} : {}
            ]}>
            <Text 
                style={[
                    styles.text, 
                    styles[`text_${type}`],
                    fgColor ? {color: fgColor} : {}
                ]}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#D2735C'
    },

    container_PRIMARY: {
        backgroundColor: '#372C2E',
    },

    container_TERTIARY: {
        borderWidth: 0
    },

    container_SECONDARY: {
        backgroundColor: '#F33B3B',
        borderWidth: 0
    },
    
    container_SEARCH: {
        flexDirection: 'row',
        width: '30%',
        backgroundColor: '#3B71F3',
        borderWidth: 0
    },

    container_FRIEND: {
        flexDirection: 'row',
        backgroundColor: '#3B71F3',
        borderWidth: 0
    },

    container_ADD: {
        flexDirection: 'row',
        backgroundColor: '#D2735C',
        borderWidth: 0
    },

    container_UNFRIEND: {
        flexDirection: 'row',
        backgroundColor: '#F33B3B',
        borderWidth: 0
    },

    container_BLOCK: {
        flexDirection: 'row',
        backgroundColor: '#24243D',
        borderWidth: 0
    },
    
    container_SPOTIFY: {
        flexDirection: 'row',
        backgroundColor: '#1ED760',
    },

    container_LIKE: {
        flexDirection: 'row',
        backgroundColor: '#DB7093'
    },

    container_UNLIKE: {
        flexDirection: 'row',
        backgroundColor: '#FF69B4'
    },

    container_CANCEL: {
        padding: 5,
        flexDirection: 'row',
        borderWidth: 0
    },

    container_POST: {
        width: '30%',
        padding: 8,
        backgroundColor: '#372C2E'
    },

    container_SUBMIT: {
        width: '70%',
        height: '10%',
        padding: 8,
        backgroundColor: '#241B19',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_TERTIARY: {
        color: 'gray',
    },

    text_CANCEL: {
        color: 'black',
        fontSize: 24
    },

    text_SUBMIT: {
        fontSize: 40
    },

    text_SPOTIFY: {
        color: 'black'
    }
})

export default CustomButton