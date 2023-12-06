import { View, Text } from "react-native";
import React, { forwardRef, useMemo } from "react";
import { type BottomSheetModal } from "@gorhom/bottom-sheet";
import * as yup from "yup";
import { errorsDictionary } from "@/helpers/errors-dictionary";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components";
import Sheet from "@/components/Sheet/Sheet";
import { SheetInput } from "./SheetInput";

// Yup config
const schema = yup.object().shape({
  name: yup.string().required(errorsDictionary.required),
  description: yup.string().required(errorsDictionary),
});
type MedicationSchemaType = yup.InferType<typeof schema>;
const initialValues: MedicationSchemaType = { name: "", description: "" };

// Bottom sheet config
type Ref = BottomSheetModal;
type MedicationSheetFormType = { onClose: () => void };

export const MedicationSheetForm = forwardRef<Ref, MedicationSheetFormType>((props, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MedicationSchemaType>({ resolver: yupResolver(schema), defaultValues: initialValues });
  const snapPoints = useMemo(() => ["50%"], []);

  const onSubmit = async (data: MedicationSchemaType) => {
    console.log(data);
  };

  return (
    <Sheet
      ref={ref}
      title={"Formularz leku"}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdrop={true}
      name="new-medication-sheet"
    >
      <View style={{ rowGap: 8 }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <SheetInput
              error={!!errors.name}
              errorMessage={errors.name?.message}
              label="Nazwa leku *"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Wpisz nazwę leku"
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <SheetInput
              error={!!errors.description}
              errorMessage={errors.description?.message}
              label="Zalecenia *"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              multiline={true}
              numberOfLines={6}
              style={{ textAlignVertical: "top" }}
              placeholder="Opisz pory i dawki podawania leku"
            />
          )}
          name="description"
        />
        <View>
          <Button onPress={handleSubmit(onSubmit)}>Dodaj</Button>
          <Button onPress={props.onClose} variant="outline">
            Zamknij
          </Button>
        </View>
      </View>
    </Sheet>
  );
});
