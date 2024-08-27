import React, {useState} from 'react';

import {Text, View} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAppStore} from "../../store/store";

const SignUp = () => {
    const updateIsLoggedIn = useAppStore((state) => state.updateIsLoggedIn);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    })
    const handleSignUp = async () => {
        const newUser = {
            username: form.username,
            email: form.email,
            password: form.password,
        };
        console.log("Here", newUser);
        const response = await fetch("http://10.0.2.2:8080/api/register", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        console.log(response);
        console.log(data);

        if( data.token ) {
            await AsyncStorage.setItem("token", data.token);
            updateIsLoggedIn(true);
            router.push("/home");
        }
    }
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
                    handlePress={handleSignUp}
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
