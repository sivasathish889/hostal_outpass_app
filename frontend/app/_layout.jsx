import { Stack } from "expo-router";
import themes from "@/constants/themes"
import { ToastProvider } from "react-native-toast-notifications";


export default function RootLayout() {
  return (
    <ToastProvider>

      <Stack>
        {/* <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Initial",
          headerStyle: { backgroundColor: themes.lightTheme.mainColor },
          headerTintColor: "white"
        }} /> */}

        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
            title: "Initial",
            headerTintColor: "white"
          }}
        />
        <Stack.Screen
          name="(student)/(register)/studentRegister"
          options={{
            title: "Register",
            headerStyle: { backgroundColor: themes.mainColor },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="(student)/(register)/registerOTP"
          options={{
            title: "Verify OTP",
            headerStyle: { backgroundColor: themes.mainColor },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="(student)/(login)/studentLogin"
          options={{
            title: "Login",
            headerStyle: { backgroundColor: themes.mainColor },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="(student)/(login)/forgetPassword"
          options={{
            title: "Forget Password",
            headerStyle: { backgroundColor: themes.mainColor },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="(student)/(login)/verifyOTP"
          options={{
            title: "Verify otp",
            headerStyle: { backgroundColor: themes.mainColor },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="(student)/(login)/changePassword"
          options={{
            title: "Change Password",
            headerStyle: { backgroundColor: themes.mainColor },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="(student)/(tabs)"
          options={{
            headerShown: false,
            title: "studentHome",
            headerStyle: { backgroundColor: themes.mainColor },

          }}
        />

        <Stack.Screen
          name="(warden)/(login)/wardenLogin"
          options={{
            title: "Warden Login",
            headerStyle: { backgroundColor: themes.mainColor },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="(warden)/(tabs)"
          options={{
            headerShown: false,
            title: "warden home",
            headerStyle: { backgroundColor: themes.mainColor },

          }}
        />

      </Stack>
    </ToastProvider>
  )
}
