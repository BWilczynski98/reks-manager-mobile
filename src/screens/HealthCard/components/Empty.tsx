import { View, Text } from "react-native";
import React from "react";
import { Button } from "@/components";

type EmptyPropsType = {
  handleOpenSheet: () => void;
  description: string;
  buttonLabel: string;
};

export const Empty = ({ handleOpenSheet, description, buttonLabel }: EmptyPropsType) => {
  return (
    <View style={{ flex: 1, rowGap: 28 }} className="justify-center items-center px-2">
      <Text className="text-gray-300 text-xl font-light text-center">{description}</Text>
      <View className="w-1/2">
        <Button onPress={handleOpenSheet} variant="outline">
          {buttonLabel}
        </Button>
      </View>
    </View>
  );
};
