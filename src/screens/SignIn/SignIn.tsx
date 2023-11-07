import { Button, Container, Heading, Input } from "@/components";
import { StackProps } from "@/navigation/appNavigation";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { login } from "redux/features/userSlice";
import { useAppDispatch } from "redux/hooks";
import { useSignInMutation } from "redux/services/auth";
import * as yup from "yup";
import { userAuthFormSchema } from "./helpers/schema";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type AuthorizationFormData = yup.InferType<typeof userAuthFormSchema>;

export const SignIn = ({ navigation }: StackProps) => {
  const [
    signIn,
    {
      data: loginData,
      isSuccess: authorizationIsSuccess,
      error: authorizationError,
      isError: authorizationIsError,
      isLoading,
    },
  ] = useSignInMutation();

  const dispatch = useAppDispatch();
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationFormData>({
    resolver: yupResolver(userAuthFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => setPasswordIsVisible((prev) => !prev);

  const onSubmit = async (data: AuthorizationFormData) => {
    await signIn(data).unwrap();
  };

  useEffect(() => {
    if (authorizationIsSuccess) {
      dispatch(login({ token: loginData.token }));
    }
  }, [authorizationIsSuccess, authorizationIsError]);

  return (
    <Container>
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View className="flex-1 justify-center px-4">
          <View className="items-center">
            <Heading>Logowanie</Heading>
          </View>
          {/* Forms */}
          <View className="w-full space-y-6">
            {/* Email */}
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email"
                    placeholder="Podaj swój adres email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    error={!!errors.username}
                    errorMessage={errors.username?.message}
                  />
                )}
                name="username"
              />
            </View>
            {/* Password */}
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Hasło"
                    placeholder="Podaj swoje hasło"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    autoCorrect={false}
                    password
                    secureTextEntry={!passwordIsVisible}
                    togglePasswordVisibility={togglePasswordVisibility}
                  />
                )}
                name="password"
              />
            </View>
          </View>
          <View className="w-full border mt-10 space-y-4">
            <Button>Zaloguj</Button>
            <View>
              <Text className="text-gray-50 text-center">
                Zapomniałeś/aś hasła? <Text className="font-semibold">Kliknij tutaj</Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};
