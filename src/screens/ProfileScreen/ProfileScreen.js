import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SvgUri } from 'react-native-svg';

const ProfileScreen = () => {

    const [id, setID] = useState('');
    const [username, setUsername] = useState('');
    const [totalLikes, setTotalLikes] = useState(0);
    const [token, setToken] = useState('');
    const [url, setUrl] = useState("");

    // retrieve user id & token
    AsyncStorage.multiGet(['user', 'token'])
    .then((value) => {
        const data = JSON.parse(value[0][1]); // 'user'
        setID(data._id);
        setUsername(data.username); 
        setTotalLikes(data.totalLikes);
        setToken(value[1][1]); // 'token'
        setUrl("https://avatars.dicebear.com/api/open-peeps/" + data.username + ".svg?r=50");
    })

    // //retrieve token
    // AsyncStorage.getItem('token')
    // .then((value) => {
    //     setToken(value);
    // }) 

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onDeletePressed = async () => {

        var obj = {id};
        var url = `https://tunetable23.herokuapp.com/users/${id}/delete`;

        await fetch(url, {
            method: 'DELETE', 
            headers: {
                'authorization': `Bearer ${token}`, 
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                console.log(res.message);

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

    const sendReset = async () => {
        var url = `https://tunetable23.herokuapp.com/users/${id}/sendPasswordReset`;

        await fetch(url, {
            method: 'POST', 
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                Alert.alert(
                    `${res.message}`,
                    "",
                    [
                        { text: "OK",
                        onPress: () => navigation.navigate('SignIn'),
                        },
                    ],
                    {cancelable: false},
                );
            }
            else {
                // console.warn(res.success);
            }
        })
    }

    const onFriendPress = () => {
        navigation.navigate('Friends');
    }

    const onPostPress = () => {
        navigation.navigate('Posts');
    }

    const onBlockedPress = () => {
        navigation.navigate('Blocked');
    }

    return (
        <View style={styles.base}>
            <View style={styles.root}>
                <SvgUri
                    uri={url}
                    style={[styles.logo, {height: height * 0.3}]} 
                    resizeMode="contain"
                />
                <View style={[styles.result, {marginVertical: 10}]}>
                    <Text style={[styles.result, {fontSize: 30, color: 'white'}]}>
                        {username}
                    </Text>
                    
                </View>
                <CustomButton
                    text="Friends"
                    onPress={onFriendPress}
                />
                <CustomButton
                    text="Posts"
                    onPress={onPostPress}
                />
                <CustomButton
                    text="Blocked Users"
                    onPress={onBlockedPress}
                />
                {/* <CustomButton
                    text="Change Password"
                    onPress={sendReset}
                /> */}
                <CustomButton
                    text="Delete Account"
                    onPress={deleteAlert}
                    type="SECONDARY"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    base: {
        flex: 1,
        backgroundColor: '#1F1616'
    },

    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1F1616'
    },

    logo: {
        width: '95%',
        maxWidth: 150,
        maxHeight: 150
    },

    result: {
        flexDirection: 'column',
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        alignItems: "center"
    }
});

export default ProfileScreen