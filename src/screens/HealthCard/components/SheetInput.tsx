import { cn } from "@/lib";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { Text, View, type TextInputProps, StyleSheet } from "react-native";

type SheetInputType = {
  label?: string | undefined;
  placeholder?: string | undefined;
  error: boolean;
  errorMessage?: string | undefined;
};

type ExtendedSheetInputType = TextInputProps & SheetInputType;

export const SheetInput = (props: ExtendedSheetInputType) => {
  const { label, placeholder, error, errorMessage } = props;
  const borderRed = { borderColor: "#ef4444" };
  return (
    <View className="space-y-4">
      <Text className={cn("text-gray-50 font-semibold text-base", { "text-red-500": error })}>{label}</Text>
      <BottomSheetTextInput
        {...props}
        style={[style.inputContainer, error && borderRed, props.style && props.style]}
        cursorColor={"white"}
        placeholder={placeholder}
        placeholderTextColor={"#6b7280"}
      />
      {error && <Text className="text-red-500 font-semibold">{errorMessage}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    borderColor: "#374151",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "#f9fafb",
  },
});
