import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert, FlatList} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeaderboardScreen = () => {

    const [data, setData] = useState([]);
    const [id, setID] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        async function showPosts() {
            // retrieve user data
            AsyncStorage.multiGet(['user', 'token'])
            .then((value) => {
                const data = JSON.parse(value[0][1]); // 'user'
                setID(data._id);
                const ogToken = value[1][1];
                setToken(ogToken); // 'token'
                
                // display ranked posts
                var url = `https://tunetable23.herokuapp.com/posts/${data._id}/leaderboard`;
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
                        setData((res.results).reverse()); // hopefully reverses results
                    }
                    else {
                        console.warn(res);
                    }
                })
            })
        }
        showPosts();
    }, []);

    return (
        <View style={styles.base}>
            <FlatList
                data={data}
                keyExtractor={item => item._id}
                renderItem={({item, index}) => {
                    // show first item like it's a grand winner
                    if (index === 0) {
                        return (
                            <View style={{marginVertical: 10}}>
                                <Text style={styles.winner}>
                                    {item.song["artist"]} - {item.song["title"]}
                                </Text>
                                <Text style={styles.winner2}>
                                    ({item.creator["username"]})
                                </Text>
                                <Text style={styles.winner} >
                                    Likes: {item.likes}
                                </Text>
                            </View>
                        )
                    } else {
                        return (
                            <View style={{marginVertical: 10}}>
                                <Text style={styles.border}/>
                                <Text style={styles.result}>
                                    {item.song["artist"]} - {item.song["title"]}
                                </Text>
                                <Text style={styles.result2}>
                                    ({item.creator["username"]})
                                </Text>
                                <Text style={styles.result} >
                                    Likes: {item.likes}
                                </Text>
                            </View>
                        )
                    }
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

    result2: {
        fontSize: 12,
        fontStyle: "italic",
        color: "white",
        marginLeft: 10
    },

    border: {
        borderColor: "gray",
        borderWidth: 1,
        height: 1,
        marginTop: 5
    },

    winner: {
        fontSize: 22,
        fontWeight: "bold",
        color: "orange",
        marginLeft: 10
    },

    winner2: {
        fontSize: 18,
        fontStyle: "italic",
        color: "orange",
        marginLeft: 10
    }
});

export default LeaderboardScreen