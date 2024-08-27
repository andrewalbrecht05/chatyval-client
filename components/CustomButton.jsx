import React from 'react';

import {Text, TouchableOpacity, View} from 'react-native';

const CustomButton = ({title, handlePress}) => {
    return (
        <TouchableOpacity onPress={handlePress} className="bg-[#24786D] rounded-xl w-full">
            <Text className="text-white text-center font-semibold py-3 text-base">{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
