import { createStackNavigator } from "@react-navigation/stack";
import { AuthorizationStackType } from "../types/NavigationTypes";
import { ScreenNames } from "../screenNames";
import { ForgotPassword, SignIn } from "@/screens";

const Stack = createStackNavigator<AuthorizationStackType>();

export const Authorization = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenNames.SIGN_IN} component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name={ScreenNames.FORGOT_PASSWORD} component={ForgotPassword} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
