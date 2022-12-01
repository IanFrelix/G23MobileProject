import React, { useState, useEffect } from 'react';
import { 
    View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, FlatList 
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SvgUri } from 'react-native-svg';

const FriendScreen = () => {

    const [data, setData] = useState([]);
    const [id, setID] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

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
                        if ((res.results).length === 0) {
                            setError(res.message);
                        } else {
                            setData(res.results);
                        }
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
                if ((res.results).length === 0) {
                    setError(res.message);
                } else {
                    setData(res.results);
                }
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

    const Error = () => {
        if (error === '') {
            return <Text></Text>;
        }
        return <Text style={styles.error}>{error}</Text>
    }

    return (
        <View style={styles.base}>
            <Error/>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    var url = "https://avatars.dicebear.com/api/open-peeps/" + item.username + ".svg?r=50";
                    return (
                        <View style={{marginVertical: 5}}>
                            <Text style={styles.result}>
                                <View style={styles.result}>
                                    <SvgUri
                                        uri={url}
                                        style={styles.logo} 
                                        resizeMode="contain"
                                    />
                                    <View style={{width: '35%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={[styles.result, {fontSize: 30}]}>
                                            {item.username}
                                        </Text>
                                    </View>
                                    <View style={{width: '23%', justifyContent: 'center'}}>
                                        <CustomButton
                                            text="Unfriend"
                                            onPress={() => {deleteFriend(item.id);}}
                                            type="UNFRIEND"
                                        />
                                    </View>
                                    <View style={{width: '23%',justifyContent: 'center'}}>
                                        <CustomButton
                                            text="Block"
                                            onPress={() => {blockUser(item.id);}}
                                            type="BLOCK"
                                        />
                                    </View>
                                </View>
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
        backgroundColor: '#1F1616'
    },

    root: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1F1616'
    },

    logo: {
        width: '95%',
        maxWidth: 60,
        maxHeight: 60
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
        flexDirection: 'row',
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    },

    error: {
        flex: 1,
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
    },

    border: {
        borderColor: "gray",
        borderWidth: 1,
        height: 1,
        marginTop: 5
    }
});

export default FriendScreen