import { cn } from "@/lib";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CheckboxType = {
  className?: string;
  isChecked?: boolean;
  label?: string;
  onPress: (val: string) => void;
  value: string;
  radio?: boolean;
};

export const Checkbox = ({ className, isChecked, label, onPress, value, radio }: CheckboxType) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.75} onPress={() => onPress(value)}>
        <View className="flex-row items-center space-x-2">
          <View
            className={cn("w-6 h-6 border-2 border-gray-700 rounded-sm justify-center items-center", className, {
              "border-violet-700": isChecked,
              "bg-violet-700": isChecked,
              "rounded-full": radio,
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
