import React, {useEffect} from 'react';

import {Text, View} from 'react-native';
import {Link, Redirect} from "expo-router";
import {useAppStore, useUserStore} from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFetch from "../lib/useFetch";
import {getUser} from "../lib/fetch";

const App = () => {
    const {isLoggedIn, updateIsLoggedIn} = useAppStore();
    const updateUsername = useUserStore((state) => state.updateUsername);
    const updateEmail = useUserStore((state) => state.updateEmail);

    useEffect(() => {
        const data = getUser()
            .then((data) => {
                updateUsername(data.username);
                updateEmail(data.email);
                updateIsLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
            })
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
