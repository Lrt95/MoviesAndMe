// Components/Search.js

import FilmItem from "./FilmItem"
import {Button, FlatList, TextInput, View, StyleSheet, ActivityIndicator} from "react-native";
import {getFilmFromApiWithSearchedText} from "../API/TMDBApi"

import React from "react";


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { films: []}
        searchedText: ""
        isLoading: false
    }

    _searchedTextInput(text){
        this.searchedText = text
    }
    _loadFilm(){
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true})
            getFilmFromApiWithSearchedText(this.searchedText).then(data =>{
                this.setState({
                    films: data.results,
                    isLoading: false
                })
            })
        }
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput style={styles.text_input}
                           placeholder='Titre du film'
                           onChangeText={(text) => this._searchedTextInput(text)}
                           onSubmitEditing={() => this._loadFilm()}/>
                <Button style={styles.search_container} title='Rechercher' onPress={() => this._loadFilm()}/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film ={item}/>}
                    onEndReachedTheshold={0.5}
                    onEndReached={()=> {console.log("onEndReached")}}
                />
                {this._displayLoading()}
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
        marginTop: 35,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    search_container: {

    }
});

export default Search