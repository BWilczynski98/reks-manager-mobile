import {
  Account,
  AdoptionAnnouncementForm,
  Allergies,
  AnimalProfile,
  CreateProfile,
  Dashboard,
  ForgotPassword,
  Medication,
  SignIn,
  Vaccinations,
  Visits,
} from "@/screens";
import { EditAnimalProfile } from "@/screens/EditAnimalProfile";
import { Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { Pressable } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ScreenNames } from "./screenNames";
import { AuthContext } from "auth/authContext";

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
  EditAnimalProfile: { animalData: Animal };
  HealthCard: NavigatorScreenParams<HealthCardStackParamList>;
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
export type UnauthorizedStackProps = NativeStackScreenProps<UnauthorizedStackParamList>;
export type RootStackProps = NativeStackScreenProps<DashboardTabsStackParamList>;
export type AuthorizedStackProps = NativeStackScreenProps<
  AuthorizedStackParamList,
  "AnimalProfile" | "AdoptionAnnouncementForm" | "EditAnimalProfile"
>;
export type HealthCardStackProps = NativeStackScreenProps<
  HealthCardStackParamList,
  ScreenNames.ALLERGIES | ScreenNames.MEDICATION | ScreenNames.VACCINATIONS | ScreenNames.VISITS
>;

const Unauthorized = () => {
  return (
    <UnauthorizedStack.Navigator>
      <UnauthorizedStack.Screen name={ScreenNames.SIGN_IN} component={SignIn} options={{ headerShown: false }} />
      <UnauthorizedStack.Screen
        name={ScreenNames.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </UnauthorizedStack.Navigator>
  );
};

const Tabs = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { signOut } = useContext(AuthContext);

  const handleLogoutUser = () => {
    // dispatch(logout());
    signOut();
    toast.show("Pomyślne wylogowano z aplikacji", {
      type: "success",
      placement: "top",
    });
  };

  return (
    <BottomTab.Navigator
      screenOptions={() => ({
        tabBarStyle: { backgroundColor: "#030712" },
        tabBarActiveTintColor: "#f9fafb",
        tabBarInactiveTintColor: "#374151",
      })}
    >
      <BottomTab.Screen
        name={ScreenNames.DASHBOARD}
        component={Dashboard}
        options={{
          tabBarLabel: "Podopieczni",
          headerShown: false,
          tabBarIcon: ({ size, color }) => {
            return <MaterialIcons name="pets" size={size} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name={ScreenNames.ADD_ANIMAL_FORM}
        component={CreateProfile}
        options={{
          tabBarLabel: "Stwórz profil",
          headerShown: false,
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name="add-circle" size={size} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name={ScreenNames.ACCOUNT}
        component={Account}
        options={{
          tabBarLabel: "Konto",
          title: "Ustawienia konta",
          headerStyle: { backgroundColor: "#1f2937" },
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name="person" size={size} color={color} />;
          },
          headerRight: () => (
            <Pressable style={{ paddingRight: 24, flexDirection: "row" }} onPress={handleLogoutUser}>
              <MaterialIcons name="logout" size={24} color={"#f9fafb"} />
            </Pressable>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

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

const Authorized = () => {
  return (
    <AuthorizedStack.Navigator>
      <AuthorizedStack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <AuthorizedStack.Screen
        name={ScreenNames.ANIMAL_PROFILE}
        component={AnimalProfile}
        options={{ headerShown: false }}
      />
      <AuthorizedStack.Screen
        name={ScreenNames.ADOPTION_ANNOUNCEMENT_FORM}
        component={AdoptionAnnouncementForm}
        options={{
          title: "Stwórz ogłoszenie",
          presentation: "modal",
          headerStyle: { backgroundColor: "#1f2937" },
        }}
      />
      <AuthorizedStack.Screen
        name={ScreenNames.EDIT_ANIMAL_PROFILE}
        component={EditAnimalProfile}
        options={{ title: "Edytuj profil", presentation: "modal", headerStyle: { backgroundColor: "#1f2937" } }}
      />
      <AuthorizedStack.Screen
        name={ScreenNames.HEALTH_CARD}
        component={HealthCardTabs}
        options={{ title: "Karta zdrowia", presentation: "modal", headerStyle: { backgroundColor: "#1f2937" } }}
      />
    </AuthorizedStack.Navigator>
  );
};

export const AppNavigation = () => {
  const { state } = useContext(AuthContext);

  return <NavigationContainer theme={DarkTheme}>{state.token ? <Authorized /> : <Unauthorized />}</NavigationContainer>;
};
