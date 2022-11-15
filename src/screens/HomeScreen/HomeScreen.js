import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/G23Images/musicnote.png';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

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
                <Text>Home Screen success!</Text>

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