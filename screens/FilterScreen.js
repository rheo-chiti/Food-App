import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { Switch } from 'react-native-paper'
import colors from '../constants/colors'
import { useDispatch } from 'react-redux'
import { setFilters } from '../store/actions/meals'

const FilterSwitch = (props) => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch value={props.state}
                onValueChange={props.onChange}
                trackColor={{ true: colors.accentColor }}
                thumbColor={colors.accentColor}
            />
        </View>
    )
}

const FilterScreen = (props) => {
    const [isGlutenFree, setIsGlutenFree] = useState(false)
    const [isLactoseFree, setIsLactoseFree] = useState(false)
    const [isVegan, setIsVegan] = useState(false)
    const [isVegetarian, setIsVegetarian] = useState(false)

    const dispatch = useDispatch()

    const saveFilters = useCallback(() => {
        let appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        dispatch(setFilters(appliedFilters))
    },[isGlutenFree,isLactoseFree,isVegan,isVegetarian,dispatch])

    useEffect(() => {
        props.navigation.setParams({ save: saveFilters })
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters/Restrictions</Text>
            <FilterSwitch label="Gluten-Free" state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch label="Lactose-Free" state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch label="Vegan" state={isVegan} onChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch label="Vegetarian" state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'openSansBold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
    }
})

FilterScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-save' onPress={navData.navigation.getParam('save')} />
            </HeaderButtons>
        )
    }
}

export default FilterScreen