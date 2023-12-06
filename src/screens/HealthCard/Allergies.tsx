import { Container } from "@/components";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { AllergySheetForm } from "./components/AllergySheetForm";
import { Empty } from "./components/Empty";

export const Allergies = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenSheet = () => bottomSheetRef.current?.present();
  const handleCloseSheet = () => bottomSheetRef.current?.close();

  return (
    <Container>
      {false ? (
        <></>
      ) : (
        <Empty
          description="Brak informacji na temat alergii"
          buttonLabel="Dodaj alergie"
          handleOpenSheet={handleOpenSheet}
        />
      )}
      <AllergySheetForm ref={bottomSheetRef} onClose={handleCloseSheet} />
    </Container>
  );
};
