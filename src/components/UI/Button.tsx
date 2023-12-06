import { cn } from "@/lib/cn";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  isLoading?: boolean;
  variant?: "primary" | "outline" | "destructive";
};

export const Button = ({ children, onPress, isLoading, variant = "primary" }: ButtonProps) => {
  const outline = variant === "outline";
  const destructive = variant === "destructive";

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        className={cn("bg-violet-700 rounded-lg h-10 justify-center items-center", {
          "bg-gray-800": outline,
          border: outline,
          "border-gray-800": outline,
          "bg-red-600": destructive,
          "border-red-600": destructive,
        })}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#f9fafb" />
        ) : (
          <Text className={cn("text-gray-50 font-medium text-base text-center")}>{children}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
