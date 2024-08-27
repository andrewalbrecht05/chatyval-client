import React from 'react';

import {Text, View} from 'react-native';
import {Stack} from "expo-router";

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="sign-up" options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="confirmation" options={{headerShown: true}}></Stack.Screen>
        </Stack>
    );
};

export default AuthLayout;
