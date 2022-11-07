import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CustomHeader = () => {
    return (
        <View>
            <Text style={styles.text}>
                TuneTable23 
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontweight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 10,
    },
    
});

export default CustomHeader;