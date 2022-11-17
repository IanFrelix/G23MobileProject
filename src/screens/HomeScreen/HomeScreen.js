import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

    const [name, setName] = useState('');
    
    // retrieve user data (works)
    AsyncStorage.getItem('user')
    .then((value) => {
        const data = JSON.parse(value);
        console.warn(data.firstName); // (also works)
        setName(data.firstName);
    })
    // at this point, can't render data variable (cant find variable)

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onFindFriendPressed = () => {
        navigation.navigate('Searchuser');
    }
    
    const onFindSongPressed = () => {
        // navigation.navigate('Searchsong');
        console.warn("onFindSongPressed");  
    }

    return (
        <ScrollView style={styles.base}>
            <View style={styles.root}>
                <Text>
                    Welcome home, {name}!
                </Text>

                <Text>
                    
                </Text>

                <CustomButton
                    text="Find Friends"
                    onPress={onFindFriendPressed}
                />

                <CustomButton
                    text="Find Songs"
                    onPress={onFindSongPressed}
                />
            </View>
        </ScrollView>
    )
}

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

export default HomeScreen