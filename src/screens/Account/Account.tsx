import { Button, Input } from "@/components";
import { errorsDictionary } from "@/helpers/errors-dictionary";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "react-native-toast-notifications";
import { useGetUserDataQuery, usePasswordChangeMutation } from "redux/services/auth";
import * as yup from "yup";

const schema = yup.object().shape({
  previousPassword: yup
    .string()
    .trim()
    .required(errorsDictionary.required)
    .matches(/^(?!.*[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ])[a-zA-Z0-9!@#$%^&*()-_=+]+$/, errorsDictionary.not_allowed_signs),
  password: yup
    .string()
    .trim()
    .required(errorsDictionary.required)
    .matches(/^(?!.*[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ])[a-zA-Z0-9!@#$%^&*()-_=+]+$/, errorsDictionary.not_allowed_signs),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), ""], errorsDictionary.password_not_match)
    .required(errorsDictionary.required)
    .matches(/^(?!.*[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ])[a-zA-Z0-9!@#$%^&*()-_=+]+$/, errorsDictionary.not_allowed_signs),
});

type NewPasswordSchemaForm = yup.InferType<typeof schema>;
const initialValues: NewPasswordSchemaForm = {
  previousPassword: "",
  password: "",
  confirmPassword: "",
};

type HeaderPropsType = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderPropsType) => {
  return <Text className="text-gray-300 text-xl font-semibold">{children}</Text>;
};

export const Account = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<NewPasswordSchemaForm>({ resolver: yupResolver(schema), defaultValues: initialValues });
  const { data: userData, isLoading: loadingUserData } = useGetUserDataQuery();
  const [SendNewPassword, { isLoading }] = usePasswordChangeMutation();
  const toast = useToast();

  const onSubmit = async (data: NewPasswordSchemaForm) => {
    const body = {
      old_password: data.previousPassword.trim(),
      new_password1: data.password.trim(),
      new_password2: data.confirmPassword.trim(),
    };
    await SendNewPassword(body)
      .unwrap()
      .then(() => {
        toast.show("Zmiana hasła zakończyła się sukcesem", { type: "success", placement: "top" });
        reset();
      })
      .catch((err) => {
        const incorrectPreviousPassword = err && err.data?.old_password[0];
        toast.show(incorrectPreviousPassword ? incorrectPreviousPassword : "Coś poszło nie tak", {
          type: "danger",
          placement: "top",
        });
      });
  };
  return (
    <>
      {loadingUserData ? (
        <View className="h-full w-full items-center justify-center">
          <ActivityIndicator size={"large"} color={"#8b5cf6"} />
        </View>
      ) : (
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableResetScrollToCoords={false}
          bounces={false}
          contentInsetAdjustmentBehavior="always"
          overScrollMode="always"
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 14 }}
        >
          <View className="space-y-6">
            <View style={{ rowGap: 14 }}>
              <Header>Imię i nazwisko</Header>
              <Text className="text-gray-50 text-lg py-2 bg-gray-800 w-56 rounded-lg text-center">
                {userData?.first_name} {userData?.last_name}
              </Text>
            </View>

            <View style={{ rowGap: 14 }}>
              <Header>Resetowanie hasła</Header>
              <View style={{ rowGap: 14 }}>
                <Controller
                  control={control}
                  name="previousPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      label="Stare hasło"
                      placeholder="Wpisz stare hasło"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={!!errors.previousPassword}
                      errorMessage={errors.previousPassword?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      label="Nowe hasło"
                      placeholder="Wpisz nowe hasło"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={!!errors.password}
                      errorMessage={errors.password?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      label="Powtórz hasło"
                      placeholder="Powtórz nowe hasło"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={!!errors.confirmPassword}
                      errorMessage={errors.confirmPassword?.message}
                    />
                  )}
                />
              </View>
              <Button variant="outline" onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
                Zmień hasło
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </>
  );
};
