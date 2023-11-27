import React from "react";
import { View, Text } from "react-native";
import { Button, Container } from "@/components";
import { AuthorizedStackProps } from "@/navigation/appNavigation";

export const EditAnimalProfile = ({ navigation }: AuthorizedStackProps) => {
  const handleBack = () => navigation.goBack();

  return (
    <Container>
      <Button onPress={handleBack}>Cofnij</Button>
      <Text className={"text-gray-50"}>Jakiś tekst</Text>
    </Container>
  );
};
