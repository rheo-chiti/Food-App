import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import MealList from '../components/MealList'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux'

const FavoritesScreen = (props) => {
    const favMeals = useSelector(state => state.meals.favoriteMeals)
    if (favMeals.length===0) {
        return <View style={styles.content}><Text style={styles.title}>No Favorite Meals</Text></View>
    }
    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'openSans',
        fontSize: 22
    }
})

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Favorites',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>
    }
}

export default FavoritesScreen