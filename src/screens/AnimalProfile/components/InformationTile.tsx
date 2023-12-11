import { View, Text } from "react-native";
import React from "react";
import { cn } from "@/lib";

type InformationTilePropsType = {
  title: string;
  description: string;
  color: string;
};

export const InformationTile = ({ title, description, color }: InformationTilePropsType) => {
  return (
    <View className="flex-row space-x-2">
      <View className={cn("w-1 h-full rounded-sm", color)} />
      <View>
        <Text className="text-gray-300 text-lg">{title}</Text>
        <Text className="text-gray-50 text-xl">{description}</Text>
      </View>
    </View>
  );
};
