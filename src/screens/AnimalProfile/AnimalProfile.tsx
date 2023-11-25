import { Button } from "@/components";
import { cn, transformAnimalStatus } from "@/lib";
import { AuthorizedStackProps } from "@/navigation/appNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

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
  const animal = route.params?.animalData;
  const { status } = animal;

  const handleScreenBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 mt-10"}>
          <TouchableOpacity
            className="rounded-full bg-violet-500 p-2 items-center"
            onPress={handleScreenBack}
            activeOpacity={0.75}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={{
              uri: animal.image,
            }}
            style={{ width: "100%", aspectRatio: 1 / 1, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
          />
        </View>
        <View className="px-4 my-4 space-y-6">
          <View>
            <Text className="text-4xl font-semibold text-gray-50">{animal?.name}</Text>
            <Text className="text-xl  text-gray-300">{animal?.breed ? animal.breed : "Kundelek"}</Text>
          </View>
          <View className="space-y-4">
            <View className="flex-row items-center space-x-2">
              <View className="w-1 h-14 bg-yellow-300/90 rounded-sm" />
              <View>
                <Text className="text-gray-300 text-lg">Płeć</Text>
                <Text className="text-gray-50 text-xl">{transformAnimalGender(animal.animal_type, animal.gender)}</Text>
              </View>
            </View>
            <View className="flex-row items-center space-x-2">
              <View className="w-1 h-14 bg-pink-300/90 rounded-sm" />
              <View>
                <Text className="text-gray-300 text-lg">Data urodzenia</Text>
                <Text className="text-gray-50 text-xl">{animal.birth_date}</Text>
              </View>
            </View>
            <View className="flex-row items-center space-x-2">
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
            <View>
              <Text className="text-gray-50 text-2xl font-semibold">Opis</Text>
              <Text className="text-gray-300 text-xl">{animal.description ? animal.description : "Brak opisu"}</Text>
            </View>
          </View>
          <View style={{ rowGap: 14 }}>
            <Button variant="outline">Edytuj</Button>
            <Button variant="destructive">Usuń</Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
