import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { AdopterTile } from "@/components/Tiles";

type ListOfAdoptersPropsType = {
  adopters: Adopter[] | undefined;
  onSelect: (id: string) => void;
  selectedAdopterId: string | null;
};

export const ListOfAdopters = ({ adopters, onSelect, selectedAdopterId }: ListOfAdoptersPropsType) => {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text className="text-gray-300 text-lg font-semibold">Wybierz adoptującego:</Text>
      </View>
      <FlatList
        data={adopters}
        renderItem={({ item }) => (
          <AdopterTile adopter={item} onSelect={onSelect} isChecked={selectedAdopterId === item.id} />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
};
