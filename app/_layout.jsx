import React from 'react';

import {Text, View} from 'react-native';
import {Stack} from "expo-router";

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: true}}></Stack.Screen>
            <Stack.Screen name="(auth)" options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}></Stack.Screen>
        </Stack>
    );
};

export default RootLayout;
