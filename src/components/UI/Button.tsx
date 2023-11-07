import React from "react";
import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  isLoading?: boolean;
};

export const Button = ({ children, onPress, isLoading }: ButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View className="bg-violet-700 rounded-lg h-10 justify-center items-center">
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text className="text-gray-50 text-base text-center">{children}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
