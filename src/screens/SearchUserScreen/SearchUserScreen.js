import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList } from 'react-native';
import Logo from '../../../assets/G23Images/musicnote.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const SearchUserScreen = () => {

    // var url = 'https://tunetable23.herokuapp.com/users/search/:keyword';

    // await fetch(url, {method: 'POST', body:js, headers:{'Content-Type':'application/json'}})
    //     .then(res => res.json())

    return (
        <View>
            <Text>Search Screen success!</Text>
        </View>
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

export default SearchUserScreen