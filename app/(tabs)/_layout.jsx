import React from 'react';

import {Text, View} from 'react-native';
import {Tabs} from "expo-router";

const TabsLayout = () => {
    return (
        <>
            <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="groups"
                    options={{
                        title: 'Groups',
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="requests"
                    options={{
                        title: 'Requests',
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="createGroup"
                    options={{
                        title: 'Create new group',
                        headerShown: true,
                        href: null,

                    }}

                />
            </Tabs>
        </>
    );
};

export default TabsLayout;
