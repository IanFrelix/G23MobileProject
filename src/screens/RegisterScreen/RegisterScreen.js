import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import Logo from '../../../assets/G23Images/musicnote.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {

    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [result, setResult] = useState('');
    
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignUpPressed = async () => {

        var obj = {firstName, lastName, username, email, password};
        var js = JSON.stringify(obj);
        var url = 'https://tunetable23.herokuapp.com/users';

        await fetch(url, {
            method: 'POST', 
            body: js, 
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                setResult(res.message);
                navigation.navigate('SignIn');
            }
            else {
                console.warn(res);
            }
        })
    }

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    return (
        <View style={styles.base}>
            <View style={styles.root}>
                <KeyboardAvoidingView behavior={'position'}>
                    <Image
                        source={{uri: 'https://cdn.discordapp.com/attachments/251038634873061376/1047342960498442362/table2.gif'}}
                        style={[styles.logo, {height: height * 0.3}]}
                        resizeMode='cover'
                    />

                    <CustomHeader />

                    <CustomInput 
                    placeholder="First Name" 
                    value={firstName} 
                    setValue={setFirstName}
                    />

                    <CustomInput 
                    placeholder="Last Name" 
                    value={lastName} 
                    setValue={setLastName}
                    />

                    <CustomInput 
                    placeholder="Username" 
                    value={username} 
                    setValue={setUsername}
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

                    <Text style={styles.result}>{result}</Text>
                </KeyboardAvoidingView>

                <CustomButton 
                    text="Already have an account? Sign in here!" 
                    onPress={onSignInPress} 
                    type="TERTIARY" 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    base: {
        flex: 1,
        backgroundColor: '#1F1616',
        justifyContent: 'flex-end',
    },

    root: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        backgroundColor: '#1F1616'
    },

    logo: {
        borderWidth: 10,
        borderColor: '#7A431D',
        padding: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'fle',
        flexDirection: 'column'
    },

    result: {
        flexDirection: 'row',
        fontSize: 14,
        fontWeight: "bold",
        color: "white"
    }
});

export default RegisterScreen