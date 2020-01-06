import React, { useEffect, useCallback } from 'react'
import { View, StyleSheet, Text, Button, ScrollView, Image } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from '../store/actions/meals'

const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <Text>{props.children}</Text>
        </View>
    )
}

const ListItemSteps = (props) => {
    return (
        <View style={styles.listItem}>
            <Text><Text style={styles.number}>{props.index + 1}.</Text> {props.children}</Text>
        </View>
    )
}

const MealDetailScreen = (props) => {
    const selectedMeal = props.navigation.getParam('mealData')
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal === selectedMeal))
    useEffect(() => {
        props.navigation.setParams({ mealTitle: selectedMeal.title })
    }, [selectedMeal])
    console.log('====================================');
    console.log('gjh');
    console.log('====================================');
    const dispatch = useDispatch()
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(selectedMeal.id))
    }, [dispatch, selectedMeal.id])
    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
    }, [toggleFavoriteHandler])
    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFavorite })
    },[currentMealIsFavorite])
    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <Text>{selectedMeal.duration}m</Text>
                <Text>{selectedMeal.complexity.toUpperCase()}</Text>
                <Text>{selectedMeal.affordability.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => (
                <ListItemSteps key={step} index={selectedMeal.steps.indexOf(step)} >{step}</ListItemSteps>
            ))}
        </ScrollView>
    )
}

MealDetailScreen.navigationOptions = (navigationData) => {
    const selectedMeal = navigationData.navigation.getParam('mealData')
    const toggleFavorite = navigationData.navigation.getParam('toggleFav')
    const isFavorite=navigationData.navigation.getParam('isFav')
    return {
        headerTitle: selectedMeal.title,
        headerRight:
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    iconName={isFavorite? 'ios-star' : 'ios-star-outline'}
                    title="Favorite"
                    onPress={toggleFavorite}
                    color='white'
                />
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'openSansBold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    number: {
        fontFamily: 'openSansBold',
        fontSize: 18
    }
})

export default MealDetailScreen