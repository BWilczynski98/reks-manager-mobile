import { Button, Container } from "@/components";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { Text, View } from "react-native";
import { AllergySheetForm } from "./components/AllergySheetForm";

export const Allergies = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenSheet = () => bottomSheetRef.current?.present();
  const handleCloseSheet = () => bottomSheetRef.current?.close();

  return (
    <Container>
      <View style={{ flex: 1, rowGap: 14 }} className="justify-center items-center px-2">
        <Text className="text-gray-300 text-xl font-light text-center">
          Karta zdrowia nie ma jeszcze wpisanej żadnej alergii
        </Text>
        <View className="w-1/2">
          <Button onPress={handleOpenSheet}>Dodaj alergie</Button>
        </View>
      </View>
      <AllergySheetForm ref={bottomSheetRef} onClose={handleCloseSheet} />
    </Container>
  );
};
