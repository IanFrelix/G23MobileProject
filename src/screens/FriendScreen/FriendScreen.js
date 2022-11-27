import React, { useState, useEffect } from 'react';
import { 
    View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, FlatList 
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FriendScreen = () => {

    const [data, setData] = useState([]);
    const [id, setID] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        async function showFriends() {
            // retrieve user data
            AsyncStorage.multiGet(['user', 'token'])
            .then((value) => {
                const data = JSON.parse(value[0][1]); // 'user'
                setID(data._id);
                const ogToken = value[1][1];
                setToken(ogToken); // 'token'
                
                // display friends list
                var url = `https://tunetable23.herokuapp.com/users/${data._id}/friends`;
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${ogToken}`,
                        'Content-Type':'application/json'
                    }
                })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        console.log(res.message);
                        setData(res.results);
                    }
                    else {
                        console.warn(res);
                    }
                })
            })
        }
        showFriends();
    }, []);

    const showFriends2 = async () => {
        var url = `https://tunetable23.herokuapp.com/users/${id}/friends`;
        await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                console.log(res.message);
                setData(res.results);
            }
            else {
                console.warn(res);
            }
        })
    }

    const deleteFriend = async (friendId) => {
        var url = `https://tunetable23.herokuapp.com/users/${id}/unfriend/${friendId}`;
        await fetch(url, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                console.log(res.message);
                showFriends2(); // refresh
            }
            else {
                console.warn(res);
            }
        })
    }

    const blockUser = async (friendId) => {
        var url = `https://tunetable23.herokuapp.com/users/${id}/block/${friendId}`;
        await fetch(url, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                console.log(res.message);
                showFriends2(); // refresh
            }
            else {
                console.warn(res);
            }
        })
    }

    return (
        <View style={styles.base}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return (
                        <View style={{marginVertical: 10}}>
                            <Text style={styles.result}>
                                {item.username}
                                <CustomButton
                                    text="Unfriend"
                                    onPress={() => {deleteFriend(item.id);}}
                                    type="UNFRIEND"
                                />
                                <CustomButton
                                    text="Block"
                                    onPress={() => {blockUser(item.id);}}
                                    type="BLOCK"
                                />
                            </Text>
                            <Text style={styles.border}/>
                        </View>
                    )
                }
            }/>
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

    search: {
        paddingLeft: 20,
        flexDirection: "row",
        backgroundColor: "#d9dbda",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'space-between'
    },

    result: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        marginLeft: 10
    },

    border: {
        borderColor: "gray",
        borderWidth: 1,
        height: 1,
        marginTop: 5
    }
});

export default FriendScreen