import { Dashboard, ForgotPassword, SignIn } from "@/screens";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppSelector } from "redux/hooks";

type RootStackParamList = {
  SignIn: undefined;
  ForgotPassword: undefined;
  Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export type StackProps = NativeStackScreenProps<RootStackParamList, "SignIn" | "ForgotPassword">;

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <BottomTab.Navigator
      screenOptions={() => ({
        tabBarStyle: { backgroundColor: "#030712" },
        tabBarActiveTintColor: "#f9fafb",
        tabBarInactiveTintColor: "#374151",
      })}
    >
      <BottomTab.Screen
        name="Dashboard"
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
        name="NewPetForm"
        component={Dashboard}
        options={{
          tabBarLabel: "Stwórz profil",
          headerShown: false,
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name="add-circle" size={size} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Settings"
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

export const AppNavigation = () => {
  const isAuth = useAppSelector((state) => state.userReducer.token);
  return <NavigationContainer theme={DarkTheme}>{isAuth ? <AppStack /> : <AuthStack />}</NavigationContainer>;
};
