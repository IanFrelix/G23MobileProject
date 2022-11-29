import React, { useState, useEffect } from 'react';
import { 
    View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, FlatList 
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BlockedScreen = () => {

    const [data, setData] = useState([]);
    const [id, setID] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function showBlocked() {
            AsyncStorage.multiGet(['user', 'token'])
            .then((value) => {
                const data = JSON.parse(value[0][1]); // 'user'
                setID(data._id);
                const ogToken = value[1][1];
                setToken(ogToken); // 'token'
                var url = `https://tunetable23.herokuapp.com/users/${data._id}/blocked`;
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
        showBlocked();
    }, []);

    const showBlocked2 = async () => {
        var url = `https://tunetable23.herokuapp.com/users/${id}/blocked`;
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

    const unblockUser = async (blockedId) => {
        var url = `https://tunetable23.herokuapp.com/users/${id}/unblock/${blockedId}`;
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
                showBlocked2(); // refresh
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
                    return (
                        <View style={{marginVertical: 10}}>
                            <Text style={styles.result}>
                                {item.username} 
                                <CustomButton
                                    text="Unblock"
                                    onPress={() => {unblockUser(item.id);}}
                                    type="FRIEND"
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

export default BlockedScreen