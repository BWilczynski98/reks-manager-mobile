import { AnimalProfile, CreateProfile, Dashboard, ForgotPassword, SignIn } from "@/screens";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppSelector } from "redux/hooks";
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
  Tabs: undefined;
  AnimalProfile: { animalData: Animal };
};

// Init stacks
const UnauthorizedStack = createStackNavigator<UnauthorizedStackParamList>();
const AuthorizedStack = createStackNavigator<AuthorizedStackParamList>();
const BottomTab = createBottomTabNavigator();

// Global types
export type UnauthorizedStackProps = NativeStackScreenProps<UnauthorizedStackParamList>;
export type AuthorizedStackProps = NativeStackScreenProps<AuthorizedStackParamList, "AnimalProfile">;

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
        name={ScreenNames.SETTINGS}
        component={Dashboard}
        options={{
          tabBarLabel: "Ustawienia",
          headerShown: false,
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name="settings" size={size} color={color} />;
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
    </AuthorizedStack.Navigator>
  );
};

export const AppNavigation = () => {
  const isAuth = useAppSelector((state) => state.userReducer.token);
  return <NavigationContainer theme={DarkTheme}>{isAuth ? <Authorized /> : <Unauthorized />}</NavigationContainer>;
};
