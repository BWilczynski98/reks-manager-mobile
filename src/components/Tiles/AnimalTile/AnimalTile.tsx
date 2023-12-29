import { Button } from "@/components/UI";
import { cn, transformAnimalStatus } from "@/lib";
import { ScreenNames } from "@/navigation/screenNames";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";

type AnimalTileType = {
  animal: Animal;
};

type RowType = { label: string; value: string };

const Row = ({ label, value }: RowType) => {
  const transformString = (input: string): string => {
    const inputConvertedToLowercase = input.toLowerCase();
    const transformedInput = inputConvertedToLowercase.charAt(0).toUpperCase() + inputConvertedToLowercase.slice(1);

    return transformedInput;
  };

  return (
    <View className="flex-row space-x-2">
      <Text className="text-gray-300 text-lg font-light">{transformString(label)}:</Text>
      <Text className="text-gray-50 text-xl font-normal">{transformString(value)}</Text>
    </View>
  );
};

const Avatar = () => {
  return (
    <View className="w-full aspect-video  justify-center items-center backdrop-blur-lg bg-gray-700">
      <MaterialIcons name="no-photography" size={24} color="white" />
      <Text className="text-gray-50 text-lg font-semibold">Brak zdjęcia</Text>
    </View>
  );
};

export const AnimalTile = ({ animal }: AnimalTileType) => {
  const { image, name, animal_type, gender, status } = animal;
  const navigation = useNavigation<any>();

  const navigateToAnimalTile = () => {
    navigation.navigate(ScreenNames.ANIMAL_PROFILE, { animalData: animal });
  };

  return (
    <View className="rounded-xl overflow-hidden bg-gray-800">
      <View>
        <View className="justify-center">
          {image ? (
            <Image
              source={{
                uri: image,
              }}
              style={{ width: "100%", aspectRatio: 16 / 9 }}
            />
          ) : (
            <Avatar />
          )}
        </View>
      </View>
      <View className="px-4 py-6 space-y-4">
        <View>
          <Row label="imię" value={name} />
          <Row label="typ" value={animal_type} />
          <Row label="płeć" value={gender} />
          <View className="flex-row space-x-2">
            <Text className="text-gray-300 text-lg font-light">Status:</Text>
            <Text
              className={cn("text-gray-50 text-xl font-normal", {
                "text-red-500": status === "KWARANTANNA",
                "text-blue-500": status === "DO_ADOPCJI",
                "text-green-500": status === "ZAADOPTOWANY" || status === "ADOPTED",
              })}
            >
              {transformAnimalStatus(status)}
            </Text>
          </View>
        </View>
        <View>
          <Button onPress={navigateToAnimalTile}>Zobacz profil</Button>
        </View>
      </View>
    </View>
  );
};
