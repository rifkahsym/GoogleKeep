import React, { useEffect, useContext } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';

const SplashScreen = ({ navigation }) => {
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container(darkMode)}>
            <View style={styles.inner}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.text(darkMode)}>Google Keep</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: (darkMode) => ({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkMode ? '#121212' : 'white',
    }),
    inner: {
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
    text: (darkMode) => ({
        marginTop: 20,
        fontSize: 24,
        color: darkMode ? 'white' : 'black',
    }),
});

export default SplashScreen;