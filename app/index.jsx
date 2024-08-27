import React, {useEffect} from 'react';

import {Text, View} from 'react-native';
import {Link, Redirect} from "expo-router";
import {useAppStore, useUserStore} from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
    const {isLoggedIn, updateIsLoggedIn} = useAppStore();
    const updateUsername = useUserStore((state) => state.updateUsername);
    const updateEmail = useUserStore((state) => state.updateEmail);
    useEffect(() => {
        const getUser = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) return false;

            try {
                const response = await fetch('http://10.0.2.2:8080/user/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                updateUsername(data.username);
                updateEmail(data.email);
                updateIsLoggedIn(response.ok);
            } catch (error) {
                console.error('An error occurred while checking authentication:', error);
                throw error;
            }
        };
        getUser().then();
    }, [isLoggedIn]);

    if(isLoggedIn) {
        return <Redirect href={"/home"}/>
    }
    return (
        <View className="flex h-full w-full justify-center items-center">
            <View className="items-center">
                <Text className="text-2xl text-blue-800"><Link href={"sign-up"}>Sign up with email</Link></Text>
                <Text>Existing account? <Link href={"sign-in"} className="text-blue-700">Log in</Link></Text>
                <Text>Test link <Link href={"confirmation"} className="text-blue-700">Here</Link></Text>
            </View>
        </View>
    );
};

export default App;
