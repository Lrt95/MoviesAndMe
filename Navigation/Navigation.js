// Navigation/Navigation.js

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from "react-navigation-stack";
import {createBottomTabNavigator} from "react-navigation-tabs"
import Search from '../components/Search'
import FilmDetail from '../components/FilmDetail'
import Favorites from '../components/Favorites'
import Test from '../components/Test'

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const FavoriteStackNavigator = createStackNavigator({
  Favorites: {
    screen : Favorites,
    navigationOptions: {
      title: 'Favoris'
    },
    FilmDetail: {
      screen: FilmDetail
    }
  }
})

const TestStackNavigator = createStackNavigator({
  Test: {
    screen : Test
  }
})

const MoviesTabNavigator = createBottomTabNavigator(
  {
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image 
          source={require('../image/ic_search.png')}
          style={styles.icon}/>
      }
    }
  },
  Favorites: {
    screen: FavoriteStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image 
          source={require('../image/ic_favorite.png')}
          style={styles.icon}/>
      }
    }
  },
  Test: {
    screen: TestStackNavigator
  }
},
{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
    inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
    showLabel: false, // On masque les titres
    showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
  }
}
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(MoviesTabNavigator)
