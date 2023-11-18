import { cn } from "@/lib/cn";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";

type SearchBarType = {
  searchQuery: (val: string) => void;
  openBottomSheet: () => void;
};

export const SearchBar = ({ searchQuery, openBottomSheet }: SearchBarType) => {
  const inputRef = useRef<TextInput>(null);

  const keyboardDidHideCallback = () => {
    inputRef.current ? inputRef.current.blur?.() : null;
  };

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener("keyboardDidHide", keyboardDidHideCallback);

    return () => {
      keyboardDidHideSubscription?.remove();
    };
  }, []);

  return (
    <View className="px-4 rounded-b-xl bg-gray-800">
      <Pressable
        onPress={() => {
          inputRef.current ? inputRef.current.focus() : null;
        }}
      >
        <View
          className={cn(
            "w-full flex-row justify-between border-b-2 border-gray-500 focus:border-violet-600 px-4 py-2 items-center"
          )}
        >
          <TextInput
            ref={inputRef}
            placeholder="Wyszukaj po imieniu"
            placeholderTextColor={"#6b7280"}
            className="max-w-[90%] text-gray-50"
            cursorColor={"white"}
            returnKeyType="search"
            onChangeText={searchQuery}
          />
          <Ionicons name="search" size={24} color="white" />
        </View>
      </Pressable>
      <View className="py-4 flex-row items-center space-x-4">
        <View className="border border-gray-700 rounded-lg overflow-hidden">
          <Pressable
            className="flex-row items-center justify-center px-4 py-2 space-x-2"
            android_ripple={{ color: "#374151" }}
            onPress={openBottomSheet}
          >
            <MaterialIcons name="filter-list-alt" size={24} color="white" />
            <Text className="text-gray-50">Filtry</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
