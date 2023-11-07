import { AppNavigation } from "@/navigation";

import { StatusBar } from "expo-status-bar";
import { ReduxProvider } from "redux/provider";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ReduxProvider>
        <AppNavigation />
      </ReduxProvider>
    </>
  );
}
