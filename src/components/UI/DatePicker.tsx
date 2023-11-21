import { cn } from "@/lib";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type DatePickerPropsType = {
  error?: boolean;
  errorMessage?: string;
  value: Date;
  onConfirm: (date: Date) => void;
  minimumDate?: string | number | Date;
  maximumDate?: string;
  label?: string;
  placeholder?: string;
};

type PropsType = DatePickerPropsType & TextInputProps;

export const DatePicker = ({
  error,
  errorMessage,
  value,
  onConfirm,
  minimumDate = "",
  maximumDate,
  label,
  placeholder,
}: PropsType) => {
  const today = new Date();
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);

  const handleOpenDatePicker = () => {
    setDatePickerIsVisible(true);
  };

  const handleCloseDatePicker = () => {
    setDatePickerIsVisible(false);
  };

  const handleConfirm = (date: Date) => {
    onConfirm(date);
    handleCloseDatePicker();
  };

  return (
    <View className="space-y-4">
      <Text className={cn("text-gray-50 font-semibold text-base", { "text-red-500": error })}>{label}</Text>
      <View className="rounded-lg overflow-hidden">
        <Pressable
          className={cn("w-full border-2 border-gray-800 rounded-lg px-4 py-2  flex-row justify-between", {
            "border-red-500": error,
          })}
          android_ripple={{ color: "#1f2937", foreground: false }}
          onPress={handleOpenDatePicker}
        >
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={"#6b7280"}
            editable={false}
            value={value}
            className="text-gray-50"
          />
          <MaterialIcons name="date-range" size={24} color="#6b7280" />
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={datePickerIsVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={handleCloseDatePicker}
        minimumDate={maximumDate ? new Date(minimumDate) : new Date("2000-01-01")}
        maximumDate={maximumDate ? new Date(maximumDate) : today}
      />
      {error && <Text className="text-red-500 font-semibold">{errorMessage}</Text>}
    </View>
  );
};
