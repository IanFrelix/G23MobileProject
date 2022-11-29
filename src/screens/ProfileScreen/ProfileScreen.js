import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {

    const [id, setID] = useState('');
    const [username, setUsername] = useState('');
    const [totalLikes, setTotalLikes] = useState(0);
    const [token, setToken] = useState('');

    // retrieve user id & token
    AsyncStorage.multiGet(['user', 'token'])
    .then((value) => {
        const data = JSON.parse(value[0][1]); // 'user'
        setID(data._id);
        setUsername(data.username); 
        setTotalLikes(data.totalLikes);
        setToken(value[1][1]); // 'token'
    })

    // //retrieve token
    // AsyncStorage.getItem('token')
    // .then((value) => {
    //     setToken(value);
    // }) 

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
        <ScrollView showsVerticalScrollIndicator={false} style={styles.base}>
            <View style={styles.root}>
                <Text>
                    {username}
                </Text>
                <Text>
                    Total Likes: {totalLikes}
                </Text>
                <Text>
                    Recent Song Liked:
                </Text>
                <Text>
                    Favorite Genre:
                </Text>
                <Text>
                    Favorite Song of All Time:
                </Text>
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