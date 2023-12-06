import { View, Text } from "react-native";
import React, { useRef } from "react";
import { Empty } from "./components/Empty";
import { Container } from "@/components";
import { MedicationSheetForm } from "./components/MedicationSheetForm";
import { type BottomSheetModal } from "@gorhom/bottom-sheet";

export const Medication = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenSheet = () => bottomSheetRef.current?.present();
  const handleCloseSheet = () => bottomSheetRef.current?.close();

  return (
    <Container>
      <Empty
        description="Brak informacji na temat przyjmowania leków"
        buttonLabel="Dodaj lek"
        handleOpenSheet={handleOpenSheet}
      />
      <MedicationSheetForm ref={bottomSheetRef} onClose={handleCloseSheet} />
    </Container>
  );
};
