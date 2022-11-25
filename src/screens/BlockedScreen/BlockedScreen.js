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
    // console.log(data); // this properly shows data

    useEffect(() => {
        async function showBlocked() {
            AsyncStorage.getItem('user')
            .then((value) => {
                const data = JSON.parse(value);
                setID(data._id);
                var url = `https://tunetable23.herokuapp.com/users/${data._id}/blocked`;
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
        showBlocked();
    }, []);

    const showBlocked2 = async () => {
        var url = `https://tunetable23.herokuapp.com/users/${id}/blocked`;
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

    const unblockUser = async (blockedId) => {
        var url = `https://tunetable23.herokuapp.com/users/${id}/unblock/${blockedId}`;
        await fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'}
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

    return (
        <View style={styles.base}>
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

    border: {
        borderColor: "gray",
        borderWidth: 1,
        height: 1,
        marginTop: 5
    }
});

export default BlockedScreen