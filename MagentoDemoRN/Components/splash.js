import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    SafeAreaView
} from 'react-native'

export default class Splash extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo}
                    source={require('../Assets/icon.png')}>
                </Image>
                <Text style={styles.title}>mobi
                    <Text style={{ color: '#4784A2' }}>Channel</Text>
                </Text>
            </SafeAreaView>
        )
    }
}
const styles = {
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 110,
        height: 125
    },
    title: {
        fontWeight: 'bold',
        fontSize: 26,
        color: "#F56367",
        paddingVertical: 5
    }
}