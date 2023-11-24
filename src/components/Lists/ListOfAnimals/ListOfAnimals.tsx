import { AnimalTile } from "@/components/Tiles";
import React from "react";
import { FlatList, RefreshControl, View } from "react-native";

type ListOfAnimalsType = {
  animals: Animals | undefined;
  refreshing: boolean;
  onRefresh: () => void;
};

export const ListOfAnimals = ({ animals, refreshing, onRefresh }: ListOfAnimalsType) => {
  return (
    <View style={{ height: "100%" }}>
      <FlatList
        data={animals}
        renderItem={({ item }) => (
          <AnimalTile
            name={item.name}
            type={item.animal_type}
            gender={item.gender}
            status={item.status}
            image={item.image}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};
