import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "auth/authContext";
import { useContext } from "react";
import { Authorization } from "./navigators/Authorization";
import { HomeScreen } from "./navigators/HomeScreen";
import { ScreenNames } from "./screenNames";

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
  | ScreenNames.HEALTH_CARD
  | ScreenNames.ADOPTION_CONTRACT_FORM
  | ScreenNames.EDIT_ANIMAL_PROFILE
>;

export const RootNavigation = () => {
  const { state } = useContext(AuthContext);

  return (
    <NavigationContainer theme={DarkTheme}>{state.token ? <HomeScreen /> : <Authorization />}</NavigationContainer>
  );
};
