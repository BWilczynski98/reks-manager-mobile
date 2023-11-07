import { Dashboard, ForgotPassword, SignIn } from "@/screens";

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

export type StackProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
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
