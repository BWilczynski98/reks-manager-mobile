import { Button, Checkbox, Container, DatePicker, Input } from "@/components";
import { cn } from "@/lib";
import { AuthorizedStackProps } from "@/navigation/appNavigation";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "react-native-toast-notifications";
import { useEditAnimalMutation, useGetAnimalsQuery } from "redux/services/animal";
import { type AnimalProfileFormData, animalProfileFormSchema } from "../CreateProfile/helpers/schema";
import { ImagePicker } from "@/components/ImagePicker";
// helpers to render checkboxes
const animalType = [
  { label: "Kot", value: "KOT" },
  { label: "Pies", value: "PIES" },
];

const animalGender = [
  { label: "Samiec", value: "SAMIEC" },
  { label: "Samica", value: "SAMICA" },
];
const animalResidence = [
  { label: "Siedziba", value: "SCHRONISKO" },
  // { label: "Dom tymczasowy", value: "TYMCZASOWY_DOM" },
];
const animalStatus = [
  { label: "Do adopcji", value: "DO_ADOPCJI" },
  { label: "Adoptowany", value: "ZAADOPTOWANY" },
  { label: "Nie do adopcji", value: "NIE_DO_ADOPCJI" },
  { label: "Kwarantanna", value: "KWARANTANNA" },
];

export const EditAnimalProfile = ({ navigation, route }: AuthorizedStackProps) => {
  const { refetch: refetchAnimals } = useGetAnimalsQuery();
  const [editingPetProfileData, { isLoading, isSuccess }] = useEditAnimalMutation();
  const animal = route.params.animalData;
  const initialState = {
    name: animal.name,
    animal_type: animal.animal_type,
    gender: animal.gender,
    breed: animal.breed,
    birth_date: new Date(animal.birth_date) as Date,
    description: animal.description,
    status: animal.status,
    location_where_found: animal.location_where_found,
    date_when_found: new Date(animal.date_when_found),
    residence: animal.residence,
    temporaryHome: animal.home,
    description_of_health: animal.description_of_health,
    image: animal.image,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AnimalProfileFormData>({
    resolver: yupResolver(animalProfileFormSchema),
    defaultValues: initialState,
  });

  const toast = useToast();

  const onSubmit = async (data: AnimalProfileFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("animal_type", data.animal_type);
    formData.append("gender", data.gender);
    formData.append("breed", data.breed ? data.breed : "");
    formData.append("birth_date", dayjs(data.birth_date).format("YYYY-MM-DD"));
    formData.append("description", data.description ? data.description : "");
    formData.append("status", data.status);
    formData.append("location_where_found", data.location_where_found);
    formData.append("date_when_found", dayjs(data.date_when_found).format("YYYY-MM-DD"));
    formData.append("residence", data.residence);
    formData.append("temporary_home", data.temporary_home ? data.temporary_home : "");
    formData.append("description_of_health", data.description_of_health ? data.description_of_health : "");

    if (data.image !== animal.image) {
      console.log(data.image);
      formData.append("image", data.image);
    }

    console.log("🚀 ~ file: EditAnimalProfile.tsx:112 ~ onSubmit ~ formData:", formData);
    let response: Animal;

    await editingPetProfileData({ slug: animal.slug, body: formData })
      .unwrap()
      .then((res) => {
        response = res;
      })
      .catch((err) => console.log(err));
    await refetchAnimals().then(() => {
      navigation.navigate("AnimalProfile", { animalData: response });
      toast.show("Profil edytowany", {
        type: "success",
        placement: "top",
      });
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
        <View style={{ rowGap: 14, marginVertical: 10, paddingHorizontal: 16 }}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImagePicker onChange={onChange} value={value} isSuccess={isSuccess} />
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
                value={dayjs(value).format("DD MMMM YYYY") as Date & string}
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
                value={dayjs(value).format("DD MMMM YYYY") as Date & string}
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
                error={!!errors.description_of_health}
                errorMessage={errors.description_of_health?.message}
                multiline={true}
                numberOfLines={8}
                style={{ textAlignVertical: "top" }}
              />
            )}
            name="description_of_health"
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
                error={!!errors.description}
                errorMessage={errors.description?.message}
                multiline={true}
                numberOfLines={8}
                style={{ textAlignVertical: "top" }}
              />
            )}
            name="description"
          />
          <View className="my-4">
            <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
              Zapisz
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};
