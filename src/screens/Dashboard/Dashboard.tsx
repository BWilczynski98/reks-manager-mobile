import React from "react";
import { Button, View, Text } from "react-native";
import { emptySplitApi } from "redux/emptyApi";
import { logout } from "redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useGetAnotherDataQuery, useGetUserDataQuery, useLogoutMutation } from "redux/services/auth";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutMutation();
  const token = useAppSelector((state) => state.userReducer.token);
  const { data } = useGetUserDataQuery();
  const { data: anotherData, error } = useGetAnotherDataQuery();

  console.log("🚀 ~ file: Dashboard.tsx:12 ~ Dashboard ~ data:", data);

  const logoutFunction = async () => {
    await logoutUser(null)
      .unwrap()
      .then(() => {
        dispatch(logout());
        dispatch(emptySplitApi.util.resetApiState());
      });
  };

  const fetchData = () => {
    console.log("🚀 ~ file: Dashboard.tsx:14 ~ Dashboard ~ error:", error);
    console.log("🚀 ~ file: Dashboard.tsx:14 ~ Dashboard ~ anotherData:", anotherData);
  };

  return (
    <View>
      <View>
        <Text>user token: {token}</Text>
        <Button title="Pobierz" onPress={fetchData} />
        <Button title="logout" onPress={logoutFunction} />
      </View>
    </View>
  );
};
