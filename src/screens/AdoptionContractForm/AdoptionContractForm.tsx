import { Button, Container } from "@/components";
import { ListOfAdopters } from "@/components/Lists";
import { ScreenNames } from "@/navigation/screenNames";
import { AdoptionContractFormStackProps } from "@/navigation/types/NavigationTypes";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useState } from "react";
import { ActivityIndicator, Linking, Pressable, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import {
  useAdoptionContractMutation,
  useGetAdoptersQuery,
  useGetProfilesOfAllAnimalsQuery,
} from "redux/services/animal";

export const AdoptionContractForm = ({ navigation, route }: AdoptionContractFormStackProps) => {
  console.log(route.params.animalData);
  const animal = route.params.animalData;
  const adopter = animal.adopted_by;
  console.log(adopter);
  const toast = useToast();
  const { data: adopters, isLoading } = useGetAdoptersQuery();
  const { refetch: refetchAnimals } = useGetProfilesOfAllAnimalsQuery();
  const [addAdopterDataToAnimalProfile] = useAdoptionContractMutation();
  const [selectedAdopter, setSelectedAdopter] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSelectAdopter = (id: string) => setSelectedAdopter(id);
  const handleOpenFormForCreateAdopterProfile = () => {
    navigation.navigate(ScreenNames.CREATE_ADOPTER_PROFILE);
  };

  const sendAdopterInformationToAnimalProfile = async () => {
    setIsSending(true);
    if (selectedAdopter !== null) {
      let response: Animal;
      await addAdopterDataToAnimalProfile({
        slug: animal.slug,
        body: { adopted_by: selectedAdopter, status: "ZAADOPTOWANY" },
      })
        .unwrap()
        .then((res) => {
          console.log(`response: `, res);
          response = res;
        })
        .catch((err) => {
          console.log(err);
          toast.show("Coś poszło nie tak", { type: "danger", placement: "top" });
        });

      await refetchAnimals().then(() => {
        navigation.navigate("AnimalProfile", { animalData: response });
        toast.show(`Dane adoptującego zostały przypisane do profilu ${animal.name}`, {
          type: "success",
          placement: "top",
        });
      });
    }
    setIsSending(false);
  };

  return (
    <Container>
      {isLoading ? (
        <View className="h-full w-full items-center justify-center">
          <ActivityIndicator size={"large"} color={"#8b5cf6"} />
        </View>
      ) : !!adopter ? (
        <View className="px-2 justify-between h-full py-4">
          <View>
            <View>
              <Text className="text-gray-50 text-xl">{adopter?.name}</Text>
              <Text className="text-gray-50 text-lg">{adopter?.address}</Text>
              <Text className="text-gray-50 text-lg">
                Data adopcji: {dayjs(adopter.updated_at).format("DD MMMM YYYY")}
              </Text>
            </View>
            <View className="justify-center items-center my-6">
              <Pressable>
                <Text className="text-red-500 text-lg font-semibold">Usuń umowe adopcyjną</Text>
              </Pressable>
            </View>
          </View>

          <View>
            <Pressable
              className="justify-center items-center"
              onPress={() => Linking.openURL(`tel:${adopter?.phone_number}`)}
            >
              <View className="bg-green-500 w-16 h-16 items-center justify-center rounded-full">
                <View>
                  <Ionicons name="call" size={24} color="white" />
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      ) : (
        <View className="px-2 justify-between h-full py-4">
          <View style={{ height: "85%" }}>
            <ListOfAdopters adopters={adopters} onSelect={handleSelectAdopter} selectedAdopterId={selectedAdopter} />
          </View>
          <View>
            <View>
              <Button
                onPress={sendAdopterInformationToAnimalProfile}
                disabled={!selectedAdopter || isSending}
                isLoading={isSending}
              >
                {!selectedAdopter ? "Wybierz adoptującego" : "Zatwierdź"}
              </Button>
            </View>
            <View>
              <Text className="text-gray-300 text-base text-center my-2">Osoba adoptująca nie ma jeszcze profilu?</Text>
              <Pressable onPress={handleOpenFormForCreateAdopterProfile}>
                <Text className="text-violet-500 text-center text-lg">Stwórz profil</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </Container>
  );
};
