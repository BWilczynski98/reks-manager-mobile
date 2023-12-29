import { cn } from "@/lib";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

type AdopterTilePropsType = {
  adopter: Adopter;
  onSelect: (id: string) => void;
  isChecked: boolean;
};

export const AdopterTile = ({ adopter, onSelect, isChecked }: AdopterTilePropsType) => {
  const randomColors = [
    "bg-orange-500",
    "bg-blue-500",
    "bg-rose-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];

  const randomNumber = useMemo(() => Math.floor(Math.random() * 6), []);
  const firstLetter = useMemo(() => adopter.name.charAt(0), [adopter.name]);
  const avatarColor = randomColors[randomNumber];

  return (
    <Pressable
      className={cn("flex-row items-center rounded-lg p-2 justify-between space-x-4", {
        "bg-gray-800": isChecked,
      })}
      onPress={() => onSelect(adopter.id)}
    >
      <View className={`p-2 ${avatarColor} w-12 h-12 justify-center items-center rounded-full`}>
        <Text className="text-gray-300 font-semibold text-lg">{firstLetter}</Text>
      </View>
      <View className="shrink grow">
        <Text className="text-gray-50 font-medium text-lg" numberOfLines={2}>
          {adopter.name}
        </Text>
        <Text className="text-gray-50 text-base" numberOfLines={2}>
          {adopter.address}
        </Text>
      </View>
      {/* <View>
        <Pressable
          onPress={() => Linking.openURL(`tel:${adopter.phone_number}`)}
          className="border-2 border-gray-500 w-8 h-8 justify-center items-center rounded-full"
        >
          <MaterialIcons name="local-phone" size={24} color="white" />
        </Pressable>
      </View> */}
    </Pressable>
  );
};
