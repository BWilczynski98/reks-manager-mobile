import { MaterialIcons } from "@expo/vector-icons";
import * as ExpoImagePicker from "expo-image-picker";
import mime from "mime";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Button } from "../UI";

type Props = {
  onChange: (e: {} | undefined) => void;
  value: string;
  isSuccess: boolean;
  remove?: boolean;
};

export const ImagePicker = ({ onChange, value, isSuccess, remove }: Props) => {
  const [image, setImage] = useState<string | null>(value);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      const imageName = file.uri.split("/").pop();
      const imageUri = "file:///" + file.uri.split("file:/").join("");

      setImage(result.assets[0].uri);
      onChange({
        name: imageName,
        uri: imageUri,
        type: mime.getType(imageUri),
      });
    }
  };

  const deleteImage = () => {
    setImage(null);
    onChange(undefined);
  };

  useEffect(() => {
    const clearImage = () => {
      setImage(null);
    };

    isSuccess && clearImage();
  }, [isSuccess]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <View className="w-full relative">
          <Image source={{ uri: image }} style={{ width: "100%", height: 208, borderRadius: 10 }} />
          {remove && (
            <Pressable className="absolute right-4 top-2" onPress={deleteImage}>
              <Text className="text-red-500">Usuń</Text>
            </Pressable>
          )}
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
