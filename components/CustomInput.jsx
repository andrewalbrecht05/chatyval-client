import React from 'react';

import {Text, TextInput, View} from 'react-native';

const CustomInput = ({title, isSecured, value, handleChangeText, extraStyles, editable}) => {
    return (
        <View className={`w-full space-y-2 ${extraStyles}`}>
            <Text className="text-[#24786D] font-semibold ">{title}</Text>
            <TextInput
                className="border-b border-gray-300 text-base pb-1"
                secureTextEntry={isSecured}
                value={value}
                onChangeText={handleChangeText}
                editable={editable ?? true}
            />
        </View>
    );
};

export default CustomInput;
