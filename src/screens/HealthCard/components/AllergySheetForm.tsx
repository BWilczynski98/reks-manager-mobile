import { Button, Checkbox } from "@/components";
import Sheet from "@/components/Sheet/Sheet";
import { errorsDictionary } from "@/helpers/errors-dictionary";
import { cn } from "@/lib";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { forwardRef, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import { SheetInput } from "./SheetInput";

type Ref = BottomSheetModal;

// Yup config
const schema = yup.object().shape({
  category: yup.string().required(errorsDictionary.required),
  name: yup.string().required(errorsDictionary.required),
  description: yup.string().required(errorsDictionary.required),
});
type AllergySchemaType = yup.InferType<typeof schema>;
const initialValues: AllergySchemaType = { category: "", name: "", description: "" };

// Helper const for maping categories
type Category = {
  label: string;
  value: string;
};
const categories: Category[] = [
  { label: "Pokarmowa", value: "POKARM" },
  { label: "Kontaktowa", value: "KONTAKT" },
  { label: "Wziewna", value: "INHALACJA" },
];

type AllergySheetFormType = { onClose: () => void };

export const AllergySheetForm = forwardRef<Ref, AllergySheetFormType>((props, ref) => {
  // RHF config
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AllergySchemaType>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: AllergySchemaType) => {
    console.log(data);
    reset();
  };

  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <Sheet
      ref={ref}
      title={"Formularz alergii"}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdrop={true}
      name="new-allergy-sheet"
    >
      <View style={{ rowGap: 8 }}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <Text
                className={cn("text-gray-50 font-semibold text-base", {
                  "text-red-500": !!errors.category,
                })}
              >
                Rodzaj *
              </Text>
              {categories.map((category) => {
                return (
                  <Checkbox
                    radio={true}
                    key={category.value}
                    label={category.label}
                    value={category.value}
                    onPress={onChange}
                    isChecked={category.value === value}
                  />
                );
              })}
            </View>
          )}
          name="category"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <SheetInput
              error={!!errors.name}
              errorMessage={errors.name?.message}
              label="Alergen *"
              placeholder="Nazwa substancji, która wywołuje alergię"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
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
              label="Objawy *"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              multiline={true}
              numberOfLines={6}
              style={{ textAlignVertical: "top" }}
              placeholder="Opisz objawy jakie towarzyszą alergii"
            />
          )}
          name="description"
        />
        <View style={{ rowGap: 10, marginVertical: 16 }}>
          <Button onPress={handleSubmit(onSubmit)}>Dodaj alergie</Button>
          <Button variant="outline" onPress={props.onClose}>
            Zamknij
          </Button>
        </View>
      </View>
    </Sheet>
  );
});

const style = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    borderColor: "#374151",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "#f9fafb",
  },
});
