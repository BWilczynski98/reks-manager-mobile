import { Dashboard, SignIn } from "@/screens";
import { SplashScreen } from "@/screens/SplashScreen/SplashScreen";

import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAppSelector } from "redux/hooks";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export const AppNavigation = () => {
  const isAuth = useAppSelector((state) => state.userReducer.token);
  return <NavigationContainer theme={DarkTheme}>{isAuth ? <AppStack /> : <AuthStack />}</NavigationContainer>;
};
