import React, { useState, useEffect } from 'react';
import { 
    View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, FlatList, Pressable
} from 'react-native';
import Logo from '../../../assets/G23Images/musicnote.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Navigation from '../../navigation';
// import SearchFilter from '../../components/SearchFilter';

const SearchSongScreen = () => {

    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    const navigation = useNavigation();

    const onSearch = () => {
        if (input !== '' || input !== ' ') {
            var url = `https://tunetable23.herokuapp.com/songs/search/${input}`;
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
    
    const Error = () => {
        if (error === '') {
            return <Text></Text>;
        }
        return <Text style={styles.error}>{error}</Text>
    }

    return (
        <View style={styles.base}>
            <View style={{flexDirection: 'row'}}>
                <View style={[styles.search, {width: '80%'}]}>
                    <TextInput 
                        value={input}
                        onChangeText={text => setInput(text)}
                        placeholder="Search song" 
                    />
                </View>
                <View style={{width: '70%'}}>
                    <CustomButton
                        text="Search"
                        onPress={onSearch}
                        type="SEARCH"
                    />
                </View>
            </View>
            <Error/>
            <FlatList
                data={data} 
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                        <View style={{marginVertical: 10}}>
                            <Text style={styles.result}>
                                <View style={styles.result}>
                                    <View style={{width: '65%'}}>
                                        <Text style={[styles.result, {fontSize: 16, justifyContent: 'center'}]}>
                                            {item.artist} - {item.title}
                                        </Text>
                                    </View>
                                    <View style={{width: '15%'}}>
                                        <Pressable onPress={() => {Linking.openURL(item.song["url"])}}>
                                            <Image
                                                style={{width: 50, height: 50}}
                                                source={{uri: 'https://cdn.discordapp.com/attachments/251038634873061376/1047353802564571217/spotify-brands-logo-34-min.png'}}
                                            />
                                        </Pressable>
                                    </View>
                                    <View style={{width: '20%'}}>
                                        <CustomButton
                                            text="Add"
                                            onPress={() => {
                                                navigation.navigate({
                                                    name: 'Home',
                                                    params: {
                                                        songId: item._id,
                                                        songTitle: item.title,
                                                        songArtist: item.artist
                                                    }
                                                });
                                            }}
                                            type="ADD"
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
        backgroundColor: '#1F1616'
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

export default SearchSongScreen