import { ListOfAnimals, SearchBar } from "@/components";
import { type BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useReducer, useRef, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, StatusBar, View } from "react-native";
import { useGetAnimalsQuery } from "redux/services/animal";
import { FilterSheet } from "./components/FilterSheet";
import { FocusAwareStatusBar } from "./components/FocusAwareStatusBar";
import { type FilterState } from "./helpers/filters";

export const Dashboard = () => {
  const { data: animals, refetch, isLoading } = useGetAnimalsQuery();

  // Bottom sheet properties
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenSheet = () => bottomSheetRef.current?.present();

  // Refresh data on demand
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      refetch();
    }, 2000);
  }, []);

  // Filtering data
  type FilterAction = { type: keyof FilterState; payload: string[] } | { type: "RESET" };

  const initialState: FilterState = {
    typeFilters: [],
    genderFilters: [],
    locationFilters: [],
    statusFilters: [],
  };

  const filtersReducer = (state: FilterState, action: FilterAction): FilterState => {
    switch (action.type) {
      case "typeFilters":
      case "genderFilters":
      case "locationFilters":
      case "statusFilters":
        return { ...state, [action.type]: action.payload };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  };

  const [filtersState, dispatch] = useReducer(filtersReducer, initialState);
  const [searchQuery, setSearchQuery] = useState("");

  const clearFilter = () => dispatch({ type: "RESET" });

  const handleFilter = (filterCriteria: string, filterType: keyof FilterState) => {
    const updateFilters = [...filtersState[filterType]];
    const newFilters = filtersState[filterType].includes(filterCriteria)
      ? updateFilters.filter((filter) => filter !== filterCriteria)
      : [...updateFilters, filterCriteria];

    dispatch({ type: filterType, payload: newFilters });
  };

  const searchedAnimals = useMemo(() => {
    const contains = (animal: { name: string }, query: string) => {
      if (animal.name.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }
      return false;
    };

    if (searchQuery) {
      return animals?.filter((animal) => {
        return contains(animal, searchQuery);
      });
    }

    return animals;
  }, [searchQuery, animals]);

  const filteredAnimals = useMemo(() => {
    return searchedAnimals
      ?.filter((animal) => {
        return (
          (filtersState.typeFilters.length === 0 || filtersState.typeFilters.includes(animal.animal_type)) &&
          (filtersState.genderFilters.length === 0 || filtersState.genderFilters.includes(animal.gender)) &&
          (filtersState.locationFilters.length === 0 || filtersState.locationFilters.includes(animal.residence)) &&
          (filtersState.statusFilters.length === 0 || filtersState.statusFilters.includes(animal.status))
        );
      })
      .sort((a, b) => {
        const formatToUnixTimestamp = (dateToFormat: string): number => {
          const date = new Date(dateToFormat);
          const unixTimestamp = date.getTime() / 1000;
          return unixTimestamp;
        };
        // Sort by date from newest to oldest
        return formatToUnixTimestamp(b.created_at) - formatToUnixTimestamp(a.created_at);
      });
  }, [searchQuery, animals, filtersState]);
  //

  return (
    <>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1f2937" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        {/* Search bar */}
        <View style={{ marginTop: StatusBar.currentHeight }}>
          <SearchBar searchQuery={setSearchQuery} openBottomSheet={handleOpenSheet} />
        </View>

        {/* List of animals */}
        <View style={{ flex: 1, backgroundColor: "#030712" }}>
          {isLoading ? (
            <View className="h-full w-full items-center justify-center">
              <ActivityIndicator size={"large"} color={"#8b5cf6"} />
            </View>
          ) : (
            <ListOfAnimals animals={filteredAnimals} refreshing={refreshing} onRefresh={onRefresh} />
          )}
        </View>

        {/* Bottom sheet with filters */}
        <FilterSheet
          ref={bottomSheetRef}
          typeFilter={filtersState.typeFilters}
          genderFilter={filtersState.genderFilters}
          locationFilter={filtersState.locationFilters}
          statusFilter={filtersState.statusFilters}
          handleFilter={handleFilter}
          onReset={clearFilter}
        />
      </KeyboardAvoidingView>
    </>
  );
};
