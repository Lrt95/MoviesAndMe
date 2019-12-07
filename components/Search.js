// Components/Search.js

import films from "../helpers/filmsData"
import FilmItem from "./FilmItem"
import {Button, FlatList, TextInput, View, StyleSheet} from "react-native";

import React from "react";


class Search extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <TextInput style={styles.text_input}
                           placeholder='Titre du film'/>
                <Button title='Rechercher' onPress={() => {}}/>
                <FlatList
                    data={films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film ={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
    },
    text_input: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
});

export default Search