import {
  Account,
  AdoptionAnnouncementForm,
  AdoptionContractForm,
  Allergies,
  AnimalProfile,
  CreateAdopterProfile,
  CreateAnimalProfile,
  Dashboard,
  Medication,
  Vaccinations,
  Visits,
} from "@/screens";
import { EditAnimalProfile } from "@/screens/EditAnimalProfile";
import { Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "auth/authContext";
import { useContext } from "react";
import { Pressable } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { Authorization } from "./navigators/Authorization";
import { ScreenNames } from "./screenNames";
import { HomeScreen } from "./navigators/HomeScreen";

const dayjs = require("dayjs");
require("dayjs/locale/pl");
dayjs.locale("pl");

// Types
type UnauthorizedStackParamList = {
  SignIn: undefined;
  ForgotPassword: undefined;
};

type AuthorizedStackParamList = {
  Tabs: NavigatorScreenParams<DashboardTabsStackParamList>;
  AnimalProfile: { animalData: Animal };
  AdoptionAnnouncementForm: { animalData: Animal };
  AdoptionContractForm: { animalData: Animal };
  EditAnimalProfile: { animalData: Animal };
  HealthCard: NavigatorScreenParams<HealthCardStackParamList>;
  CreateAdopterProfile: undefined;
};

type DashboardTabsStackParamList = {
  Dashboard: undefined;
  AddAnnimalForm: undefined;
  Account: undefined;
};

type HealthCardStackParamList = {
  Allergies: undefined;
  Medication: undefined;
  Vaccinations: undefined;
  Visits: undefined;
};

// Init stacks
const UnauthorizedStack = createStackNavigator<UnauthorizedStackParamList>();
const AuthorizedStack = createStackNavigator<AuthorizedStackParamList>();
const BottomTab = createBottomTabNavigator();

// Global types
export type RootStackProps = NativeStackScreenProps<DashboardTabsStackParamList>;
export type AuthorizedStackProps = NativeStackScreenProps<
  AuthorizedStackParamList,
  | ScreenNames.ANIMAL_PROFILE
  | ScreenNames.ADOPTION_ANNOUNCEMENT_FORM
  | ScreenNames.ADOPTION_CONTRACT_FORM
  | ScreenNames.EDIT_ANIMAL_PROFILE
>;
export type HealthCardStackProps = NativeStackScreenProps<
  HealthCardStackParamList,
  ScreenNames.ALLERGIES | ScreenNames.MEDICATION | ScreenNames.VACCINATIONS | ScreenNames.VISITS
>;

// Karta zdrowia
const HealthCardTabs = () => {
  return (
    <BottomTab.Navigator
      screenOptions={() => ({
        tabBarStyle: { backgroundColor: "#030712" },
        tabBarActiveTintColor: "#f9fafb",
        tabBarInactiveTintColor: "#374151",
        tabBarItemStyle: {
          paddingBottom: 5,
        },
      })}
    >
      <BottomTab.Screen
        name={ScreenNames.ALLERGIES}
        component={Allergies}
        options={{
          tabBarLabel: "Alergie",
          headerShown: false,
          tabBarIcon: ({ size, color }) => {
            return <MaterialCommunityIcons name="allergy" size={size} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name={ScreenNames.MEDICATION}
        component={Medication}
        options={{
          tabBarLabel: "Leki",
          headerShown: false,
          tabBarIcon: ({ size, color }) => {
            return <MaterialCommunityIcons name="pill" size={size} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name={ScreenNames.VACCINATIONS}
        component={Vaccinations}
        options={{
          tabBarLabel: "Szczepienia",
          headerShown: false,
          tabBarIcon: ({ size, color }) => {
            return <Fontisto name="injection-syringe" size={size} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name={ScreenNames.VISITS}
        component={Visits}
        options={{
          tabBarLabel: "Wizyty",
          headerShown: false,
          tabBarIcon: ({ size, color }) => {
            return <Fontisto name="doctor" size={size} color={color} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export const RootNavigation = () => {
  const { state } = useContext(AuthContext);

  return (
    <NavigationContainer theme={DarkTheme}>{state.token ? <HomeScreen /> : <Authorization />}</NavigationContainer>
  );
};
