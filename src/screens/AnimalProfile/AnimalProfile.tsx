import { Button } from "@/components";
import { cn, transformAnimalStatus } from "@/lib";
import { AuthorizedStackProps } from "@/navigation/appNavigation";
import { ScreenNames } from "@/navigation/screenNames";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useDeleteAnimalMutation, useGetAnimalsQuery } from "redux/services/animal";
import { useGetAnimalHealthCardQuery } from "redux/services/healthCard";

type ConfirmationModalProps = {
  modalIsVisible: boolean;
  closeModal: () => void;
  profileName: string;
  isLoading: boolean;
  onConfirm: () => void;
};

const ConfirmationModal = ({
  modalIsVisible,
  closeModal,
  profileName,
  isLoading,
  onConfirm,
}: ConfirmationModalProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Modal visible={modalIsVisible} transparent={true} animationType="fade" statusBarTranslucent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              paddingVertical: 18,
              paddingHorizontal: 20,
              backgroundColor: "#1f2937",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: "95%",
              rowGap: 16,
            }}
          >
            <View>
              <Text className="text-gray-50 text-2xl font-semibold">Potwierdź usuwanie profilu</Text>
            </View>
            <View>
              <Text className="text-gray-300 text-xl tracking-wide">
                Czy na pewno chcesz usunąć profil zwierzęcia o imieniu{" "}
                <Text className="font-semibold">{profileName}?</Text>
              </Text>
            </View>
            <View className="flex-row justify-end space-x-3">
              <View className="w-1/3">
                <Button variant="outline" onPress={closeModal}>
                  Anuluj
                </Button>
              </View>
              <View className="w-1/3">
                <Button variant="destructive" onPress={onConfirm} isLoading={isLoading}>
                  Usuń profil
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const transformAnimalGender = (type: AnimalType, gender: AnimalGender): string => {
  let animalGender = "";

  const genderOfDogs = () => {
    return (animalGender = gender === "SAMIEC" ? "Samiec" : "Suczka");
  };
  const genderOfCats = () => {
    return (animalGender = gender === "SAMIEC" ? "Kocur" : "Kotka");
  };

  return type === "PIES" ? genderOfDogs() : genderOfCats();
};

export const AnimalProfile = ({ navigation, route }: AuthorizedStackProps) => {
  const [deleteAnimal, { isLoading }] = useDeleteAnimalMutation();
  const { refetch: refetchAnimals } = useGetAnimalsQuery();
  const animal = route.params.animalData;
  console.log("🚀 ~ file: AnimalProfile.tsx:101 ~ AnimalProfile ~ animal:", animal);
  const {
    id,
    status,
    slug,
    image,
    name,
    gender,
    animal_type,
    birth_date,
    breed,
    description,
    description_of_health,
    location_where_found,
  } = animal;
  const { data: healthCard, isSuccess } = useGetAnimalHealthCardQuery(id);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const toast = useToast();

  const handleScreenBack = () => {
    navigation.goBack();
  };

  const handleOpenEditProfileScreen = () => {
    navigation.navigate(ScreenNames.EDIT_ANIMAL_PROFILE, { animalData: animal });
  };

  const handleOpenHealthCardScreen = () => {
    // Allergies is init screen in health card screen
    navigation.navigate(ScreenNames.HEALTH_CARD, {
      screen: ScreenNames.ALLERGIES,
    });
  };

  const handleOpenModal = () => setModalIsVisible(true);
  const handleCloseModal = () => setModalIsVisible(false);

  const handleDeleteAnimalProfile = async () => {
    await deleteAnimal(slug)
      .unwrap()
      .then(() => {
        handleCloseModal();

        refetchAnimals().then(() => {
          handleScreenBack();
          toast.show("Profil pomyślnie usunięty", {
            placement: "top",
            type: "success",
          });
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <ConfirmationModal
        modalIsVisible={modalIsVisible}
        closeModal={handleCloseModal}
        profileName={name}
        isLoading={isLoading}
        onConfirm={handleDeleteAnimalProfile}
      />
      <View>
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 mt-10"}>
          <TouchableOpacity
            className="rounded-full bg-gray-600 p-2 items-center"
            onPress={handleScreenBack}
            activeOpacity={0.75}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          {image ? (
            <Image
              source={{
                uri: image,
              }}
              style={{
                width: "100%",
                aspectRatio: 1,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}
            />
          ) : (
            <View
              style={{
                width: "100%",
                aspectRatio: 1,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1f2937",
              }}
            >
              <Text className={"text-gray-50 text-xl"}>Brak zdjęcia</Text>
            </View>
          )}
        </View>
        <View className="px-4 my-4 space-y-6">
          <View>
            <Text className="text-4xl font-semibold text-gray-50">{name}</Text>
            <Text className="text-xl  text-gray-300">{breed ? breed : "Mieszana"}</Text>
          </View>
          <View className="space-y-4">
            <View className="flex-row flex-wrap space-y-4">
              <View className="flex-row items-center space-x-2 basis-1/2">
                <View className="w-1 h-14 bg-yellow-300/90 rounded-sm" />
                <View>
                  <Text className="text-gray-300 text-lg">Płeć</Text>
                  <Text className="text-gray-50 text-xl">{transformAnimalGender(animal_type, gender)}</Text>
                </View>
              </View>
              <View className="flex-row items-center space-x-2 basis-1/2">
                <View className="w-1 h-14 bg-pink-300/90 rounded-sm" />
                <View>
                  <Text className="text-gray-300 text-lg">Data urodzenia</Text>
                  <Text className="text-gray-50 text-xl">{birth_date}</Text>
                </View>
              </View>
              <View className="flex-row items-center space-x-2 basis-1/2">
                <View className="w-1 h-14 bg-cyan-300/90 rounded-sm" />
                <View>
                  <Text className="text-gray-300 text-lg">Miejsce złapania</Text>
                  <Text className="text-gray-50 text-xl">{location_where_found}</Text>
                </View>
              </View>
              <View className="flex-row items-center space-x-2 basis-1/2">
                <View
                  className={cn("w-1 h-14 bg-gray-300/90 rounded-sm", {
                    "bg-red-300/90": status === "KWARANTANNA",
                    "bg-blue-300/90": status === "DO_ADOPCJI",
                    "bg-green-300/90": status === "ZAADOPTOWANY",
                  })}
                />
                <View>
                  <Text className="text-gray-300 text-lg">Status</Text>
                  <Text className="text-gray-50 text-xl">{transformAnimalStatus(status)}</Text>
                </View>
              </View>
            </View>
            <View>
              <Text className="text-gray-50 text-2xl font-semibold">Opis</Text>
              <Text className="text-gray-300 text-xl">{description ? description : "Brak opisu"}</Text>
            </View>
            <View>
              <Text className="text-gray-50 text-2xl font-semibold">Stan zdrowia</Text>
              <Text className="text-gray-300 text-xl">
                {description_of_health ? description_of_health : "Brak uwag"}
              </Text>
            </View>
          </View>
          <View style={{ rowGap: 14 }}>
            {/* <Button onPress={handleOpenHealthCardScreen}>Karta zdrowia</Button> */}
            <Button variant="outline" onPress={handleOpenEditProfileScreen}>
              Edytuj
            </Button>
            <Button variant="destructive" onPress={handleOpenModal}>
              Usuń
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
