import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/G23Images/musicnote.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
    
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = async () => {
        var obj = {email, password};
        var js = JSON.stringify(obj);
        try {
            var url = 'https://tunetable23.herokuapp.com/users/auth';

            await fetch(url, {method: 'POST', body:js, headers:{'Content-Type':'application/json'}})
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    console.warn(res.message);

                    console.log(obj)
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
        <ScrollView showsVerticalScrollIndicator={false} style={styles.base}>
            <View style={styles.root}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, {height: height * 0.3}]} 
                    resizeMode="contain"
                />

                <CustomHeader />

                <CustomInput 
                    placeholder="Email" 
                    value={email} 
                    setValue={setEmail}
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

                <CustomButton 
                    text="Forgot password?" 
                    onPress={onForgotPasswordPressed} 
                    type="TERTIARY" 
                />

                <CustomButton 
                    text="Don't have an account? Register here!" 
                    onPress={onSignUpPress} 
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
        padding: 20
    },

    logo: {
        width: '95%',
        maxWidth: 500,
        maxHeight: 100,

    },
});

export default SignInScreen