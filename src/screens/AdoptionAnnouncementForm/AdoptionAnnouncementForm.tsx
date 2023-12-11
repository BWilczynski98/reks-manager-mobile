import { Container, Input } from "@/components";
import React from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";

export const AdoptionAnnouncementForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  return (
    <Container>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        bounces={false}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={true}
      >
        <View style={{ rowGap: 14, marginVertical: 10, paddingHorizontal: 16 }}>
          <View>
            <Text className="text-gray-50 text-lg font-medium text-justify">
              Wszystkie informacje na temat zwierzęcia są pobierane automatycznie z jego profilu. W celu utworzenia
              postu adopcyjnego należy wypełnić dodatkowo poniższe informacje opisujące charakter i usposobnienie
              zwierzęcia.
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};
