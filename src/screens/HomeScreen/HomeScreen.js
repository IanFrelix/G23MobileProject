import React, { useState, useEffect, memo } from 'react';
import { 
    View, Text, Image, StyleSheet, useWindowDimensions, 
    ScrollView, FlatList, Alert, Modal, TextInput, Linking,
    Pressable
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
    const [error, setError] = useState('');

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

                    // this shit's confusing tbh:
                    // console.log("INTIAL LIKED POSTS: " + data.likedPosts);
                    // console.log("INTIAL **SET** LIKED POSTS: " + likedPosts);

                    // display friends' posts
                    var url = `https://tunetable23.herokuapp.com/posts/${data._id}/friends`;
                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'authorization': `Bearer ${value[1][1]}`,
                            'Content-Type':'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success) {
                            console.log(res.message);
                            if (!(res.results).length) {
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
        navigation.navigate('SignIn')
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
                setVisible(!visible);
                setMessage('');
                setSong('');
            }
            else {
                console.warn(res);
            }
        })
    }
    // JUST FOR REFERENCE:

    const propsAreEqual = (prev, next) => {
        return prev.isLiked === next.isLiked;
    }

    const Row = memo(({ title, artist, creator, message, time, link, isLiked, onPress }) => {
        return (
            <View style={[styles.result, {backgroundColor: '#9C4F1A', padding: 10, borderRadius: 10}]}>
                <View style={{width: '70%'}}>
                    <View>
                        <Text style={styles.result}>{artist} - {title}</Text>
                    </View>
                    <View>
                        <Text style={[styles.result2, {color: 'black', fontWeight: 'bold', fontStyle: 'normal'}]}>({creator}) ~</Text>
                    </View>
                    <View>
                        <Text style={[styles.result2, {color: 'black', fontWeight: 'bold'}]}>"{message}"</Text>
                    </View>
                    <Text style={styles.result3}>{time}</Text>
                </View>
                <View style={{width: '15%'}}>
                    <Pressable onPress={() => {Linking.openURL(link)}}>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{uri: 'https://cdn.discordapp.com/attachments/251038634873061376/1047353802564571217/spotify-brands-logo-34-min.png'}}
                        />
                    </Pressable>
                </View>
                <View style={{width: '15%', alignItems: 'center'}}>

                    <Pressable onPress={() => {onPress(title)}}>
                        <Image
                            style={{width: 50, height: 50}}
                            source={
                                isLiked ? {uri: 'https://img.icons8.com/sf-regular-filled/512/facebook-like.png'}
                                : {uri: 'https://img.icons8.com/sf-regular/512/facebook-like.png'}
                            }
                        />
                    </Pressable>
                </View>
            </View>
        );
    }, propsAreEqual);

    const likePost = async (postId, isLiked) => {
        // likes if NOT liked, unlikes if liked
        const likeToggle = isLiked ? 'unlike' : 'like';
        var url =  `https://tunetable23.herokuapp.com/users/${id}/${likeToggle}/${postId}`
        await fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                console.log(res.message);
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
            <View style={styles.root}>
                <Text style={[styles.result, {fontSize: 20, color: '#D2735C', marginBottom: 20}]}>
                    Welcome home, {name}!
                </Text>

                <CustomButton
                    text="Share what you're listening to!"
                    onPress={() => setVisible(true)}
                />

                <CustomButton
                    text="Leaderboard"
                    onPress={onBoardPressed}
                />

                <CustomButton
                    text="Find Friends"
                    onPress={onFindFriendPressed}
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
                                type="SUBMIT"
                            />
                        </View>
                    </View>
                </Modal>

                {/* daily songs list */}
                <Text style={styles.text}>Daily Songs</Text>
                <Error/>
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
                                        creator={item.creator["username"]}
                                        message={item.message}
                                        time={item.updatedAt}
                                        link={item.song["url"]}
                                        // like or unlike depending on if it's already in likedPosts
                                        isLiked={likedPosts.includes(item._id)}
                                        onPress={() => {
                                            setLiked((likedItems) => {
                                                // TRUE if post was already liked by user
                                                let isLiked = likedPosts.includes(item._id);
                                                likePost(item._id, isLiked);
                                                // console.log(isLiked);
                                                if (isLiked) {
                                                    return likedItems.filter((title) => title !== item._id);
                                                }
                                                // what, does this ADD to likedItems regardless if it's liked or not???
                                                return [item._id, ...likedItems];
                                            });
                                        }}
                                    />
                                </Text>
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

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },

    modalView: {
        margin: 30,
        width: "100%",
        height: "70%",
        borderRadius: 5,
        backgroundColor: "#DE9E48",
        alignItems: "center",
        justifyContent: 'flex-start'
    },

    input: {
        padding:10,
        height: 50,
        width: "100%",
        height: "20%",
        backgroundColor: "#E6E6E6",
        justifyContent: 'center',
        fontSize: 30
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
    },
    
    text: {
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: "white"

    }
});

export default HomeScreen