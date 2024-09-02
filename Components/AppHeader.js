import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import an icon library
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase Auth functions

const Top = StatusBar.currentHeight;

export default function AppHeader({ navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const navigateTo = (route) => {
        closeMenu();
        navigation.navigate(route);
    };

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth); // Sign out the user
            navigation.navigate('Login'); // Redirect to Login screen or another appropriate screen
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.backImage}
                source={{ uri: 'https://res.cloudinary.com/dkkkl3td3/image/upload/v1722829874/vayqnwazm9xtrmffrkqp.png' }}
            />
            <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                <FontAwesome name={menuVisible ? "caret-down" : "bars"} size={24} color="black" />
            </TouchableOpacity>

            {menuVisible && (
                <View style={styles.dropdownContainer}>
                    {/* <TouchableOpacity style={styles.dropdownItem} onPress={() => navigateTo('Profile')}>
                        <Text style={styles.dropdownText}>Profile</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => navigateTo('Meditation_page')}>
                        <Text style={styles.dropdownText}>Meditation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
                        <Text style={styles.dropdownText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'relative',
        marginTop: Top,
        backgroundColor: 'white',
    },
    menuButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '2%',
    },
    backImage: {
        width: 100,
        height: 60,
        resizeMode: 'contain',
    },
    dropdownContainer: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        zIndex: 1,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dropdownText: {
        fontSize: 16,
    },
});
