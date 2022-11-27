import React, { useState, useEffect } from 'react';
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
    const [visible, setVisible] = useState(false);

    // post body:
    const [message, setMessage] = useState(''); // message
    const [song, setSong] = useState(''); // song id
    const [songTitle, setSongTitle] = useState(''); // song title
    const [songArtist, setSongArtist] = useState(''); // song artist

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            if (route.params?.songId) {
                setSong(route.params?.songId);
                setVisible(true);
            }
        }
    }, [route.params?.songId]);
    
    // retrieve user data (works)
    AsyncStorage.multiGet(['user', 'token'])
    .then((value) => {
        const data = JSON.parse(value[0][1]); // 'user'
        setName(data.username);
        setID(data._id);
        setToken(value[1][1]); // 'token'
    })

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
                setVisible(!visible);
            }
            else {
                console.warn(res);
            }
        })
    }

    return (
        <ScrollView style={styles.base}>
            <View style={styles.root}>
                <Text>
                    Welcome home, {name}!
                </Text>

                <CustomButton
                    text="Find Friends"
                    onPress={onFindFriendPressed}
                />

                {/* <CustomButton
                    text="Find Songs"
                    onPress={onFindSongPressed}
                /> */}

                {
                    /* "show off your music taste!" 
                        when pressed, creates input popup */
                }
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

                {/* daily songs list */}

                <CustomButton 
                    text="Profile Page"
                    onPress={onProfilePress}
                />

                <CustomButton
                    text="Sign Out"
                    onPress={onSignoutPress}
                    type="SECONDARY"
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
    }
});

export default HomeScreen