import { cn } from "@/lib/cn";
import React from "react";
import { Text } from "react-native";

type HeadingProps = {
  children: React.ReactNode;
  fontSize?: "sm" | "base" | "lg" | "2xl" | "3xl";
};

export const Heading = ({ children, fontSize = "lg" }: HeadingProps) => {
  return <Text className={cn(`text-gray-50 text-${fontSize}`)}>{children}</Text>;
};
