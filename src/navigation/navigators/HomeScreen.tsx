import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreenBottomTab } from "./HomeScreenBottomTab";
import { ScreenNames } from "../screenNames";
import {
  AdoptionAnnouncementForm,
  AdoptionContractForm,
  AnimalProfile,
  CreateAdopterProfile,
  EditAnimalProfile,
} from "@/screens";
import { HomeScreenStackType } from "../types/NavigationTypes";

const Stack = createStackNavigator<HomeScreenStackType>();

export const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreenBottomTab" component={HomeScreenBottomTab} options={{ headerShown: false }} />
      <Stack.Screen name={ScreenNames.ANIMAL_PROFILE} component={AnimalProfile} options={{ headerShown: false }} />
      <Stack.Screen
        name={ScreenNames.ADOPTION_ANNOUNCEMENT_FORM}
        component={AdoptionAnnouncementForm}
        options={{
          title: "Ogłoszenie adopcyjne",
          presentation: "modal",
          headerStyle: { backgroundColor: "#1f2937" },
        }}
      />
      <Stack.Screen
        name={ScreenNames.ADOPTION_CONTRACT_FORM}
        component={AdoptionContractForm}
        options={{
          title: "Uzupełnij dane adoptującego",
          presentation: "modal",
          headerStyle: { backgroundColor: "#1f2937" },
        }}
      />
      <Stack.Screen
        name={ScreenNames.EDIT_ANIMAL_PROFILE}
        component={EditAnimalProfile}
        options={{ title: "Edytuj profil", presentation: "modal", headerStyle: { backgroundColor: "#1f2937" } }}
      />
      <Stack.Screen
        name={ScreenNames.CREATE_ADOPTER_PROFILE}
        component={CreateAdopterProfile}
        options={{ title: "Stwórz profil adoptującego", headerStyle: { backgroundColor: "#1f2937" } }}
      />
    </Stack.Navigator>
  );
};
