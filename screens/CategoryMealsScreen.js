import React from 'react'
import {
    View,
    StyleSheet,
    Text
} from 'react-native'
import { CATEGORIES } from '../data/dummy_data'
import colors from '../constants/colors'
import MealList from '../components/MealList'
import { useSelector } from 'react-redux'

const CategoryMealScreen = (props) => {
    const availableMeals = useSelector(state => state.meals.filteredMeals)
    const categoryId = props.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId)
    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) !== -1)
    if (displayedMeals.length === 0) {
        return <View style={styles.content}><Text style={styles.title}>No meals found,check your filters</Text></View>
    }
    return (
        <MealList listData={displayedMeals} navigation={props.navigation} />
    )
}
CategoryMealScreen.navigationOptions = (navigationData) => {
    const categoryId = navigationData.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId)
    return {
        headerTitle: selectedCategory.title,
        headerStyle: {
            backgroundColor: colors.accentColor
        },
        headerTintColor: 'white'
    }
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

export default CategoryMealScreen