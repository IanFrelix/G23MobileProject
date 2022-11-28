import React, { useState, useEffect, memo } from 'react';
import { 
    View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, FlatList, Alert, Modal, TextInput
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenStackHeaderConfig } from 'react-native-screens';

const HomeScreen = ({route}) => {

    const [name, setName] = useState('');
    const [id, setID] = useState('');
    const [token, setToken] = useState('');
    const [visible, setVisible] = useState(false); // post modal
    const [data, setData] = useState([]); // friends' posts
    const [likedPosts, setLiked] = useState([]); // liked posts

    // post body:
    const [message, setMessage] = useState(''); // message
    const [song, setSong] = useState(''); // song id
    const [songTitle, setSongTitle] = useState(''); // song title
    const [songArtist, setSongArtist] = useState(''); // song artist

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            // triggers when you add song post
            if (route.params?.songId) {
                setSong(route.params?.songId);
                setVisible(true);
            }

            // show friends' posts when screen opens
            async function showPosts() {
                // retrieve user data
                AsyncStorage.multiGet(['user', 'token'])
                .then((value) => {
                    const data = JSON.parse(value[0][1]); // 'user'
                    setName(data.username);
                    setID(data._id);
                    setLiked(data.likedPosts);
                    setToken(value[1][1]); // 'token'
                    console.log("INTIAL LIKED POSTS: " + data.likedPosts);
                    console.log("INTIAL **SET** LIKED POSTS: " + likedPosts);

                    // display friends' posts
                    var url = `https://tunetable23.herokuapp.com/posts/${data._id}/friends`;
                    fetch(url, {
                        method: 'GET',
                        headers: {'Content-Type':'application/json'}
                    })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success) {
                            setData(res.results);
                        }
                        else {
                            console.warn(res);
                        }
                    })
                })
            }
            showPosts();
        }
    }, [route.params?.songId]);

    const onFindFriendPressed = () => {
        navigation.navigate('Searchuser');
    }
    
    const onFindSongPressed = () => {
        setVisible(!visible);
        navigation.navigate('Searchsong');
    }

    const onProfilePress = () => {
        navigation.navigate('Profile');
    }

    const onBoardPressed = () => {
        navigation.navigate('Board');
    }

    const onSignoutPress = () => {
        AsyncStorage.multiRemove(['user', 'token']);
        Alert.alert(
            "You've been signed out.",
            "",
            [
                { text: "OK",
                onPress: () => navigation.navigate('SignIn'),
                },
            ],
            {cancelable: false},
        );
    }

    const onCreatePostPressed = () => {
        var obj = {message, song};
        var js = JSON.stringify(obj);
        var url = `https://tunetable23.herokuapp.com/posts/${id}`;
        fetch(url, {
            method: 'POST',
            body: js,
            headers: {
                'authorization': `Bearer ${token}`, 
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                console.log(res.message);
                Alert.alert(
                    "Post has been created!",
                    "",
                    [
                        { text: "OK",
                        onPress: () => {
                            setVisible(!visible);
                            setMessage('');
                            setSong('');
                        }},
                    ],
                    {cancelable: false},
                );
            }
            else {
                console.warn(res);
            }
        })
    }
    // JUST FOR REFERENCE:

    propsAreEqual = (prev, next) => {
        return prev.isLiked === next.isLiked;
    }

    const Row = memo(({ title, artist, isLiked, onPress }) => {
        return (
          <React.Fragment>
            <Text style={styles.result}>
              <Text>{artist} - {title}</Text>
              <CustomButton
                type={isLiked ? "UNFRIEND" : "BLOCK"}
                text={isLiked ? "Like" : "Unlike"}
                onPress={() => onPress(title)}
              />
            </Text>
            <Text style={styles.border}/>
          </React.Fragment>
        );
    }, propsAreEqual);

    const likePost = async (postId, isLiked) => {
        const likeToggle = isLiked ? 'like' : 'unlike';
        var url =  `https://tunetable23.herokuapp.com/users/${id}/${likeToggle}/${postId}`
        await fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                console.log(res.message + " // " + likedPosts);
            }
            else {
                console.warn(res);
            }
        })
    }

    return (
        <View style={styles.base}>
            <View style={styles.root}>
                <Text>
                    Welcome home, {name}!
                </Text>

                <CustomButton
                    text="Find Friends"
                    onPress={onFindFriendPressed}
                />

                <CustomButton
                    text="Leaderboard"
                    onPress={onBoardPressed}
                />

                {/* post creation */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => setVisible(!visible)}
                >
                    <View style={styles.center}>
                        <View style={styles.modalView}>
                            <CustomButton
                                text="Cancel"
                                onPress={() => {
                                    setVisible(!visible);
                                    setMessage('');
                                    setSong('');
                                }}
                                type="CANCEL"
                            />
                            <TextInput 
                                multiline
                                style={styles.input}
                                value={message}
                                onChangeText={text => setMessage(text)}
                                placeholder="Type a message!"
                            />
                            <CustomButton
                                text="Add your song"
                                onPress={onFindSongPressed}
                                type="POST"
                            />
                            <Text>Song ID: {song}</Text>
                            <CustomButton
                                text="Submit"
                                onPress={onCreatePostPressed}
                            />
                        </View>
                    </View>
                </Modal>

                <CustomButton
                    text="Share what you're listening to!"
                    onPress={() => setVisible(true)}
                />

                <CustomButton 
                    text="Profile Page"
                    onPress={onProfilePress}
                />

                <CustomButton
                    text="Sign Out"
                    onPress={onSignoutPress}
                    type="SECONDARY"
                />

                {/* daily songs list */}
                <Text style={styles.text}>Daily Songs</Text>
                <FlatList
                    extraData={likedPosts}
                    data={data}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => {
                        return (
                            <View style={{marginVertical: 10}}>
                                <Text style={styles.result}>
                                    <Row
                                        title={item.song["title"]}
                                        artist={item.song["artist"]}
                                        // like or unlike depending on if it's already in likedPosts
                                        isLiked={likedPosts.includes(item._id)}
                                        onPress={() => {
                                            setLiked((likedItems) => {
                                                let isLiked = likedItems.includes(item._id);
                                                if (isLiked) {
                                                    likePost(item._id, isLiked);
                                                    return likedItems.filter((title) => title !== item._id);
                                                }
                                                likePost(item._id, isLiked);
                                                return [item._id, ...likedItems];
                                            });
                                        }}
                                    />
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
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#3d3d3d'
    },

    logo: {
        width: '95%',
        maxWidth: 500,
        maxHeight: 100,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },

    modalView: {
        margin: 20,
        width: "100%",
        borderRadius: 5,
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    input: {
        padding:10,
        height: 50,
        width: "100%",
        backgroundColor: "#E6E6E6"
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
    },
    
    text: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    }
});

export default HomeScreen