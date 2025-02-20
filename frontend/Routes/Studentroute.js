import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudentLoginScreen from "../Screens/StudentScreens/Login/LoginScreen";
import RegsiterScreen from "../Screens/StudentScreens/Register/RegisterScreen";
import OTPScreen from "../Screens/StudentScreens/Login/OTPScreen";
import ForgetPassLoginScreen from "../Screens/StudentScreens/Login/ForgetPassLoginScreen";
import RegisterOTPScreen from "../Screens/StudentScreens/Register/RegisterOTPScreen";
import ResetPasswordScreen from "../Screens/StudentScreens/Login/ResetPasswordScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";
import InitialScreen from "../Screens/InitialScreen";
import WardenLoginScreen from "../Screens/WardenScreens/LoginScreen";
import HomeRoute from "../Screens/StudentScreens/Home/TabRoute";
import WardenHomeRoute from "../Screens/WardenScreens/Home/TabRoute";

const StudentRoute = () => {
  let Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={"/Initial"}>
      {/* Student register screen */}
      <Stack.Screen
        name="/StudentRegister"
        component={RegsiterScreen}
        options={{
          title: "Register",
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
        }}
      />

      {/* student register after otp screen */}
      <Stack.Screen
        name="/StudentRegsiterOTP"
        component={RegisterOTPScreen}
        options={{
          title: "Verify OTP",
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
        }}
      />

      {/* student login screen */}
      <Stack.Screen
        name="/StudentLogin"
        component={StudentLoginScreen}
        options={{
          title: "Login",
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
        }}
      />

      {/* forget password */}
      <Stack.Screen
        name="/StudentLoginForget"
        component={ForgetPassLoginScreen}
        options={{
          title: "Forget Password",
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
        }}
      />

      {/* student forget password otp */}
      <Stack.Screen
        name="/StudentForgetOTP"
        component={OTPScreen}
        options={{
          title: "Forget OTP",
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
        }}
      />

      {/* student change password screen */}
      <Stack.Screen
        name="/StudentResetPassword"
        component={ResetPasswordScreen}
        options={{
          title: "Reset Password",
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="/Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="/Initial"
        component={InitialScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="/"
        component={HomeRoute}
        options={({ route }) => ({
          title: `Welcome`,
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="/WardenLogin"
        component={WardenLoginScreen}
        options={{
          title: "Login",
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="/WardenHome"
        component={WardenHomeRoute}
        options={{
          title: "Welcome",
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
          headerShown: false,

        }}
      />
    </Stack.Navigator>
  );
};

export default StudentRoute;
