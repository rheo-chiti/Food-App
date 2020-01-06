import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MealItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onSelectMeal}>
            <View style={styles.mealItem}>
                <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                    <ImageBackground source={{ uri: props.image }} style={styles.bgImage} >
                        <Text style={styles.title} numberOfLines={1} >{props.title}</Text>
                    </ImageBackground>
                </View>
                <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                    <Text>{props.duration} m</Text>
                    <Text>{props.complexity.toUpperCase()}</Text>
                    <Text>{props.affordability.toUpperCase()}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: 10,
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    mealRow: {
        flexDirection: 'row',
    },
    mealHeader: {
        height: '85%',
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: 'openSansBold',
        fontSize: 16,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 15,
        paddingVertical: 5,
        textAlign: 'center'
    }
})

export default MealItem