import React, {useEffect, useState} from 'react';

import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFetch from "../../lib/useFetch";
import {getAllUserRequests, handleAddFriend, handleUserApprove, handleUserDecline} from "../../lib/fetch";

const Requests = () => {
    const RequestItem = ({name, requestId}) => {
        return (
            <TouchableOpacity>
                <View className="my-5">
                    <View className="flex-row">
                        <Image
                            source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn0KFu9fABWCaYNrMkhK-4u1locIcMiOQhfw&s"}}
                            resizeMode="cover"
                            className="w-12 h-12 rounded-3xl mr-5"
                        />
                        <View>
                            <Text className="text-xl font-semibold">
                                {`${name}`}
                            </Text>
                            <Text className="text-gray-500">Andrii Albrekht</Text>
                        </View>
                        <View className="flex flex-row items-end absolute right-0">
                            <TouchableOpacity
                                onPress={() => {
                                    handleUserApprove(requestId).then()
                                    reFetch().then()
                                }}
                            >
                                <Image
                                    source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlUOlOaQCUdhhbww_sq5kDRJ6jQ4_Hk_cPOw&s"}}
                                    className="w-6 h-6"
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    handleUserDecline(requestId).then()
                                    reFetch().then()
                                }}
                            >
                                <Image
                                    source={{uri: "https://cdn-icons-png.flaticon.com/512/10621/10621089.png"}}
                                    className="w-6 h-6"
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        )
    }
    const [newFriend, setNewFriend] = useState("");
    const {data, reFetch} = useFetch(getAllUserRequests);
    return (
        <SafeAreaView className="px-5">
            <Text className="text-center text-xl font-bold mb-10">Requests</Text>
            <View className="">
                <CustomInput
                    title="Type your new friend's username"
                    value={newFriend}
                    handleChangeText={(x) => setNewFriend(x)}
                    extraStyles="mb-5"
                />
                <CustomButton
                    title="Add friend"
                    handlePress={() => {
                        handleAddFriend(newFriend).then();
                        reFetch().then();
                    }}
                />
            </View>
            <Text className="text-center text-xl font-bold my-10">Incoming Requests</Text>
            {data.map((item) => (<RequestItem name={item.senderUsername} requestId={item.id} key={item.id} />))}
        </SafeAreaView>
    );
};

export default Requests;
