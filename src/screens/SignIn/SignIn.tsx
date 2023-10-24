import React from "react";
import { View, Text, Button } from "react-native";
import { signIn } from "redux/features/userSlice";
import { useAppDispatch } from "redux/hooks";

export const SignIn = () => {
  const dispatch = useAppDispatch();
  return (
    <View className="flex-1 justify-center items-center space-y-4">
      <View>
        <Text className="text-neutral-400">Sign in</Text>
      </View>
      <View>
        <Button title="sign in" onPress={() => dispatch(signIn("321312"))} />
      </View>
    </View>
  );
};
