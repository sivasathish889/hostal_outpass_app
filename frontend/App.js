import { NavigationContainer } from "@react-navigation/native";
import StudentRoute from "./Routes/Studentroute";
import { ToastProvider } from "react-native-toast-notifications";

const App = () => {
  return (
    <ToastProvider>
      <NavigationContainer>
        <StudentRoute />
      </NavigationContainer>
    </ToastProvider>
  );
};

export default App;
