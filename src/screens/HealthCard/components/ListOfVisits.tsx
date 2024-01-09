import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { VisitModalForm } from "./VisitModalForm";

type VisitTileProps = {
  visit: VeterinaryVisit;
};

type Props = {
  visits: VeterinaryVisit[] | undefined | null;
  healthCardId: string;
  animalId: string;
};

const VisitTile = ({ visit }: VisitTileProps) => {
  return (
    <View className="bg-gray-800 px-6 py-4 rounded-lg">
      <View className="space-y-4">
        <Text className="text-gray-300 text-lg">
          {visit.doctor} |{" "}
          <Text className="text-gray-50 font-semibold">{dayjs(visit.date).format("DD MMMM YYYY")}</Text>
        </Text>
        <Text className="text-gray-300 text-lg">
          Opis: <Text className="text-gray-50">{visit.description}</Text>
        </Text>
      </View>
    </View>
  );
};

export const ListOfVisits = ({ visits, healthCardId, animalId }: Props) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const handleOpenModal = () => setModalIsVisible(true);
  const handleCloseModal = () => setModalIsVisible(false);

  return (
    <View style={{ height: "100%", justifyContent: "flex-start" }}>
      <VisitModalForm
        visible={modalIsVisible}
        onClose={handleCloseModal}
        healthCardId={healthCardId}
        animalId={animalId}
      />
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-gray-300 text-xl font-semibold">Wizyty weterynaryjne</Text>
        <Pressable onPress={handleOpenModal}>
          <MaterialIcons name="add" size={24} color="#d1d5db" />
        </Pressable>
      </View>
      {visits?.length ? (
        <FlatList
          data={visits}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => <VisitTile visit={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          style={{ height: "100%" }}
        />
      ) : (
        <View className="py-2 h-full">
          <Text className="text-gray-400 text-lg text-center">
            Obecnie ten profil nie posiada żadnych zapisanych wizyt. Kliknij w przycisk "plus", aby dodać wizytę.
          </Text>
        </View>
      )}
    </View>
  );
};
