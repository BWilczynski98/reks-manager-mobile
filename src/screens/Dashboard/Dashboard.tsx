import { Checkbox, ListOfAnimals, SearchBar, ToggleButton } from "@/components";
import { FontAwesome5, Foundation } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, type BottomSheetModal } from "@gorhom/bottom-sheet";
import filter from "lodash.filter";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, StatusBar, Text, View } from "react-native";
import { Root, useGetAnimalsQuery } from "redux/services/animal";
import { filterAnimalGender, filterAnimalGenre, filterAnimalResidence, filterAnimalStatus } from "./helpers/filters";
import { BottomModal } from "@/components/BottomModal";

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: animals, isSuccess, refetch } = useGetAnimalsQuery();
  const [arrayOfAnimals, setArrayOfAnimals] = useState<Root>(isSuccess ? animals : []);
  const [refreshing, setRefreshing] = React.useState(false);
  const [typeFilter, setTypeFilter] = useState("");

  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  // variables
  const snapPoints = useMemo(() => ["90%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        enableTouchThrough={false}
      />
    ),
    []
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      refetch();
    }, 2000);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // const formattedQuery = query.toLocaleLowerCase();
    const filteredData = filter(animals, (animal) => {
      return contains(animal, query);
    });

    if (query) {
      setArrayOfAnimals(filteredData);
    }
  };

  const contains = (animal: { name: string }, query: string) => {
    if (animal.name.includes(query)) {
      return true;
    }
    return false;
  };

  const [animalTypeFilterValue, setAnimalTypeFilterValue] = useState("");
  const [animalStatusFilterValue, setAnimalStatusFilterValue] = useState<string[]>([]);
  const [animalResidenceFilterValue, setAnimalResidenceFilterValue] = useState<string[]>([]);

  const handleAnimalStatusFilter = (value: string) => {
    let updatedFilters = [...animalStatusFilterValue];
    if (animalStatusFilterValue.includes(value)) {
      updatedFilters = updatedFilters.filter((filter) => filter !== value);
    } else {
      updatedFilters.push(value);
    }

    setAnimalStatusFilterValue(updatedFilters);
  };

  const handleAnimalResidenceFilter = (value: string) => {
    let updatedFilters = [...animalResidenceFilterValue];
    if (animalResidenceFilterValue.includes(value)) {
      updatedFilters = updatedFilters.filter((filter) => filter !== value);
    } else {
      updatedFilters.push(value);
    }

    setAnimalResidenceFilterValue(updatedFilters);
  };

  return (
    <>
      {/* <StatusBar backgroundColor="#1f2937" /> */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        {/* Search bar */}
        <View style={{ marginTop: StatusBar.currentHeight }}>
          <SearchBar searchQuery={handleSearch} openBottomSheet={openBottomSheet} />
        </View>
        {/* List of animals */}

        <View style={{ flex: 1 }}>
          <View className="px-4">
            <Text className="text-gray-50 font-semibold">Liczba profili: {animals?.length}</Text>
          </View>
          <ListOfAnimals
            animals={animals
              ?.filter((animal) => contains(animal, searchQuery))
              .filter((animal) =>
                animalStatusFilterValue.length ? animalStatusFilterValue.includes(animal.status) : animal
              )}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </View>

        {/* Bottom sheet for filters */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backgroundStyle={{ backgroundColor: "#1f2937" }}
          backdropComponent={renderBackdrop}
          handleComponent={() => (
            <View className="self-center my-3">
              <View className="w-7 h-1 rounded-lg bg-gray-500"></View>
            </View>
          )}
        >
          <View style={{ flex: 1 }}>
            <View className="px-5 h-full">
              <View className="space-y-4">
                <Text className="text-gray-50 font-medium text-xl">Typ</Text>
                <View className="flex-row">
                  {filterAnimalGenre.map((genre, i) => (
                    <View key={genre.icon + i} className="pr-2">
                      <ToggleButton
                        value={genre.value}
                        icon={genre.icon}
                        filterValue={animalTypeFilterValue}
                        rippleColor="#a78bfa"
                        onClick={setAnimalTypeFilterValue}
                        marked={animalTypeFilterValue === genre.value}
                      >
                        <FontAwesome5 size={24} color="white" name={genre.icon} />
                      </ToggleButton>
                    </View>
                  ))}
                </View>
              </View>
              <View className="space-y-4">
                <Text className="text-gray-50 font-semibold text-xl">Płeć</Text>
                <View className="flex-row">
                  {filterAnimalGender.map((genre, i) => (
                    <View key={genre.icon + i} className="pr-2">
                      <ToggleButton
                        value={genre.value}
                        icon={genre.icon}
                        filterValue={animalTypeFilterValue}
                        rippleColor="#a78bfa"
                        onClick={setAnimalTypeFilterValue}
                        marked={animalTypeFilterValue === genre.value}
                      >
                        <Foundation name={genre.icon} size={30} color="white" />
                      </ToggleButton>
                    </View>
                  ))}
                </View>
              </View>
              <View className="space-y-4">
                <View>
                  <Text className="text-gray-50 font-semibold text-xl">Status</Text>
                </View>
                <View style={{ rowGap: 8 }}>
                  {filterAnimalStatus.map((status, i) => {
                    const isChecked = animalStatusFilterValue.includes(status.value);
                    return (
                      <Checkbox
                        key={status.label + i}
                        value={status.value}
                        label={status.label}
                        onPress={handleAnimalStatusFilter}
                        isChecked={isChecked}
                      />
                    );
                  })}
                </View>
              </View>
              <View className="space-y-4">
                <View>
                  <Text className="text-gray-50 font-semibold text-xl">Gdzie przebywa</Text>
                </View>
                <View style={{ rowGap: 8 }}>
                  {filterAnimalResidence.map((residence, i) => {
                    const isChecked = animalResidenceFilterValue.includes(residence.value);
                    return (
                      <Checkbox
                        key={residence.label + i}
                        value={residence.value}
                        label={residence.label}
                        onPress={handleAnimalResidenceFilter}
                        isChecked={isChecked}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </BottomSheet>
        <BottomModal ref={bottomSheetRef} />
      </KeyboardAvoidingView>
    </>
  );
};
