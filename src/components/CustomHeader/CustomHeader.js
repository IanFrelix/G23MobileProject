import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CustomHeader = () => {
    return (
        <View>
            <Text style={styles.text}>
                tunetable!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontweight: 'bold',
        fontSize: 40,
        textAlign: 'center',
        marginVertical: 10,
        color: '#D2735C'
    },
    
});

export default CustomHeader;