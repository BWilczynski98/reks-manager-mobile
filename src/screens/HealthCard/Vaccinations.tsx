import { Container } from "@/components";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { Empty } from "./components/Empty";

export const Vaccinations = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenSheet = () => bottomSheetRef.current?.present();
  const handleCloseSheet = () => bottomSheetRef.current?.close();

  return (
    <Container>
      {false ? (
        <></>
      ) : (
        <Empty
          description="Brak informacji na temat szczepień"
          buttonLabel="Dodaj szczepienie"
          handleOpenSheet={handleOpenSheet}
        />
      )}
    </Container>
  );
};
