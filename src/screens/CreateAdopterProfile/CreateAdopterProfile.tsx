import { Button, Container, Input } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "react-native-toast-notifications";
import { useCreateAdopterProfileMutation, useGetAdoptersQuery } from "redux/services/animal";
import { AdoptionContractFormData, adoptionContractFormSchema } from "./helpers/schema";
import { HomeScreenStackProps } from "@/navigation/types/NavigationTypes";

export const CreateAdopterProfile = ({ navigation }: HomeScreenStackProps) => {
  const toast = useToast();
  const [createAdopterProfile, { isLoading }] = useCreateAdopterProfileMutation();
  const { refetch: refetchAdopters } = useGetAdoptersQuery();
  // RHF settings
  const initialState: AdoptionContractFormData = {
    name: "",
    phone_number: "",
    address: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdoptionContractFormData>({
    resolver: yupResolver(adoptionContractFormSchema),
    defaultValues: initialState,
  });

  const onSubmit = async (data: AdoptionContractFormData) => {
    await createAdopterProfile({ ...data })
      .unwrap()
      .then(() => {
        refetchAdopters();
        toast.show("Stworzono nowy profil adoptującego", { type: "success", placement: "top" });
        navigation.goBack();
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.show("Coś poszło nie tak", { type: "danger", placement: "top" });
      });
  };

  return (
    <Container>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        bounces={false}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={true}
      >
        <View>
          <Text className="text-gray-300 text-lg font-medium">Dodaj nowy profil</Text>
        </View>
        <View style={{ rowGap: 14, marginVertical: 10, paddingHorizontal: 16 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Imię i nazwisko *"
                placeholder="Imię i nazwisko osoby podpisującej umowe adopcyjną"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.name}
                errorMessage={errors.name?.message}
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Numer telefonu *"
                placeholder="Numer kontaktowy do osoby adoptującej"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.phone_number}
                errorMessage={errors.phone_number?.message}
                keyboardType="phone-pad"
              />
            )}
            name="phone_number"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Adres *"
                placeholder="Adres zamieszkania osoby adoptującej"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.address}
                errorMessage={errors.address?.message}
              />
            )}
            name="address"
          />
          <View className="my-4">
            <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
              Stwórz profil
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};
