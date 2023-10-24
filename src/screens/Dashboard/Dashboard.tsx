import React from "react";
import { Button, Text, View } from "react-native";
import { logout } from "redux/features/userSlice";
import { useAppDispatch } from "redux/hooks";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-neutral-400">Dashboard</Text>
      <View>
        <Button title="logout" onPress={() => dispatch(logout())} />
      </View>
    </View>
  );
};
