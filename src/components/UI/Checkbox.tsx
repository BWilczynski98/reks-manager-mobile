import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { cn } from "@/lib";
import { FontAwesome } from "@expo/vector-icons";

type CheckboxType = {
  className?: string;
  isChecked?: boolean;
  label?: string;
  onPress: (val: string) => void;
  value: string;
};

export const Checkbox = ({ className, isChecked, label, onPress, value }: CheckboxType) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.75} onPress={() => onPress(value)}>
        <View className="flex-row items-center space-x-2">
          <View
            className={cn("w-6 h-6 border-2 border-gray-700 rounded-sm justify-center items-center", className, {
              "border-violet-700": isChecked,
              "bg-violet-700": isChecked,
            })}
          >
            {isChecked ? <FontAwesome name="check" size={14} color="white" /> : null}
          </View>
          <View>
            <Text className="text-gray-50 text-lg">{label}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
