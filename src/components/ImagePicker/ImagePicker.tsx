import { MaterialIcons } from "@expo/vector-icons";
import * as ExpoImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Button } from "../UI";

type Props = {
  onChange: (e: {} | undefined) => void;
  value: string | undefined | File;
};

export const ImagePicker = ({ onChange, value }: Props) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const file = result.assets[0];
      let parts = file.uri.split("/");
      let filenameWithExtension = parts[parts.length - 1];
      let filenameWithoutExtension = filenameWithExtension.replace(".jpeg", "");
      console.log("🚀 ~ file: ImagePicker.tsx:29 ~ pickImage ~ filenameWithoutExtension:", filenameWithoutExtension);
      setImage(result.assets[0].uri);
      onChange(JSON.stringify({ name: "image_name", uri: file.uri, type: "image" }));
    }
  };

  const deleteImage = () => {
    setImage(null);
    onChange(undefined);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <View className="w-full relative">
          <Image source={{ uri: image }} style={{ width: "100%", height: 208, borderRadius: 10 }} />
          <Pressable className="absolute right-4 top-2" onPress={deleteImage}>
            <Text className="text-red-500">Usuń</Text>
          </Pressable>
        </View>
      )}
      {!image && (
        <View className="overflow-hidden rounded-lg w-full">
          <Pressable
            className="w-full h-52 bg-gray-800 rounded-lg items-center justify-center"
            onPress={pickImage}
            android_ripple={{ color: "#374151" }}
          >
            <MaterialIcons name="add-a-photo" size={36} color="white" />
          </Pressable>
        </View>
      )}
      {image && (
        <View className="w-full mt-4">
          <Button onPress={pickImage} variant="outline">
            Wybierz inne
          </Button>
        </View>
      )}
    </View>
  );
};
