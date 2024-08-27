import React, {useEffect, useState} from 'react';

import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tempList = [
    "Andrii Albrekht",
    "Andrii Tyvodar",
    "Vasyl Dzhuha🦾",
    "Max Palchei",
    "Lol Lolich",
];

const Home = () => {
    useEffect(() => {
        GetFriendList();
    }, []);
    const [data, setData] = useState([]);
    const GetFriendList = async () => {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            return;
        }

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
            setData(data.data);
            console.log(data.data);
        } catch (e) {
            console.log(e);
            Alert.alert("Error", e);
        }
    }
    const FriendList = ({name, ...props}) => {
        const url = (name === "Andrii Tyvodar" || name === "Vasyl Dzhuha🦾") ? "https://api.duniagames.co.id/api/content/upload/file/9925444641672824130.jpg" : "https://i.imgflip.com/7bv2j9.jpg?a478992";
        return (
            <TouchableOpacity onPress={() => {router.push("chat")}}>
                <View className="my-5">
                    <View className="flex-row">
                        <Image
                            source={{uri: url}}
                            resizeMode="cover"
                            className="w-12 h-12 rounded-3xl mr-5"
                        />
                        <View>
                            <Text className="text-xl font-semibold">
                                {`🥰 ${name} 🥰`}
                            </Text>
                            <Text className="text-gray-500">How are you today?</Text>
                        </View>
                        <View className="flex items-end absolute right-0">
                            <Text>2 min ago</Text>
                            <View className="bg-red-600 rounded-3xl w-6 h-6 justify-center items-center">
                                <Text className="text-white">3</Text>
                            </View>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView className="px-5">
            <View className="flex-row justify-between items-center my-5">
                <Image
                    source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJNajyeZ1-a_lyQKXKuB6SxJcmt7pOlXH7qA&s"}}
                    resizeMode="contain"
                    className="w-6 h-6 rounded-3xl"
                />
                <Text className="text-xl font-semibold">Home</Text>
                <Image
                    source={{uri: "https://avatars.akamai.steamstatic.com/93277093080f7fedc1c537dcad1ba2370cc659d3_full.jpg"}}
                    resizeMode="cover"
                    className="w-[60px] h-[60px] rounded-3xl border"
                />
            </View>
            {data.map((item, index) => (<FriendList name={item.friendName}/>))}
        </SafeAreaView>
    );
};

export default Home;
