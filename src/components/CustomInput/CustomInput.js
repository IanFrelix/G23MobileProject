import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {

    return (
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input} 
            secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4F7A9E',
        width: '100%',
        borderColor: '#C33C54',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 10,
    },
    input: {
        
    },
    
});
export default CustomInput