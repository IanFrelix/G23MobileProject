import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {

    const [id, setID] = useState('');

    // retrieve user id
    AsyncStorage.getItem('user')
    .then((value) => {
        const data = JSON.parse(value);
        setID(data.userId);
    })

    const navigation = useNavigation();

    const onDeletePressed = async () => {

        var obj = {id};
        var js = JSON.stringify(obj);
        var url = `https://tunetable23.herokuapp.com/users/${id}/delete`;

        await fetch(url, {
            method: 'DELETE', 
            body: js, 
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                console.warn(res.message);

                navigation.navigate('SignIn');
            }
            else {
                // console.warn(res.success);
            }
        })
    }

    const deleteAlert = () => {
        Alert.alert(
            "Delete Account?",
            "This will permanently erase your account data.",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
              },
              { text: "OK",
                onPress: onDeletePressed}
            ]
          );
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.base}>
            <View style={styles.root}>
                <CustomButton
                    text="Delete Account"
                    onPress={deleteAlert} 
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

export default ProfileScreen