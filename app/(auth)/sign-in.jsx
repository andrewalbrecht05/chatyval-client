import React, {useState} from 'react';

import {Text, View} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAppStore} from "../../store/store";
import {handleSignIn} from "../../lib/fetch";

const SignIn = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const updateIsLoggedIn = useAppStore((state) => state.updateIsLoggedIn);

    return (
        <View className="w-full h-full p-10 bg-white justify-evenly">
            <View className="items-center gap-3 p-10">
                <Text className="text-center text-xl font-bold text-[#000E08]">Log in to Chatyval'</Text>
                <Text className="text-center text-sm text-[#797C7B]">Welcome back! Sign in using your social account or email to continue us</Text>
            </View>
            <View className="gap-4">
                <CustomInput
                    title="Your username"
                    isSecured={false}
                    value={form.username}
                    handleChangeText={(x) => {
                        setForm({...form, username: x});
                    }}
                    extraStyles="mb-5"
                />
                <CustomInput
                    title="Your password"
                    isSecured={true}
                    value={form.password}
                    handleChangeText={(x) => setForm({...form, password: x})}
                />
            </View>
            <View className="gap-4">
                <CustomButton
                    title="Log in"
                    handlePress={() => {handleSignIn(form,updateIsLoggedIn)}}
                />
                <Link
                    href="sign-up"
                    className="text-[#24786D] text-center text-base font-medium"
                >
                    Don't have an account?</Link>
            </View>
        </View>
    );
};

export default SignIn;
