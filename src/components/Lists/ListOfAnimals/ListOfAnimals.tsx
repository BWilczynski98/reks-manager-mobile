import { View, Text, FlatList, SafeAreaView, RefreshControl } from "react-native";
import React from "react";
import { AnimalTile } from "@/components/Tiles";
import { Root, useGetAnimalsQuery } from "redux/services/animal";

type ListOfAnimalsType = {
  animals: Root | undefined;
  refreshing: boolean;
  onRefresh: () => void;
};

export const ListOfAnimals = ({ animals, refreshing, onRefresh }: ListOfAnimalsType) => {
  return (
    <View style={{ height: "100%" }}>
      {/* <Text className="text-gray-50">ListOfAnimals</Text> */}
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
        // columnWrapperStyle={{ columnGap: 2, justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};
