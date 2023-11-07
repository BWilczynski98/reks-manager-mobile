import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

export const SplashScreen = () => {
  return (
    <View>
      <Text>Loading token...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};
