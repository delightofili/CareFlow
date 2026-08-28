import { Colors } from "@/constants/theme";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CareFlowProvider } from "@/context/CareFlowContext";
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  useRouter,
  useSegments,
} from "expo-router";
import { View } from "lucide-react-native";
import { useEffect } from "react";
import { ActivityIndicator, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function InitialLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup =
      (segments[0] as string) === "login" ||
      (segments[0] as string) === "signup";

    if (!user && !inAuthGroup) {
      router.replace("/login" as any);
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.background,
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="add-task" options={{ presentation: "modal" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CareFlowProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <InitialLayout />
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </ThemeProvider>
        </CareFlowProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
