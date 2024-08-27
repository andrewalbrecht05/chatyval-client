import React from 'react';

import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAppStore, useUserStore} from "../../store/store";
import {router} from "expo-router";
import CustomInput from "../../components/CustomInput";


const Settings = () => {
    const username = useUserStore((state) => state.username);
    const email = useUserStore((state) => state.email);
    const age = useUserStore((state) => state.age);
    const fullName = useUserStore((state) => state.fullName);
    const updateIsLoggedIn = useAppStore((state) => state.updateIsLoggedIn);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        updateIsLoggedIn(false);
        router.push('/');
    }
    return (
        <SafeAreaView className="px-5">
            <Text className="text-center font-bold">Settings</Text>
            <View className="flex-row mb-5">
                <Image
                    source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn0KFu9fABWCaYNrMkhK-4u1locIcMiOQhfw&s"}}
                    resizeMode="cover"
                    className="w-12 h-12 rounded-3xl mr-5"
                />
                <View>
                    <Text className="text-xl font-semibold">
                        {`${username}`}
                    </Text>
                    <Text className="text-gray-500">{fullName}</Text>
                </View>
            </View>

            <CustomInput
                title="Email"
                editable={false}
                value={email}
                extraStyles="mb-5"
            />
            <CustomInput
                title="Age"
                editable={false}
                value={age ?? "Not set"}
                extraStyles="mb-5"
            />
            <Button
                onPress={handleLogout}
                title="Logout"
                className="mt-10"
            />
        </SafeAreaView>
    );
};

export default Settings;
