import React from 'react';

import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Link, router} from "expo-router";
import useFetch from "../../lib/useFetch";
import {getFriendList} from "../../lib/fetch";

const Home = () => {
    const {data, reFetch, isLoading} = useFetch(getFriendList);
    const FriendList = ({name, unreadCount, ...props}) => {
        return (
            <TouchableOpacity onPress={() => {
                router.push("chat")
            }}>
                <View className="my-5">
                    <View className="flex-row">
                        <Image
                            source={{uri: "https://i.imgflip.com/7bv2j9.jpg?a478992"}}
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
                                <Text className="text-white">{unreadCount}</Text>
                            </View>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView className="px-5">
            <FlatList
                data={data}
                renderItem={({item}) => (<FriendList name={item.friendName} unreadCount={item.unreadCount}/>)}
                ListHeaderComponent={(
                    <View>
                        <View className="flex-row justify-between items-center my-5">
                            <Image
                                source={{uri: "https://avatars.akamai.steamstatic.com/93277093080f7fedc1c537dcad1ba2370cc659d3_full.jpg"}}
                                resizeMode="cover"
                                className="w-[60px] h-[60px] rounded-3xl border"
                            />
                            <Text className="text-xl font-semibold">Home</Text>
                            <Image
                                source={{uri: "https://cdn-icons-png.flaticon.com/512/992/992651.png"}}
                                resizeMode="contain"
                                className="w-6 h-6 rounded-3xl"
                                onPress={() => {
                                }}
                            />
                        </View>
                        <Link className="text-right text-base text-green-950 font-semibold" href={"requests"}>My requests</Link>
                    </View>
                )}
                ListEmptyComponent={(
                    <Text>You have no friends :(</Text>
                )}
                onRefresh={reFetch}
                refreshing={isLoading}
            />
            {/*{data.map((item) => (<FriendList name={item.friendName}/>))}*/}
        </SafeAreaView>
    );
};

export default Home;
