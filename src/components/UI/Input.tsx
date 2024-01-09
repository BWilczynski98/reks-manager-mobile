import { cn } from "@/lib/cn";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useEffect, useRef } from "react";
import { Keyboard, Pressable, Text, TextInput, TouchableOpacity, View, type TextInputProps } from "react-native";

type InputProps = {
  error?: boolean;
  errorMessage?: string;
  togglePasswordVisibility?: () => void;
  passwordIsVisible?: boolean;
  label?: string;
  password?: boolean;
};

type ExtendedTextInputProps = TextInputProps & InputProps;

type EyeIconProps = {
  togglePasswordVisibility?: () => void;
  passwordIsVisible?: boolean;
};

export const Input = (props: ExtendedTextInputProps) => {
  const { error, errorMessage, togglePasswordVisibility, secureTextEntry, label, password } = props;
  const inputRef = useRef<TextInput>(null);

  const EyeIcon = ({ togglePasswordVisibility, passwordIsVisible }: EyeIconProps) => {
    return (
      <TouchableOpacity onPress={togglePasswordVisibility} className="w-6">
        <Entypo name={passwordIsVisible ? "eye" : "eye-with-line"} size={24} color={"white"} />
      </TouchableOpacity>
    );
  };

  const keyboardDidHideCallback = () => {
    inputRef.current ? inputRef.current.blur?.() : null;
  };

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener("keyboardDidHide", keyboardDidHideCallback);

    return () => {
      keyboardDidHideSubscription?.remove();
    };
  }, []);

  return (
    <Pressable
      className="w-full space-y-4"
      onPress={() => {
        inputRef.current ? inputRef.current.focus() : null;
      }}
    >
      <Text className={cn("text-gray-50 font-semibold text-base", { "text-red-500": error })}>{label}</Text>
      <View
        className={cn(
          "w-full border-2 border-gray-700 rounded-lg px-4 py-2 focus:border-violet-600 flex-row justify-between",
          {
            "border-red-500": error,
          }
        )}
      >
        <TextInput
          ref={inputRef}
          className="text-gray-50"
          selectionColor={"white"}
          placeholderTextColor={"#6b7280"}
          {...props}
        />
        {password ? (
          <EyeIcon togglePasswordVisibility={togglePasswordVisibility} passwordIsVisible={secureTextEntry} />
        ) : null}
      </View>
      {error && <Text className="text-red-500 font-semibold">{errorMessage}</Text>}
    </Pressable>
  );
};
