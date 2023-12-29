import { Button } from "@/components";
import { transformAnimalStatus } from "@/lib";
import { ScreenNames } from "@/navigation/screenNames";
import { AnimalProfileStackProps } from "@/navigation/types/NavigationTypes";
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useDeleteAnimalMutation, useGetProfilesOfAllAnimalsQuery } from "redux/services/animal";
import { ConfirmationModal } from "./components/ConfirmationModal";
import { InformationTile } from "./components/InformationTile";
import OperationButton from "./components/OperationButton";

const transformAnimalGender = (type: string, gender: string): string => {
  let animalGender = "";

  const genderOfDogs = () => {
    return (animalGender = gender === "SAMIEC" ? "Samiec" : "Suczka");
  };
  const genderOfCats = () => {
    return (animalGender = gender === "SAMIEC" ? "Kocur" : "Kotka");
  };

  return type === "PIES" ? genderOfDogs() : genderOfCats();
};

const statusTileColor = (status: string): string => {
  switch (status) {
    case "KWARANTANNA":
      return "bg-red-300/90";
    case "DO_ADOPCJI":
      return "bg-blue-300/90";
    case "ZAADOPTOWANY":
    case "ADOPTED":
      return "bg-green-300/90";
    default:
      return "bg-gray-300/90";
  }
};

export const AnimalProfile = ({ navigation, route }: AnimalProfileStackProps) => {
  const [deleteAnimal, { isLoading }] = useDeleteAnimalMutation();
  const { refetch: refetchAnimals } = useGetProfilesOfAllAnimalsQuery();
  const animal = route.params.animalData;
  const { status, slug, image, name, gender, animal_type, birth_date, breed, location_where_found } = animal;

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const toast = useToast();

  const handleScreenBack = () => {
    navigation.goBack();
  };

  const handleOpenAdoptionAnnouncementFormScreen = () => {
    navigation.navigate(ScreenNames.ADOPTION_ANNOUNCEMENT_FORM, { animalData: animal });
  };

  const handleOpenEditProfileScreen = () => {
    navigation.navigate(ScreenNames.EDIT_ANIMAL_PROFILE, { animalData: animal });
  };

  const handleOpenAdoptionContractFormScreen = () => {
    navigation.navigate(ScreenNames.ADOPTION_CONTRACT_FORM, { animalData: animal });
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
        {/* Navigation */}
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 mt-10"}>
          <TouchableOpacity
            className="rounded-full bg-gray-600 p-2 items-center"
            onPress={handleScreenBack}
            activeOpacity={0.75}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
        {/* Profile image */}
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
        {/* Basic information */}
        <View className="px-4 my-4 space-y-6">
          <View>
            <Text className="text-4xl font-semibold text-gray-50">{name}</Text>
            <Text className="text-xl  text-gray-300">{breed ? breed : "Mieszana"}</Text>
          </View>
          <View style={{ rowGap: 16 }}>
            <InformationTile
              title="Płeć"
              description={transformAnimalGender(animal_type, gender)}
              color="bg-yellow-300/90"
            />
            <InformationTile title="Data urodzenia" description={birth_date} color="bg-pink-300/90" />
            <InformationTile title="Miejsce złapania" description={location_where_found} color="bg-cyan-300/90" />
            <InformationTile
              title="Status"
              description={transformAnimalStatus(status)}
              color={statusTileColor(status)}
            />
          </View>
          {/* Profile management section */}
          <View>
            <View className="mb-4 border-b border-gray-600 pb-2">
              <Text className="text-gray-50 font-semibold text-2xl">Zarządzanie</Text>
            </View>
            <View style={{ rowGap: 10 }}>
              {status !== "ZAADOPTOWANY" && status !== "ADOPTED" ? (
                <OperationButton
                  icon={<AntDesign name="notification" size={24} color="white" />}
                  title="Ogłoszenie adopcyjne"
                  onPress={handleOpenAdoptionAnnouncementFormScreen}
                  // iconBackgroundColor="bg-green-500"
                />
              ) : null}
              {/* <OperationButton
                icon={<MaterialIcons name="medical-services" size={24} color="white" />}
                title="Karta zdrowia"
                onPress={handleOpenEditProfileScreen}
              /> */}
              <OperationButton
                icon={<MaterialCommunityIcons name="file-document" size={24} color="white" />}
                title="Umowa adopcyjna"
                onPress={handleOpenAdoptionContractFormScreen}
              />
              <OperationButton
                icon={<MaterialIcons name="edit" size={24} color="white" />}
                title="Edycja profilu"
                onPress={handleOpenEditProfileScreen}
              />
            </View>
          </View>
          <View style={{ rowGap: 14 }}>
            <Button variant="destructive" onPress={handleOpenModal}>
              Usuń
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
