import { AppNavigation } from "@/navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { StatusBar as NativeStatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import { ReduxProvider } from "redux/provider";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ReduxProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <ToastProvider offsetTop={NativeStatusBar.currentHeight}>
              <AppNavigation />
            </ToastProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ReduxProvider>
    </>
  );
}
