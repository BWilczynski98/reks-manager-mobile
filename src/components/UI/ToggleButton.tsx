import { View, Text, Pressable } from "react-native";
import React from "react";
import { cn } from "@/lib";

type ToggleButtonType = {
  onClick: (val: string) => void;
  label?: string;
  value: string;
  icon?: string;
  filterValue: string;
  className?: string;
  rippleColor?: string;
  marked?: boolean;
  children: React.ReactNode;
};

export const ToggleButton = ({
  onClick,
  label,
  value,
  icon,
  filterValue,
  className,
  rippleColor = "white",
  marked,
  children,
}: ToggleButtonType) => {
  return (
    <View className="overflow-hidden rounded-lg">
      <Pressable
        onPress={() => (filterValue === value ? onClick("") : onClick(value))}
        android_ripple={{ color: rippleColor }}
        className={cn(
          "border-2 border-gray-700 rounded-lg space-y-2 min-w-[50px] min-h-[50px] items-center justify-center",
          className,
          {
            "bg-violet-500": marked,
            "border-violet-500": marked,
          }
        )}
      >
        {children}
      </Pressable>
    </View>
  );
};
