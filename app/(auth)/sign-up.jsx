import React, {useState} from 'react';

import {Text, View} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAppStore} from "../../store/store";
import {handleSignUp} from "../../lib/fetch";

const SignUp = () => {
    const updateIsLoggedIn = useAppStore((state) => state.updateIsLoggedIn);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    })
    return (
        <View className="w-full h-full p-10 bg-white justify-evenly">
            <View className="items-center gap-3 p-10">
                <Text className="text-center text-xl font-bold text-[#000E08]">Sign up with Email</Text>
                <Text className="text-center text-sm text-[#797C7B]">Get chatting with friends and family today by signing up for our chat app!</Text>
            </View>
            <View className="gap-4">
                <CustomInput
                    title="Your email"
                    isSecured={false}
                    value={form.email}
                    handleChangeText={(x) => setForm({...form, email: x})}
                    extraStyles="mb-5"
                />

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
                    title="Create an account"
                    handlePress={() => {handleSignUp(form,updateIsLoggedIn)}}
                />
                <Link
                    href="sign-in"
                    className="text-[#24786D] text-center text-base font-medium"
                >
                    Already have an account?</Link>
            </View>
        </View>
    );
};

export default SignUp;
