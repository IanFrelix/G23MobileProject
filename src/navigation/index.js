import React from 'react'
import { View, Text } from 'react-native'
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
                <Stack.Screen name="Searchuser" options={{
                    headerShown: true, 
                    headerTitle: "",
                    headerBackVisible: true,
                    borderBottomWidth: 0,
                    headerStyle: {backgroundColor: '#3d3d3d'}
                    }} component={SearchUserScreen} />
                <Stack.Screen name="Searchsong" options={{
                    headerShown: true, 
                    headerTitle: "",
                    headerBackVisible: true,
                    borderBottomWidth: 0,
                    headerStyle: {backgroundColor: '#3d3d3d'}
                    }} component={SearchSongScreen} />
                <Stack.Screen name="Profile" options={{
                    headerShown: true, 
                    headerTitle: "",
                    headerBackVisible: true,
                    borderBottomWidth: 0,
                    headerStyle: {backgroundColor: '#3d3d3d'}
                    }} component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;