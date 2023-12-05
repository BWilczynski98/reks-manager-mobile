import { Accordion, Button, Checkbox, Input } from "@/components";
import { errorsDictionary } from "@/helpers/errors-dictionary";
import { cn } from "@/lib";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, View } from "react-native";
import * as yup from "yup";

type AllergieModalFormProps = {
  modalIsVisible: boolean;
  closeModal: () => void;
};

const AllergieModalForm = ({ modalIsVisible, closeModal }: AllergieModalFormProps) => {
  const allergyFormSchema = yup.object({
    category: yup.string().required(errorsDictionary.required),
    name: yup.string().required(errorsDictionary.required),
    description: yup.string().required(errorsDictionary.required),
  });

  type AllergieFormData = yup.InferType<typeof allergyFormSchema>;

  const categories = ["Pokarmowa", "Kontaktowa", "Wziewna"];
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AllergieFormData>({
    resolver: yupResolver(allergyFormSchema),
    defaultValues: { category: "", name: "", description: "" },
  });

  const onSubmit = async (data: AllergieFormData) => {
    console.log(data);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Modal
        visible={modalIsVisible}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
        style={{ flex: 1 }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} scrollEnabled>
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
                <View style={{ rowGap: 14 }}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <View className="space-y-4">
                          <View>
                            <Text
                              className={cn("text-base text-gray-50 font-semibold", {
                                "text-red-500": !!errors.category,
                              })}
                            >
                              Rodzaj *
                            </Text>
                          </View>
                          <View>
                            {categories.map((category, i) => (
                              <Checkbox
                                radio={true}
                                key={category + i}
                                label={category}
                                value={category}
                                onPress={onChange}
                                isChecked={category === value}
                              />
                            ))}
                          </View>
                        </View>
                      );
                    }}
                    name="category"
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Alergen *"
                        placeholder="Mięso z kurczaka"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCorrect={false}
                        error={!!errors.name}
                        errorMessage={errors.name?.message}
                      />
                    )}
                    name="name"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => {
                      return (
                        <Input
                          label="Objawy *"
                          placeholder="Opisz czym objawia się alergia Np. Zaczerwienienie, swędzenie, biegunka itp..."
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          error={!!errors.description}
                          errorMessage={errors.description?.message}
                          multiline={true}
                          numberOfLines={8}
                          style={{ textAlignVertical: "top" }}
                        />
                      );
                    }}
                    name="description"
                  />
                </View>
                <View>
                  <Button onPress={handleSubmit(onSubmit)}>Zapisz</Button>
                  <Button onPress={closeModal} variant="outline">
                    Anuluj
                  </Button>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

const AllergieTile = ({ allergy }: { allergy: { category: string; name: string; description: string } }) => {
  return (
    <View className="p-4 bg-gray-700 rounded-lg space-y-4">
      <View className="space-y-1">
        <View>
          <Text className="text-gray-400 text-lg font-medium">Rodzaj</Text>
        </View>
        <View>
          <Text className="text-gray-50 text-lg ">{allergy.category}</Text>
        </View>
      </View>
      <View className="space-y-1">
        <View>
          <Text className="text-gray-400 text-lg font-medium">Alergen</Text>
        </View>
        <View>
          <Text className="text-gray-50 text-lg">{allergy.name}</Text>
        </View>
      </View>
      <View className="space-y-1">
        <View>
          <Text className="text-gray-400 text-lg font-medium">Objawy</Text>
        </View>
        <View>
          <Text className="text-gray-50 text-lg">{allergy.description}</Text>
        </View>
      </View>
    </View>
  );
};

