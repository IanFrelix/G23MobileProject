import React, { useState } from 'react';
import { 
    View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, FlatList 
} from 'react-native';
import Logo from '../../../assets/G23Images/musicnote.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SvgUri } from 'react-native-svg';

const SearchUserScreen = () => {

    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [id, setID] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    // retrieve user id & token
    AsyncStorage.multiGet(['user', 'token'])
    .then((value) => {
        const data = JSON.parse(value[0][1]); // 'user'
        setID(data._id);
        setToken(value[1][1]); // 'token'
    })

    // //retrieve token
    // AsyncStorage.getItem('token')
    // .then((value) => {
    //     setToken(value);
    // }) 

    const onSearch = () => {
        if (input !== '' || input !== ' ') {
            var url = `https://tunetable23.herokuapp.com/users/${id}/search/${input}`;
            fetch(url, {
                method: 'GET',
                headers: {'Content-Type':'application/json'}
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    console.log(res.message);
                    if (!(res.results).length) {
                        setError(res.message);
                        setData('');
                    } else {
                        setData(res.results);
                    }
                }
                else {
                    console.warn(res);
                }
            })
        }
    }

    const addFriend = async (friendId) => {
        var url = `https://tunetable23.herokuapp.com/users/${id}/addFriend/${friendId}`;
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
                // if success, res.results = 0
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
                onSearch(); // refresh
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
            <View style={styles.search}>
                <TextInput 
                    value={input}
                    onChangeText={text => setInput(text)}
                    placeholder="Search user" 
                />
                <CustomButton
                    text="Search"
                    onPress={onSearch}
                    type="SEARCH"
                />
            </View>
            <Error/>
            <FlatList
                data={data} 
                keyExtractor={item => item._id}
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
                                    <View style={{width: '35%'}}>
                                        <Text style={[styles.result, {fontSize: 16}]}>
                                            {item.username}
                                        </Text>
                                    </View>
                                    <View style={{width: '23%'}}>
                                        <CustomButton
                                            text="Friend"
                                            onPress={() => {addFriend(item.id);}}
                                            type="FRIEND"
                                        />
                                    </View>
                                    <View style={{width: '23%'}}>
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
        backgroundColor: '#3d3d3d'
    },

    root: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#3d3d3d'
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

export default SearchUserScreen