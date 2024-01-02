import { Container } from "@/components";
import { HealthCardStackProps } from "@/navigation/types/NavigationTypes";
import React, { useMemo } from "react";
import { ActivityIndicator, View } from "react-native";
import { useGetAnimalHealthCardQuery } from "redux/services/healthCard";
import { ListOfVisits } from "./components/ListOfVisits";

export const HealthCard = ({ route }: HealthCardStackProps) => {
  const id = route.params.id;
  const { data: healthCard, isLoading } = useGetAnimalHealthCardQuery(id);
  const veterinaryVisits = healthCard?.veterinary_visits;

  return (
    <Container>
      <View className="px-2">
        {isLoading ? (
          <View className="h-full w-full items-center justify-center">
            <ActivityIndicator size={"large"} color={"#8b5cf6"} />
          </View>
        ) : (
          <ListOfVisits visits={veterinaryVisits} healthCardId={healthCard ? healthCard.id : ""} animalId={id} />
        )}
      </View>
    </Container>
  );
};
