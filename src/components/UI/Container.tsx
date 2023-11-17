import { cn } from "@/lib/cn";
import React from "react";
import { Platform, SafeAreaView, StatusBar } from "react-native";

type RootPropsType = {
  children: React.ReactNode;
};

export const Container = ({ children }: RootPropsType) => {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
      className={cn("bg-gray-950")}
    >
      {children}
    </SafeAreaView>
  );
};
