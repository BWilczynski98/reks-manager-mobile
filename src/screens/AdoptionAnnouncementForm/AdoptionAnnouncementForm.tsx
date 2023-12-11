import { Button, Container, Input } from "@/components";
import { cn } from "@/lib";
import { AuthorizedStackProps, RootStackProps } from "@/navigation/appNavigation";
import { ScreenNames } from "@/navigation/screenNames";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Switch, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "react-native-toast-notifications";
import { useAdoptionAnnouncementMutation, useGetAnimalsQuery } from "redux/services/animal";
import Success from "./components/Success";
import { AdoptionAnnouncementFormData, adoptionAnnouncementFormSchema } from "./helpers/schema";

export const AdoptionAnnouncementForm = ({ navigation, route }: AuthorizedStackProps & RootStackProps) => {
  const animal = route.params.animalData;
  const toast = useToast();
  // RHF Settings
  const initialState: AdoptionAnnouncementFormData = {
    chip: animal.chip,
    neutered: animal.neutered,
    vaccinated: animal.vaccinated,
    dewormed: animal.dewormed,
    character: animal.character,
    for_who: animal.character,
    description_of_health: animal.description_of_health,
    description: animal.description,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdoptionAnnouncementFormData>({
    resolver: yupResolver(adoptionAnnouncementFormSchema),
    defaultValues: initialState,
  });

  // RTK Querry
  const { refetch: refetchAnimals } = useGetAnimalsQuery();
  const [editingPetProfileData, { isLoading, isSuccess }] = useAdoptionAnnouncementMutation();

  // Submiting adoption post data
  let response: Animal;
  const onSubmit = async (data: AdoptionAnnouncementFormData) => {
    await editingPetProfileData({ slug: animal.slug, body: { status: "DO_ADOPCJI", ...data } })
      .unwrap()
      .then((res) => {
        response = res;
        refetchAnimals();
      })
      .catch((err) =>
        toast.show("Coś poszło nie tak", {
          type: "danger",
          placement: "top",
        })
      );
  };

  const switcherErrors = !!errors.chip || !!errors.dewormed || !!errors.neutered || !!errors.vaccinated;

  return (
    <Container>
      {isSuccess ? (
        <Success
          name={animal.name}
          type={animal.animal_type}
          onBack={() => navigation.navigate(ScreenNames.DASHBOARD)}
          isEdit={animal.status === "DO_ADOPCJI"}
        />
      ) : (
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableResetScrollToCoords={false}
          bounces={false}
          contentInsetAdjustmentBehavior="always"
          overScrollMode="always"
          showsVerticalScrollIndicator={true}
        >
          <View style={{ rowGap: 14, marginVertical: 10, paddingHorizontal: 16 }}>
            <View>
              <Text className={cn("text-gray-50 font-semibold text-base", { "text-red-500": switcherErrors })}>
                Informacje zdrowotne
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row items-center">
                    <Switch
                      trackColor={{ false: "#767577", true: "#22c55e" }}
                      thumbColor={"white"}
                      onValueChange={onChange}
                      value={value}
                    />
                    <Text className={cn("text-gray-50 font-semibold text-base", { "text-red-500": false })}>Chip</Text>
                  </View>
                )}
                name="chip"
              />
              <Controller
                control={control}
                name="vaccinated"
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row items-center">
                    <Switch
                      trackColor={{ false: "#767577", true: "#22c55e" }}
                      thumbColor={"white"}
                      onValueChange={onChange}
                      value={value}
                    />
                    <Text className={cn("text-gray-50 font-semibold text-base", { "text-red-500": false })}>
                      Szczepienia
                    </Text>
                  </View>
                )}
              />
              <Controller
                control={control}
                name="dewormed"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="flex-row items-center">
                    <Switch
                      trackColor={{ false: "#767577", true: "#22c55e" }}
                      thumbColor={"white"}
                      onValueChange={onChange}
                      value={value}
                    />
                    <Text className={cn("text-gray-50 font-semibold text-base", { "text-red-500": false })}>
                      Odrobaczenie
                    </Text>
                  </View>
                )}
              />
              <Controller
                control={control}
                name="neutered"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="flex-row items-center">
                    <Switch
                      trackColor={{ false: "#767577", true: "#22c55e" }}
                      thumbColor={"white"}
                      onValueChange={onChange}
                      value={value}
                    />
                    <Text className={cn("text-gray-50 font-semibold text-base", { "text-red-500": false })}>
                      Kastracja/Sterylizacja
                    </Text>
                  </View>
                )}
              />
            </View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Stan zdrowia"
                  placeholder="Wymień choroby na jakie choruje zwierze"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                  numberOfLines={4}
                  style={{ textAlignVertical: "top" }}
                  error={!!errors.description_of_health}
                  errorMessage={errors.description_of_health?.message}
                />
              )}
              name="description_of_health"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Charakter"
                  placeholder="Krótki opis charakteru"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                  numberOfLines={4}
                  style={{ textAlignVertical: "top" }}
                  error={!!errors.character}
                  errorMessage={errors.character?.message}
                />
              )}
              name="character"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Dla kogo"
                  placeholder="Opisz jaki powinien być przyszły właściciel"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                  numberOfLines={4}
                  style={{ textAlignVertical: "top" }}
                  error={!!errors.for_who}
                  errorMessage={errors.for_who?.message}
                />
              )}
              name="for_who"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Treść ogłoszenia"
                  placeholder="Opis ogłoszenia, który ma zachęcić do adopcji"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                  numberOfLines={8}
                  style={{ textAlignVertical: "top" }}
                  error={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              )}
              name="description"
            />
            <View className="my-4">
              <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
                {animal.status !== "DO_ADOPCJI" ? "Stwórz ogłoszenie" : "Edytuj ogłoszenie"}
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </Container>
  );
};
