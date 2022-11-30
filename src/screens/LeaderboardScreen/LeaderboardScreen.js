import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert, FlatList, Linking, Pressable } from 'react-native';
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
            <View style={styles.root}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={item => item._id}
                    renderItem={({item, index}) => {
                        // show first item like it's a grand winner
                        if (index === 0) {
                            return (
                                <View style={{alignItems: 'center', marginVertical: 10, marginBottom: 40}}>
                                    <Image
                                        style={{width: 100, height: 100}}
                                        source={{uri: 'https://cdn.discordapp.com/attachments/251038634873061376/1047355705746788402/trophy.gif'}}
                                    />
                                    <Text style={styles.winner}>
                                        <View style={styles.winner}>
                                            <View style={{width: '100%'}}>
                                                <View>
                                                    <Text style={styles.winner}>{item.song["artist"]} - {item.song["title"]}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.winner2}>{item.creator["username"]}</Text>
                                                </View>
                                            </View>
                                            <View style={{width: '100%'}}>
                                                <Text style={[styles.winner, {fontSize: 24, color: "gold"}]}>{item.likes} likes</Text>
                                            </View>
                                            <View style={{}}>
                                                <Pressable onPress={() => {Linking.openURL(link)}}>
                                                    <Image
                                                        style={{width: 50, height: 50}}
                                                        source={{uri: 'https://cdn.discordapp.com/attachments/251038634873061376/1047353802564571217/spotify-brands-logo-34-min.png'}}
                                                    />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </Text>
                                </View>
                            )
                        } else if (index === 1) {
                            return (
                                <View style={{marginVertical: 10}}>
                                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                        <Image
                                            style={{width: 70, height: 70, alignSelf: 'center', marginBottom: 5}}
                                            source={{uri: 'https://cdn.discordapp.com/attachments/251038634873061376/1047357813820764180/clap.gif'}}
                                        />
                                        <Image
                                            style={{width: 70, height: 70, alignSelf: 'center', marginBottom: 5}}
                                            source={{uri: 'https://cdn.discordapp.com/attachments/251038634873061376/1047357813820764180/clap.gif'}}
                                        />
                                        <Image
                                            style={{width: 70, height: 70, alignSelf: 'center', marginBottom: 5}}
                                            source={{uri: 'https://cdn.discordapp.com/attachments/251038634873061376/1047357813820764180/clap.gif'}}
                                        />
                                    </View>
                                    <Text style={styles.result}>
                                        <View style={[styles.result, {backgroundColor: '#9C4F1A', padding: 10, borderRadius: 10}]}>
                                            <View style={{width: '65%'}}>
                                                <View>
                                                    <Text style={styles.result}>{item.song["artist"]} - {item.song["title"]}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.result2}>{item.creator["username"]}</Text>
                                                </View>
                                            </View>
                                            <View style={{width: '20%'}}>
                                                <Text style={[styles.result3, {fontSize: 18}]}>{item.likes} likes</Text>
                                            </View>
                                            <View style={{width: '20%'}}>
                                                <Pressable onPress={() => {Linking.openURL(link)}}>
                                                    <Image
                                                        style={{width: 50, height: 50}}
                                                        source={{uri: 'https://cdn.discordapp.com/attachments/251038634873061376/1047353802564571217/spotify-brands-logo-34-min.png'}}
                                                    />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </Text>
                                </View>
                            )
                        } else {
                            return (
                                <View style={{marginVertical: 10}}>
                                    <Text style={styles.result}>
                                        <View style={[styles.result, {backgroundColor: '#9C4F1A', padding: 10, borderRadius: 10}]}>
                                            <View style={{width: '65%'}}>
                                                <View>
                                                    <Text style={styles.result}>{item.song["artist"]} - {item.song["title"]}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.result2}>{item.creator["username"]}</Text>
                                                </View>
                                            </View>
                                            <View style={{width: '20%'}}>
                                                <Text style={[styles.result3, {fontSize: 18}]}>{item.likes} likes</Text>
                                            </View>
                                            <View style={{width: '20%'}}>
                                                <Pressable onPress={() => {Linking.openURL(link)}}>
                                                    <Image
                                                        style={{width: 50, height: 50}}
                                                        source={{uri: 'https://cdn.discordapp.com/attachments/251038634873061376/1047353802564571217/spotify-brands-logo-34-min.png'}}
                                                    />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </Text>
                                </View>
                            )
                        }
                    }
                }/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    base: {
        flex: 1,
        backgroundColor: '#3d3d3d'
    },

    root: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1F1616'
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
        flexDirection: 'row',
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    },

    result2: {
        fontSize: 12,
        fontStyle: "italic",
        color: "white",
    },

    result3: {
        fontSize: 10,
        fontStyle: "italic",
        color: "lightgray",
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
    },

    winner: {
        flexDirection: 'column',
        fontSize: 22,
        fontWeight: "bold",
        color: "orange",
        alignItems: "center",
        textAlign: 'center'
    },

    winner2: {
        flexDirection: 'column',
        fontSize: 18,
        fontStyle: "italic",
        color: "orange",
        alignItems: "center",
        textAlign: 'center'
    }
});

export default LeaderboardScreen