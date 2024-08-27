import React, {useState} from 'react';

import {Alert, Button, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleTest = async () => {

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0NSIsImlhdCI6MTcyNDc2OTAzMywiZXhwIjoxNzI0ODU1NDMzfQ.eeuWcyknlYnXUSi1Yqm-CiOlcF2V1RrD_ns7qZcy0Aw\"";

    if (!token) {
        return;
    }
    console.log("Here");
    try {
        const response = await fetch("http://10.0.2.2:8080/friend/allfriends", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log("Friends list:");
        console.log(data);
        console.log(data.data);
    } catch (e) {
        console.log(e);
        Alert.alert("Error", e);
    }
};
const Confirmation = () => {
    return (
        <SafeAreaView className="px-5">
            <Text className="text-center text-xl mb-5">Confirmation</Text>
            <Button
             title="Test Button"
             onPress={handleTest}
            />
        </SafeAreaView>
    );
};

export default Confirmation;
