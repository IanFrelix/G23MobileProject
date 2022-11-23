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
        if (input !== '' || input !== ' ') {
            var url = `https://tunetable23.herokuapp.com/users/search/${input}`;
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
        }
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
            <FlatList
                data={data} 
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                        <View style={{marginVertical: 10}}>
                            <Text style={styles.result}>{item.username}</Text>
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

export default SearchUserScreen