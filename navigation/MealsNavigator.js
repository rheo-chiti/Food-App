import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import colors from '../constants/colors'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import FilterScreen from '../screens/FilterScreen'

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.accentColor
            },
            headerTintColor: 'white'
        }
    }
)

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.accentColor
            },
            headerTintColor: 'white'
        }
    }
)

const MealsFavTabNavigator = createMaterialBottomTabNavigator({
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color='white' />
            },
            tabBarColor: colors.primaryColor
        },
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color='white' />
            },
            tabBarColor: colors.accentColor
        },
    }
}, {
    activeColor: colors.accentColor,
    shifting: true
})

const FiltersNavigator = createStackNavigator({
    Filters: FilterScreen
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.accentColor
            },
            headerTintColor: 'white'
        }
    }
)

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: {
        screen: FiltersNavigator,
        navigationOptions: {
            drawerLabel: 'Filter'
        }
    }
},
    {
        contentOptions: {
            activeTintColor: colors.accentColor,
            labelStyle: {
                fontFamily: 'openSansBold'
            }
        }
    }
)

export default createAppContainer(MainNavigator)