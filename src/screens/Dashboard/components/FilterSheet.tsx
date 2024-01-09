import { Button, Checkbox } from "@/components";
import Sheet from "@/components/Sheet/Sheet";
import { BottomSheetFooter, BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import React, { ReactNode, forwardRef, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  filterAnimalGender,
  filterAnimalLocation,
  filterAnimalStatus,
  filterAnimalType,
  type FilterState,
} from "../helpers/filters";

type Props = {
  handleFilter: (filterCriteria: string, filterType: keyof FilterState) => void;
  typeFilter: string[];
  genderFilter: string[];
  locationFilter: string[];
  statusFilter: string[];
  onReset: () => void;
};

type HeaderProps = {
  children: ReactNode;
};

type Ref = BottomSheetModal;

const Header = ({ children }: HeaderProps) => {
  return <Text className="text-gray-50 font-semibold text-lg">{children}</Text>;
};

export const FilterSheet = forwardRef<Ref, Props>((props, ref) => {
  const { handleFilter, typeFilter, genderFilter, locationFilter, statusFilter, onReset } = props;
  const { dismiss } = useBottomSheetModal();

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View style={styles.footerContainer}>
          <Button onPress={() => dismiss("filter-bottom-sheet")}>Pokaż wynik</Button>
          <TouchableOpacity onPress={onReset} activeOpacity={0.75}>
            <Text className="text-center text-red-500 text-lg">Wyzeruj</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <Sheet
      ref={ref}
      title="Filtry"
      snapPoints={["90%"]}
      enablePanDownToClose={true}
      backdrop={true}
      name="filter-bottom-sheet"
      footer={renderFooter}
    >
      <View style={styles.container}>
        <View style={styles.criterionContainer}>
          <Header>Typ</Header>
          <View>
            {filterAnimalType.map((type, i) => {
              const isChecked = typeFilter.includes(type.value);
              return (
                <Checkbox
                  key={type.value + i}
                  value={type.value}
                  label={type.label}
                  onPress={() => handleFilter(type.value, "typeFilters")}
                  isChecked={isChecked}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.criterionContainer}>
          <Header>Płeć</Header>
          <View>
            {filterAnimalGender.map((gender, i) => {
              const isChecked = genderFilter.includes(gender.value);
              return (
                <Checkbox
                  key={gender.value + i}
                  value={gender.value}
                  label={gender.label}
                  onPress={() => handleFilter(gender.value, "genderFilters")}
                  isChecked={isChecked}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.criterionContainer}>
          <Header>Lokalizacja</Header>
          <View>
            {filterAnimalLocation.map((location, i) => {
              const isChecked = locationFilter.includes(location.value);
              return (
                <Checkbox
                  key={location.value + i}
                  value={location.value}
                  label={location.label}
                  onPress={() => handleFilter(location.value, "locationFilters")}
                  isChecked={isChecked}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.criterionContainer}>
          <Header>Status</Header>
          <View>
            {filterAnimalStatus.map((status, i) => {
              const isChecked = statusFilter.includes(status.value);
              return (
                <Checkbox
                  key={status.value + i}
                  value={status.value}
                  label={status.label}
                  onPress={() => handleFilter(status.value, "statusFilters")}
                  isChecked={isChecked}
                />
              );
            })}
          </View>
        </View>
      </View>
    </Sheet>
  );
});

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
  },
  criterionContainer: {
    rowGap: 8,
  },
  footerContainer: {
    rowGap: 10,
  },
});
