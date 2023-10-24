import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

export const SplashScreen = () => {
  return (
    <View className="flex-1 justify-center items-center space-y-4">
      <Text className="text-neutral-400 font-bold">Loading token...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};
