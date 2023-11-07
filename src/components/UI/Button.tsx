import { cn } from "@/lib/cn";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  isLoading?: boolean;
  variant?: "primary" | "outline";
};

export const Button = ({ children, onPress, isLoading, variant = "primary" }: ButtonProps) => {
  const outline = variant === "outline";

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        className={cn("bg-violet-700 rounded-lg h-10 justify-center items-center", {
          "bg-transparent": outline,
          border: outline,
          "border-gray-700": outline,
        })}
      >
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text className={cn("text-gray-50 text-base text-center")}>{children}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
