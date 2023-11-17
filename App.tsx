import { AppNavigation } from "@/navigation";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ReduxProvider } from "redux/provider";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ReduxProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <AppNavigation />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ReduxProvider>
    </>
  );
}
