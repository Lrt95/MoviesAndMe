// Components/Search.js

import FilmItem from "./FilmItem"
import {Button, FlatList, TextInput, View, StyleSheet, ActivityIndicator} from "react-native";
import {getFilmFromApiWithSearchedText} from "../API/TMDBApi"
import { connect } from 'react-redux'

import React from "react";


class Search extends React.Component {

    constructor(props) {
        super(props);
        searchedText: ""
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false
        }

    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
            this._loadFilm()
        })
    }

    _searchedTextInput(text){
        this.searchedText = text
    }
    _loadFilm(){
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true})
            getFilmFromApiWithSearchedText(this.searchedText, this.page+1).then(data =>{
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results],
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

    _displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput style={styles.text_input}
                           placeholder='Titre du film'
                           onChangeText={(text) => this._searchedTextInput(text)}
                           onSubmitEditing={() => this._searchFilms()}/>
                <Button style={styles.search_container} title='Rechercher' onPress={() => this._searchFilms()}/>
                <FlatList
                    data={this.state.films}
                    extraData={this.props.favoritesFilm}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => 
                        <FilmItem 
                            film ={item}
                            isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id ) !== -1 ? true : false)} 
                            displayDetailForFilm={this._displayDetailForFilm}/>
                    }
                    onEndReachedTheshold={0.5}
                    onEndReached={()=> {
                        if (this.page < this.totalPages)
                            this._loadFilm()
                        }
                    }
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

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Search)