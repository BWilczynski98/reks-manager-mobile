import { Button, Checkbox, Container, DatePicker, Input } from "@/components";
import { cn } from "@/lib";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FocusAwareStatusBar } from "../Dashboard/components/FocusAwareStatusBar";
import { AnimalProfileFormData, animalProfileFormSchema } from "./helpers/schema";
const dayjs = require("dayjs");

const initialState = {
  name: "",
  type: "CAT",
  gender: "SAMIEC",
  bread: "",
  birthDate: undefined,
  description: "",
  status: "DO_ADOPCJI",
  locationWhereFound: "",
  dateWhenFound: undefined,
  residence: "SCHRONISKO",
  temporaryHome: "",
  descriptionOfHealth: "",
  // image: "",
};

export const CreateProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnimalProfileFormData>({
    resolver: yupResolver(animalProfileFormSchema),
    defaultValues: initialState,
  });

  const onSubmit = async (data: AnimalProfileFormData) => {
    console.log("🚀 ~ file: CreateProfile.tsx:32 ~ onSubmit ~ data:", data);
  };

  const resetForm = () => {
    reset(initialState);
  };

  // helpers to render checkboxes
  const animalType = [
    { label: "Kot", value: "CAT" },
    { label: "Pies", value: "DOG" },
  ];

  const animalGender = [
    { label: "Samiec", value: "SAMIEC" },
    { label: "Samica", value: "SAMICA" },
  ];
  const animalResidence = [
    { label: "Siedziba", value: "SCHRONISKO" },
    { label: "Dom tymczasowy", value: "TYMCZASOWY_DOM" },
  ];
  const animalStatus = [
    { label: "Do adopcji", value: "DO_ADOPCJI" },
    { label: "Adoptowany", value: "ZAADOPTOWANY" },
    { label: "Nie do adopcji", value: "NIE_DO_ADOPCJI" },
    { label: "Kwarantanna", value: "KWARANTANNA" },
  ];

  return (
    <Container>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1f2937" />
      <View className="flex-row bg-gray-800 px-4 py-4 items-center justify-between">
        <Text className="text-gray-50 text-lg font-semibold ">Stwórz nowy profil</Text>
        <TouchableOpacity activeOpacity={0.75} onPress={resetForm}>
          <Text className="text-violet-500">Wyczyść</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        bounces={false}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={true}
      >
        <View style={{ rowGap: 14, marginVertical: 10, paddingHorizontal: 16 }}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Imię *"
                placeholder="Podaj imię zwierzęcia"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCorrect={false}
                error={!!errors.name}
                errorMessage={errors.name?.message}
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <View className="space-y-4">
                  <View>
                    <Text className={cn("text-gray-50 font-semibold text-base", { "text-red-500": !!errors.type })}>
                      Typ *
                    </Text>
                  </View>
                  <View>
                    {animalType.map((type) => (
                      <Checkbox
                        radio={true}
                        key={type.value}
                        label={type.label}
                        value={type.value}
                        onPress={onChange}
                        isChecked={type.value === value}
                      />
                    ))}
                  </View>
                </View>
              );
            }}
            name="type"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <View className="space-y-4">
                  <View>
                    <Text className={cn("text-gray-50 font-semibold text-base", { "text-red-500": !!errors.type })}>
                      Płeć *
                    </Text>
                  </View>
                  <View>
                    {animalGender.map((gender) => (
                      <Checkbox
                        radio={true}
                        key={gender.value}
                        label={gender.label}
                        value={gender.value}
                        onPress={onChange}
                        isChecked={gender.value === value}
                      />
                    ))}
                  </View>
                </View>
              );
            }}
            name="gender"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                value={value ? dayjs(value).format("DD MMMM YYYY") : undefined}
                onConfirm={onChange}
                error={!!errors.birthDate}
                errorMessage={errors.birthDate?.message}
                label="Data urodzenia *"
                placeholder="Podaj szacowaną datę urodzenia"
              />
            )}
            name="birthDate"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Rasa"
                placeholder="Podaj rase zwierzęcia"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCorrect={false}
                error={!!errors.bread}
                errorMessage={errors.bread?.message}
              />
            )}
            name="bread"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Miejsce złapania *"
                placeholder="Podaj miejsce złapania np. Malbork"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCorrect={false}
                error={!!errors.locationWhereFound}
                errorMessage={errors.locationWhereFound?.message}
              />
            )}
            name="locationWhereFound"
          />

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Data zabezpieczenia *"
                value={value ? dayjs(value).format("DD MMMM YYYY") : undefined}
                onConfirm={(date) => {
                  console.log(date);
                  onChange(date);
                }}
                error={!!errors.dateWhenFound}
                errorMessage={errors.dateWhenFound?.message}
                placeholder="Podaj dzień przyjęcia do schroniska"
              />
            )}
            name="dateWhenFound"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <View className="space-y-4">
                  <View>
                    <Text className={cn("text-gray-50 font-semibold text-base", { "text-red-500": !!errors.type })}>
                      Gdzie przebywa *
                    </Text>
                  </View>
                  <View>
                    {animalResidence.map((residence) => (
                      <Checkbox
                        radio={true}
                        key={residence.value}
                        label={residence.label}
                        value={residence.value}
                        onPress={onChange}
                        isChecked={residence.value === value}
                      />
                    ))}
                  </View>
                </View>
              );
            }}
            name="residence"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <View className="space-y-4">
                  <View>
                    <Text className={cn("text-gray-50 font-semibold text-base", { "text-red-500": !!errors.type })}>
                      Status *
                    </Text>
                  </View>
                  <View>
                    {animalStatus.map((status) => (
                      <Checkbox
                        radio={true}
                        key={status.value}
                        label={status.label}
                        value={status.value}
                        onPress={onChange}
                        isChecked={status.value === value}
                      />
                    ))}
                  </View>
                </View>
              );
            }}
            name="status"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Stan zdrowia"
                placeholder="Krótki opis stanu zdrowia"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.bread}
                errorMessage={errors.bread?.message}
                multiline={true}
                numberOfLines={8}
                style={{ textAlignVertical: "top" }}
              />
            )}
            name="descriptionOfHealth"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Uwagi dodatkowe"
                placeholder="Krótki opis charakteru, sytuacji odebrania i inne uwagi"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.bread}
                errorMessage={errors.bread?.message}
                multiline={true}
                numberOfLines={8}
                style={{ textAlignVertical: "top" }}
              />
            )}
            name="description"
          />
          <View className="my-4">
            <Button onPress={handleSubmit(onSubmit)}>Stwórz profil</Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};
