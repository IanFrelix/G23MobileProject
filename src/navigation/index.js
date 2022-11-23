import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchUserScreen from '../screens/SearchUserScreen';
import SearchSongScreen from '../screens/SearchSongScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();


const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Searchuser" component={SearchUserScreen} options={styles.back} />
                <Stack.Screen name="Searchsong" component={SearchSongScreen} options={styles.back} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={styles.back} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    back: {
        headerShown: true, 
        headerTitle: "",
        headerBackVisible: true,
        borderBottomWidth: 0,
        headerStyle: {backgroundColor: '#3d3d3d'}
    }
});

export default Navigation;