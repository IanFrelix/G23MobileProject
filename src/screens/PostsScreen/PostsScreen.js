import React, { useState, useEffect } from 'react';
import { 
    View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, FlatList, Pressable
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostsScreen = () => {

    const [data, setData] = useState([]);
    const [id, setID] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        async function showPosts() {
            AsyncStorage.multiGet(['user', 'token'])
            .then((value) => {
                const data = JSON.parse(value[0][1]); // 'user'
                setID(data._id);
                const ogToken = value[1][1];
                setToken(ogToken); // 'token'
                var url = `https://tunetable23.herokuapp.com/posts/${data._id}`;
                fetch(url, {
                    method: 'GET',
                    headers: {'Content-Type':'application/json'}
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
        showPosts();
    }, []);

    const showPosts2 = async () => {
        var url = `https://tunetable23.herokuapp.com/posts/${id}`;
        await fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json'}
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

    const deletePost = async (postId) => {
        var url = `https://tunetable23.herokuapp.com/posts/${postId}`;
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
                showPosts2(); // refresh
            }
            else {
                console.warn(res);
            }
        })
    }

    return (
        <View style={styles.base}>
            <View style={styles.root}>
                <FlatList
                    data={data}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => {
                        return (
                            <View style={{marginVertical: 10}}>
                                <Text style={styles.result}>
                                    <View style={styles.result}>
                                        <View style={{width: '60%'}}>
                                            <View>
                                                <Text style={styles.result}>{item.song["artist"]} - {item.song["title"]}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.result2}>"{item.message}"</Text>
                                                <Text style={styles.result}>Likes: {item.likes}</Text>
                                            </View>
                                            <Text style={styles.result3}>{item.updatedAt}</Text>
                                        </View>
                                        <View style={{width: '20%'}}>
                                            <Pressable onPress={() => {Linking.openURL(link)}}>
                                                <Image
                                                    style={{width: 50, height: 50}}
                                                    source={{uri: 'https://cdn.discordapp.com/attachments/251038634873061376/1047353802564571217/spotify-brands-logo-34-min.png'}}
                                                />
                                            </Pressable>
                                        </View>
                                        <View style={{width: '20%', alignItems: 'center'}}>
                                            <CustomButton
                                                text="Delete"
                                                onPress={() => {deletePost(item._id)}}
                                                type="UNFRIEND"
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
        color: "white"
    },

    result2: {
        fontSize: 12,
        fontStyle: "italic",
        color: "white"
    },

    result3: {
        fontSize: 10,
        fontStyle: "italic",
        color: "lightgray"
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

export default PostsScreen