import { Account, CreateAnimalProfile, Dashboard } from "@/screens";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "auth/authContext";
import { useContext } from "react";
import { Pressable } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { ScreenNames } from "../screenNames";
import { HomeScreenBottomTabType } from "../types/NavigationTypes";

const BottomTab = createBottomTabNavigator<HomeScreenBottomTabType>();

export const HomeScreenBottomTab = () => {
  const toast = useToast();
  const { signOut } = useContext(AuthContext);

  // Logout from account
  const handleLogoutUser = () => {
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
        component={CreateAnimalProfile}
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
