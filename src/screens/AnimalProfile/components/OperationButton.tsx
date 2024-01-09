import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "@/lib";

type OperationButtonPropsType = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  iconBackgroundColor?: string;
  disabled?: boolean;
};

const OperationButton = ({ title, icon, onPress, iconBackgroundColor, disabled }: OperationButtonPropsType) => {
  return (
    <View className="rounded-lg overflow-hidden">
      <Pressable
        className={cn("flex-row justify-between items-center px-2 py-1 rounded-lg")}
        android_ripple={{ color: "rgba(255, 255, 255, 0.1)" }}
        onPress={onPress}
        disabled={disabled}
      >
        <View className="flex-row space-x-4">
          <View className={cn(" items-center justify-center rounded-md p-1", iconBackgroundColor)}>{icon}</View>
          <Text className="text-gray-50 text-lg font-medium">{title}</Text>
        </View>

        <Ionicons name="chevron-forward" size={24} color="white" />
      </Pressable>
    </View>
  );
};

export default OperationButton;
