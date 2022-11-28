import React, { useState, useEffect } from 'react';
import { 
    View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, FlatList 
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
            <FlatList
                data={data}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                            <View style={{marginVertical: 10}}>
                                <Text style={styles.result}>
                                    {item.song["artist"]} - {item.song["title"]}
                                </Text>
                                <Text style={styles.result2}>
                                    "{item.message}"
                                </Text>
                                <Text style={styles.result} >
                                    Likes: {item.likes}
                                </Text>
                                <CustomButton
                                    text="Delete"
                                    onPress={() => {deletePost(item._id);}}
                                    type="UNFRIEND"
                                />
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
    }
});

export default PostsScreen