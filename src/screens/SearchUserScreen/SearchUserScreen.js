import React, { useState } from 'react';
import { 
    View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, FlatList 
} from 'react-native';
import Logo from '../../../assets/G23Images/musicnote.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
// import SearchFilter from '../../components/SearchFilter';

const SearchUserScreen = () => {

    const [input, setInput] = useState('');
    const [data, setData] = useState([]);

    const onSearch = () => {
        if (input === '')
        {
            return;
        }
        var url = `https://tunetable23.herokuapp.com/users/search/${input}`;
        fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                console.warn(input);
                setData(res.results);
            }
            else {
                console.warn(res);
            }
        })
    }

    const changeText = (text) => {
        setInput(text.replace(/\s/g, '')); // wrong (prevents from typing spaces cause they break fetch, apparently)
        onSearch();
    }

    return (
        <View style={styles.base}>
            <View style={styles.search}>
                <TextInput 
                    value={input}
                    onChangeText={input => changeText(input)}
                    placeholder="Search user" 
                />
            </View>
            <FlatList
                data={data} 
                keyExtractor={item => item._id}
                renderItem={({item}) =>
                    <Text>{item.username}</Text>
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
        padding: 20,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 10,
        alignItems: "center"
    }
});

export default SearchUserScreen