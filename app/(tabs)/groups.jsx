import React, {useEffect, useState} from 'react';

import {Alert, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import useFetch from "../../lib/useFetch";
import {getAllGroupRequests, getGroupList, handleCreateGroup} from "../../lib/fetch";

const Groups = () => {
    const {data, reFetch, isLoading} = useFetch(getGroupList);
    const GroupItem = ({name, groupId}) => {
        return (
            <TouchableOpacity>
                <View className="my-5">
                    <View className="flex-row">
                        <Image
                            source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn0KFu9fABWCaYNrMkhK-4u1locIcMiOQhfw&s"}}
                            resizeMode="cover"
                            className="w-12 h-12 rounded-3xl mr-5"/>
                        <View>
                            <Text className="text-xl font-semibold">
                                {`${name}`}
                            </Text>
                            <Text className="text-gray-500">Andrii Albrekht</Text>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        )
    }


    const [newGroup, setNewGroup] = useState("");
    return (
        <SafeAreaView className="px-5">
            <FlatList
                data={data}
                renderItem={({item}) => (<GroupItem name={item.name}/>)}
                ListHeaderComponent={(
                    <View>
                        <View className="flex-row justify-between items-center my-5">
                            <Image
                                source={{uri: "https://avatars.akamai.steamstatic.com/93277093080f7fedc1c537dcad1ba2370cc659d3_full.jpg"}}
                                resizeMode="cover"
                                className="w-[60px] h-[60px] rounded-3xl border"/>
                            <Text className="text-xl font-semibold">Groups</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("Press");
                                    router.push("(tabs)/createGroup")
                                }}
                            >
                                <Image
                                    source={{uri: "https://cdn-icons-png.flaticon.com/512/992/992651.png"}}
                                    resizeMode="contain"
                                    className="w-6 h-6 rounded-3xl"
                                />
                            </TouchableOpacity>
                        </View>
                        <View className="">
                            <CustomInput
                                title="Type your new group's username"
                                value={newGroup}
                                handleChangeText={(x) => setNewGroup(x)}
                                extraStyles="mb-5"
                            />
                            <CustomButton
                                title="Create group"
                                handlePress={() => {
                                    handleCreateGroup(newGroup)
                                }}
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={(
                    <Text>You have no friends :(</Text>
                )}
                onRefresh={reFetch}
                refreshing={isLoading}/>
        </SafeAreaView>
    );
};

export default Groups;
