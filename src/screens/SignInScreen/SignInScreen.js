import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/G23Images/musicnote.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
    
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = async () => {
        var obj = {username, password};
        var js = JSON.stringify(obj);
        try {
            var url = 'https://tunetable23.herokuapp.com/users/auth';

            await fetch(url, {
                method: 'POST', 
                body: js, 
                headers: {'Content-Type':'application/json'}
            })
            .then(res => res.json())
            .then(async res => {
                if (res.success) {
                    // store user data & token
                    await AsyncStorage.multiSet([
                        ['user', JSON.stringify(res.results)],
                        ['token', res.token]
                    ]);

                    navigation.navigate('Home');
                }
                else {
                    console.warn(res);
                }
            })
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    }
    
    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed");
    }
    
    const onSignUpPress = () => {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.base}>
            <View style={styles.root}>
                <Image
                    source={{uri: 'https://cdn.discordapp.com/attachments/251038634873061376/1047337117249974302/table.gif'}}
                    style={[styles.logo, {height: height * 0.5}]}
                    resizeMode='cover'
                />
                <CustomHeader />

                <CustomInput 
                    placeholder="Username" 
                    value={username} 
                    setValue={setUsername}
                />

                <CustomInput 
                    placeholder="Password" 
                    value={password} 
                    setValue={setPassword}
                    secureTextEntry={true}
                />

                <CustomButton 
                    text="Sign In" 
                    onPress={onSignInPressed} 
                />

                {/* <CustomButton 
                    text="Forgot password?" 
                    onPress={onForgotPasswordPressed} 
                    type="TERTIARY" 
                /> */}

                <CustomButton 
                    text="Don't have an account? Register here!" 
                    onPress={onSignUpPress} 
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
        justifyContent: 'flex-end'
    },

    root: {
        flex: 1,
        padding: 20
    },

    logo: {
        borderWidth: 10,
        borderColor: '#7A431D',
        padding: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
});

export default SignInScreen