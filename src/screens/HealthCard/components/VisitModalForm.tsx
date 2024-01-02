import { Button, Checkbox, DatePicker, Input } from "@/components";
import { errorsDictionary } from "@/helpers/errors-dictionary";
import { cn } from "@/lib";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, Pressable, Text, View } from "react-native";
import { useAddVeterinaryVisitMutation, useGetAnimalHealthCardQuery } from "redux/services/healthCard";
import * as yup from "yup";

const schema = yup.object({
  doctor: yup.string().required(errorsDictionary.required),
  date: yup.date().required(errorsDictionary.required).typeError(errorsDictionary.incorrect_date),
  description: yup.string().required(errorsDictionary.required),
});

type SchemaType = yup.InferType<typeof schema>;

const initialState: SchemaType = {
  doctor: "",
  date: new Date(),
  description: "",
};

type Props = {
  visible: boolean;
  onClose: () => void;
  healthCardId: string;
  animalId: string;
};

const doctors = [
  { label: "Piotr", value: "PIOTR" },
  { label: "Joanna", value: "JOANNA" },
  { label: "Aleksandra", value: "ALEKSANDRA" },
];

export const VisitModalForm = ({ visible, onClose, healthCardId, animalId }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchemaType>({ resolver: yupResolver(schema), defaultValues: initialState });
  const [addVeterinaryVisit, { isLoading }] = useAddVeterinaryVisitMutation();
  const { refetch, isSuccess } = useGetAnimalHealthCardQuery(animalId);

  const onSubmit = async (data: SchemaType) => {
    const formData = new FormData();
    formData.append("doctor", data.doctor);
    formData.append("date", dayjs(data.date).format("YYYY-MM-DD"));
    formData.append("description", data.description);
    formData.append("health_card", healthCardId);

    await addVeterinaryVisit(formData)
      .unwrap()
      .then((res) => {
        refetch()
          .then(() => onClose())
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={visible} transparent={true} animationType="fade">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View
            style={{
              paddingVertical: 18,
              paddingHorizontal: 20,
              backgroundColor: "#1f2937",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: "95%",
              rowGap: 16,
            }}
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-300 text-lg font-semibold">Wizyta weterynaryjna</Text>
              <Pressable onPress={onClose}>
                <MaterialIcons name="close" size={24} color="red" />
              </Pressable>
            </View>
            <View style={{ rowGap: 14 }}>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <View className="space-y-4">
                      <View>
                        <Text
                          className={cn("text-gray-50 font-semibold text-base", {
                            "text-red-500": !!errors.doctor,
                          })}
                        >
                          Lekarz *
                        </Text>
                      </View>
                      <View>
                        {doctors.map((doctor) => (
                          <Checkbox
                            radio={true}
                            key={doctor.value}
                            label={doctor.label}
                            value={doctor.value}
                            onPress={onChange}
                            isChecked={doctor.value === value}
                          />
                        ))}
                      </View>
                    </View>
                  );
                }}
                name="doctor"
              />
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    label="Data wizyty *"
                    value={dayjs(value).format("DD MMMM YYYY")}
                    onConfirm={(date) => {
                      onChange(date);
                    }}
                    error={!!errors.date}
                    errorMessage={errors.date?.message}
                    placeholder="Podaj dzień w którym odbyła się wizyta"
                  />
                )}
                name="date"
              />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    label="Opis wizyty *"
                    multiline={true}
                    numberOfLines={8}
                    maxLength={600}
                    style={{ textAlignVertical: "top" }}
                    error={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                )}
                name="description"
              />
            </View>
            <View>
              <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading && isSuccess}>
                Dodaj
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