export const HealthCard = () => {
  const dummy_allergies = [
    { category: "Pokarm", name: "Kurczak", description: "Objawia się biegunką i wymiotami" },
    {
      category: "Kontaktowa",
      name: "Trawa",
      description: "Uczulony na kwitnące trawy, objawia się zaczerwienieniem w okolicach oczu i poduszek łap",
    },
    {
      category: "Wziewna",
      name: "Roztocza",
      description: "Uczulony na kwitnące trawy, objawia się zaczerwienieniem w okolicach oczu i poduszek łap",
    },
    {
      category: "Pokarm",
      name: "Ryba",
      description: "Uczulony na kwitnące trawy, objawia się zaczerwienieniem w okolicach oczu i poduszek łap",
    },
  ];

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const handleOpenModal = () => setModalIsVisible(true);
  const handleCloseModal = () => setModalIsVisible(false);

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 8 }}>
      <AllergieModalForm modalIsVisible={modalIsVisible} closeModal={handleCloseModal} />
      <View>
        <Accordion title="Alergie">
          <View>
            <View>
              {dummy_allergies.map((item, i) => (
                <View key={i} className="my-2">
                  <AllergieTile allergy={item} />
                </View>
              ))}
            </View>
            <View className="items-center">
              <View className="w-1/2">
                <Button onPress={handleOpenModal}>
                  {/* <Ionicons name="add" size={24} color="white" /> */}
                  <Text className="text-gray-50">Dodaj alergie</Text>
                </Button>
              </View>
            </View>
          </View>
        </Accordion>
        <Accordion title="Leki">
          {/* <ScrollView style={{ flex: 1, height: 500 }}> */}
          <Text className="text-gray-200 text-lg text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, quaerat assumenda, beatae error ipsam
            corrupti, magnam molestias repellat quidem eaque facere ullam iure odio expedita autem dolor tenetur. Nemo
            quas ipsam quia odio repudiandae voluptas tenetur recusandae, minima obcaecati, nihil at, sit ipsa modi
            totam hic! In maxime dolorum illum, sunt voluptatibus, esse omnis libero sit unde nostrum id consequatur
            natus dolore non asperiores inventore autem molestiae consectetur cumque dignissimos vero quisquam
            laboriosam nemo quod. In, recusandae esse ratione molestias non deleniti ipsum vitae nihil magni, alias sit
            et explicabo? Unde quod consequatur ab iste enim minus, error, nulla cum nemo asperiores, sapiente atque
            vero? Officia, eveniet esse. Quisquam quae magnam necessitatibus mollitia non fugiat earum voluptatem rem
            laudantium nulla. Alias numquam magni tempore incidunt nostrum dolorem ducimus rem praesentium, ex aut, enim
            saepe quod commodi molestias, atque inventore quidem sed placeat aperiam consequuntur voluptatibus maxime
            laboriosam molestiae! Similique blanditiis iusto, deserunt doloribus ipsam, modi debitis saepe ducimus eos
            quam illum facere unde voluptas repellendus praesentium, molestiae aliquid ullam eveniet. Dolorum ad, ab
            incidunt numquam cum deleniti corrupti quas similique aliquid ut totam illo maxime eos. Laborum officiis
            atque porro ducimus animi. Quasi libero architecto soluta? Iste culpa sunt architecto deserunt aperiam quas
            perspiciatis voluptatem doloremque saepe at placeat cupiditate dolorum fugit sapiente veritatis ipsam cum,
            porro, sit, dolore ex voluptate explicabo magnam et inventore. Beatae iure veniam ex assumenda harum minus
            quae voluptate fugiat velit, dolorem labore autem, reprehenderit a mollitia saepe ullam libero quasi dolores
            dolore aspernatur. Omnis reiciendis ipsum, minima distinctio laborum vel quam aliquam nam eligendi quis
            voluptate unde fuga rerum voluptates vitae veritatis natus nisi repudiandae? Quis quisquam recusandae
            nostrum quidem temporibus, repellat necessitatibus, atque dolorem accusantium nobis dolore reprehenderit
            adipisci! Corrupti officiis eius dignissimos deleniti veritatis rem sit, exercitationem, unde aut provident
            magni molestiae?
          </Text>
          {/* </ScrollView> */}
        </Accordion>
      </View>
    </ScrollView>
  );
};
