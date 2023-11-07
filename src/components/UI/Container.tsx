import { cn } from "@/lib/cn";
import React from "react";
import { Platform, SafeAreaView } from "react-native";

type RootPropsType = {
  children: React.ReactNode;
};

export const Container = ({ children }: RootPropsType) => {
  return (
    <SafeAreaView className={cn("bg-gray-950 flex-1", { "pt-10": Platform.OS === "android" })}>{children}</SafeAreaView>
  );
};
