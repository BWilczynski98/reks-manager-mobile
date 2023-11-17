import { StyleSheet, Text, View } from "react-native";
import React, { RefObject, useCallback, useMemo, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Button } from "../UI";

type BottomModalType = {
  ref: RefObject<BottomSheetModal>;
};

export const BottomModal = ({ ref }: BottomModalType) => {
  const snapPoints = useMemo(() => ["90%"], []);

  const handlePresentModalPress = useCallback(() => {
    ref?.current?.present();
  }, []);

  return (
    <View>
      {/* <Button onPress={handlePresentModalPress}>Open modal</Button> */}
      <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints}>
        <View>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({});
