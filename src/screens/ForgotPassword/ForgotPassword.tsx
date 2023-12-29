import { Button, Container, Input } from "@/components";
import { Heading } from "@/components/UI/Heading";
import { errorsDictionary } from "@/helpers/errors-dictionary";
import { AuthorizationStackProps } from "@/navigation/types/NavigationTypes";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useSendPasswordResetTokenToUserEmailMutation } from "redux/services/auth";
import * as yup from "yup";

const userAuthFormSchema = yup.object({
  email: yup.string().email(errorsDictionary.not_valid_email_address).required(errorsDictionary.required),
});

type ForgotPasswordFormData = yup.InferType<typeof userAuthFormSchema>;

type NotificationOfSuccessType = {
  backToLoginScreen: () => void;
  email: string | null;
};

const NotificationOfSuccess = ({ backToLoginScreen, email }: NotificationOfSuccessType) => {
  return (
    <View className="flex-1 justify-center px-4">
      <View className="space-y-4">
        <View>
          <Heading fontSize="3xl">Sprawdź szkynkę email</Heading>
        </View>
        <View>
          <Text className="text-gray-50 text-base">
            Wysłaliśmy link resetujący hasło na adres email{" "}
            <Text className="font-semibold text-violet-400">{email}</Text> Wiadomość może przyjść w ciągu paru minut.
            Sprawdź folder spam
          </Text>
        </View>
      </View>
      <View className="space-y-4 mt-10">
        <View>
          <Button onPress={backToLoginScreen}>Powrót do logowania</Button>
        </View>
      </View>
    </View>
  );
};

export const ForgotPassword = ({ navigation }: AuthorizationStackProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(userAuthFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const [userEmailPrompt, setUserEmailPrompt] = useState<string | null>(null);
  const [sendPasswordResetTokenToUserEmail, { isLoading, isSuccess }] = useSendPasswordResetTokenToUserEmailMutation();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await sendPasswordResetTokenToUserEmail(data).unwrap();
    setUserEmailPrompt(data.email);
  };

  const backToLoginScreen = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <View className="mt-4 px-4">
        <Pressable onPress={backToLoginScreen}>
          <Text className="text-gray-50 font-semibold">
            <ChevronLeftIcon color="white" size={24} />
          </Text>
        </Pressable>
      </View>
      {isSuccess ? (
        <NotificationOfSuccess backToLoginScreen={backToLoginScreen} email={userEmailPrompt} />
      ) : (
        <>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 40}
          >
            <View className="flex-1 justify-center px-4">
              <View className="py-4">
                <View className="items-center">
                  <Heading fontSize="3xl">Przypominanie hasła</Heading>
                </View>
              </View>
              <View className="space-y-4">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <Input
                        label="Email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        inputMode="email"
                        cursorColor={"#fff"}
                        placeholder="Podaj swój adres email"
                        error={!!errors.email}
                        errorMessage={errors.email?.message}
                      />
                    </View>
                  )}
                  name="email"
                />
                <View>
                  <Text className="text-gray-400">
                    Wprowadź adres e-mail, na który chcesz otrzymać informacje dotyczace restowania hasła.
                  </Text>
                </View>
              </View>
              <View className="mt-10 space-y-4">
                <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
                  Zresetuj hasło
                </Button>
                <Pressable onPress={() => navigation.goBack()}>
                  <Text className="text-gray-50 text-center font-semibold">Wróc do logowania</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </Container>
  );
};
