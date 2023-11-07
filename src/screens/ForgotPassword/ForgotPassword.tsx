import { View, Text, Platform, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Heading } from "@/components/UI/Heading";
import { Controller, useForm } from "react-hook-form";
import { errorsDictionary } from "@/helpers/errors-dictionary";
import * as yup from "yup";
import { Button, Input } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";

const userAuthFormSchema = yup.object({
  email: yup.string().email(errorsDictionary.not_valid_email_address).required(errorsDictionary.required),
});

type ForgotPasswordFormData = yup.InferType<typeof userAuthFormSchema>;

export const ForgotPassword = () => {
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

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log("🚀 ~ file: ForgotPassword.tsx:30 ~ onSubmit ~ data:", data);
  };

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      <View>
        <Heading fontSize="3xl">Przypominanie hasła</Heading>
      </View>
      <View>
        <View>
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
        </View>
        <View>
          <Button onPress={handleSubmit(onSubmit)} isLoading={false}>
            Wyślij
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
