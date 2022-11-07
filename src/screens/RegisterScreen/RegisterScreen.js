import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/G23Images/musicnote.png';
import CustomInput from '../../components/CustomInput';

const RegisterScreen = () => {

    const [firstName, setFirstName] = useState(''); 
    const [lastName, setlastName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    

    const {height} = useWindowDimensions();
    return (
        <View style={styles.root}>
            <Image source={Logo} 
            style={[styles.logo, {height: height * 0.3}]} 
            resizeMode="contain"/>

            <CustomInput 
            placeholder="First Name" 
            value={firstName} 
            setValue={setFirstName}
            />

            <CustomInput 
            placeholder="Last Name" 
            value={lastName} 
            setValue={setlastName}
            />

            <CustomInput 
            placeholder="Email" 
            value={email} 
            setValue={setEmail}
            />

            <CustomInput 
            placeholder="Password" 
            value={password} 
            setValue={setPassword}
            secureTextEntry
            />
        </View>
    );
};

const styles = StyleSheet.create({

    root: {
        alighnItems: 'center',
        padding: 20,
    },

    logo: {
        width: '95%',
        maxWidth: 500,
        maxHeight: 100,

    },
});
export default RegisterScreen