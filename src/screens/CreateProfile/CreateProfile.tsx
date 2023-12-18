import { Button, Checkbox, Container, DatePicker, Input } from "@/components";
import { ImagePicker } from "@/components/ImagePicker";
import { cn } from "@/lib";
import { ScreenNames } from "@/navigation/screenNames";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "react-native-toast-notifications";
import { useGetAnimalsQuery, usePostAnimalMutation } from "redux/services/animal";
import { FocusAwareStatusBar } from "../Dashboard/components/FocusAwareStatusBar";
import { AnimalProfileFormData, animalProfileFormSchema } from "./helpers/schema";

const dayjs = require("dayjs");

const initialState = {
  name: "",
  animal_type: "KOT",
  size: "",
  gender: "SAMIEC",
  breed: "",
  birth_date: undefined,
  status: "NIE_DO_ADOPCJI",
  location_where_found: "",
  date_when_found: undefined,
  residence: "SCHRONISKO",
  temporaryHome: "",
  image: undefined,
};

export const CreateProfile = ({ navigation }: any) => {
  const { refetch } = useGetAnimalsQuery();
  const [postAnimal, { isLoading, isSuccess }] = usePostAnimalMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AnimalProfileFormData>({
    resolver: yupResolver(animalProfileFormSchema),
    defaultValues: initialState,
  });
  const toast = useToast();

  const onSubmit = async (data: AnimalProfileFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("animal_type", data.animal_type);
    formData.append("size", data.size ? data.size : "");
    formData.append("gender", data.gender);
    formData.append("breed", data.breed ? data.breed : "");
    formData.append("birth_date", dayjs(data.birth_date).format("YYYY-MM-DD"));
    formData.append("status", data.status as string);
    formData.append("location_where_found", data.location_where_found);
    formData.append("date_when_found", dayjs(data.date_when_found).format("YYYY-MM-DD"));
    formData.append("residence", data.residence);
    formData.append("temporary_home", data.temporary_home ? data.temporary_home : "");

    data.image && formData.append("image", data.image);

    await postAnimal(formData)
      .unwrap()
      .then(() => {
        refetch().then(() => {
          navigation.navigate("Tabs", { screen: ScreenNames.DASHBOARD });
          toast.show("Utworzono nowy profil", {
            type: "success",
            placement: "top",
          });
        });
      })
      .catch((err) => {
        toast.show("Coś poszło nie tak", {
          type: "danger",
          placement: "top",
        });
      });
    await refetch();

    resetForm();
  };

  const resetForm = () => {
    reset(initialState);
  };

  // helpers to render checkboxes
  const animalType = [
    { label: "Kot", value: "KOT" },
    { label: "Pies", value: "PIES" },
  ];

  const animalSize = [
    { label: "Mały", value: "small" },
    { label: "Średni", value: "medium" },
    { label: "Duży", value: "big" },
    { label: "B.duży", value: "very big" },
  ];

  const animalGender = [
    { label: "Samiec", value: "SAMIEC" },
    { label: "Samica", value: "SAMICA" },
  ];
  const animalResidence = [
    { label: "Siedziba", value: "SCHRONISKO" },
    // { label: "Dom tymczasowy", value: "TYMCZASOWY_DOM" },
  ];

  return (
    <Container>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1f2937" />
      <View className="flex-row bg-gray-800 px-4 py-[14px] items-center justify-between">
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
            render={({ field: { onChange, value } }) => (
              <ImagePicker onChange={onChange} value={value} isSuccess={isSuccess} remove={true} />
            )}
            name="image"
          />
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
                    <Text
                      className={cn("text-gray-50 font-semibold text-base", {
                        "text-red-500": !!errors.animal_type,
                      })}
                    >
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
            name="animal_type"
          />
          {watch("animal_type") === "PIES" ? (
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <View className="space-y-4">
                    <View>
                      <Text
                        className={cn("text-gray-50 font-semibold text-base", {
                          "text-red-500": !!errors.size,
                        })}
                      >
                        Wielkość *
                      </Text>
                    </View>
                    <View>
                      {animalSize.map((type) => (
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
              name="size"
            />
          ) : null}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <View className="space-y-4">
                  <View>
                    <Text
                      className={cn("text-gray-50 font-semibold text-base", {
                        "text-red-500": !!errors.gender,
                      })}
                    >
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
                error={!!errors.birth_date}
                errorMessage={errors.birth_date?.message}
                label="Data urodzenia *"
                placeholder="Podaj szacowaną datę urodzenia"
              />
            )}
            name="birth_date"
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
                error={!!errors.breed}
                errorMessage={errors.breed?.message}
              />
            )}
            name="breed"
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
                error={!!errors.location_where_found}
                errorMessage={errors.location_where_found?.message}
              />
            )}
            name="location_where_found"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Data zabezpieczenia *"
                value={value ? dayjs(value).format("DD MMMM YYYY") : undefined}
                onConfirm={(date) => {
                  onChange(date);
                }}
                error={!!errors.date_when_found}
                errorMessage={errors.date_when_found?.message}
                placeholder="Podaj dzień przyjęcia do schroniska"
              />
            )}
            name="date_when_found"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <View className="space-y-4">
                  <View>
                    <Text
                      className={cn("text-gray-50 font-semibold text-base", {
                        "text-red-500": !!errors.residence,
                      })}
                    >
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
