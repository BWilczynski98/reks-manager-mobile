import { BottomSheetBackdrop, BottomSheetFooterProps, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { FC, ReactNode, forwardRef, useCallback, useMemo } from "react";
import { Text, View } from "react-native";

type Props = {
  title?: string;
  name?: string;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
  backdrop?: boolean;
  children: ReactNode;
  footer?: FC<BottomSheetFooterProps>;
};

type Ref = BottomSheetModal;

const Sheet = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => (props.snapPoints?.length ? props.snapPoints : ["25%", "50%"]), []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        enableTouchThrough={false}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      name={props.name}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={props.enablePanDownToClose}
      backdropComponent={props.backdrop ? renderBackdrop : null}
      backgroundStyle={{ backgroundColor: "#1f2937" }}
      handleIndicatorStyle={{ backgroundColor: "#f9fafb" }}
      style={{ paddingHorizontal: 16 }}
      footerComponent={props.footer}
      keyboardBlurBehavior="restore"
    >
      <View className="mb-3">
        <Text className="text-gray-50 text-xl font-semibold">{props.title}</Text>
      </View>
      <View>{props.children}</View>
    </BottomSheetModal>
  );
});

Sheet.defaultProps = {
  name: undefined,
  enablePanDownToClose: false,
};

export default Sheet;
