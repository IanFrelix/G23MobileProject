import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList } from 'react-native';
import Logo from '../../../assets/G23Images/musicnote.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {


    const [firstName, setFirstName] = useState(''); 
    const [lastName, setlastName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignUpPressed = async () => {

        var obj = {firstName, lastName, email, password};
        var js = JSON.stringify(obj);
        var url = 'https://tunetable23.herokuapp.com/users';

        await fetch(url, {method: 'POST', body:js, headers:{'Content-Type':'application/json'}})
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                console.warn(res.message);

                console.log(obj)
                navigation.navigate('SignIn');
            }
            else {
                console.warn(res);
            }
        })

        // console.log(obj)
        // navigation.navigate('SignIn');
    }

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.base}>
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

                <CustomButton 
                    text="Create Account" 
                    onPress={onSignUpPressed} 
                />

                <CustomButton 
                    text="Already have an account? Sign in here!" 
                    onPress={onSignInPress} 
                    type="TERTIARY" 
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    base: {
        flex: 1,
        backgroundColor: '#3d3d3d'
    },

    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#3d3d3d'
    },

    logo: {
        width: '95%',
        maxWidth: 500,
        maxHeight: 100,

    },
});
export default RegisterScreen