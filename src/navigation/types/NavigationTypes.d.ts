import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";
import { ScreenNames } from "../screenNames";

export type AuthorizationStackType = {
  SignIn: undefined;
  ForgotPassword: undefined;
};

export type HomeScreenBottomTabType = {
  Dashboard: undefined;
  CreateAnimalProfile: undefined;
  Account: undefined;
};

export type HomeScreenStackType = {
  CreateAdopterProfile: undefined;
  HomeScreenBottomTab: BottomTabScreenProps<HomeScreenBottomTabType>;
  AnimalProfile: { animalData: Animal };
  AdoptionAnnouncementForm: { animalData: Animal };
  AdoptionContractForm: { animalData: Animal };
  EditAnimalProfile: { animalData: Animal };
};

/* STACK */

// Types for the roots of the screens
export type AuthorizationStackProps = NativeStackScreenProps<AuthorizationStackType>;
export type HomeScreenStackProps = NativeStackScreenProps<HomeScreenStackType>;

// Types for sub screens
export type AnimalProfileStackProps = NativeStackScreenProps<HomeScreenStackType, ScreenNames.ANIMAL_PROFILE>;
export type AdoptionAnnouncementFormStackProps = NativeStackScreenProps<
  HomeScreenStackType,
  ScreenNames.ADOPTION_ANNOUNCEMENT_FORM
>;
export type AdoptionContractFormStackProps = NativeStackScreenProps<
  HomeScreenStackType,
  ScreenNames.ADOPTION_CONTRACT_FORM
>;

/* BOTTOM TAB */

// Types for the bottom tab of the home screen
export type HomeScreenBottomTabProps = NativeStackScreenProps<HomeScreenBottomTabType>;
