import "../global.css";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
} from "@expo-google-fonts/jetbrains-mono";
import {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider, useTheme } from "@/src/theme/ThemeProvider";

const BRANDED_SCREEN_DURATION_MS = 1600;

/**
 * Keep the native splash visible until the app is ready.
 */
SplashScreen.preventAutoHideAsync().catch(() => {
  // Native splash may already be prevented from hiding.
});

function BrandedLoadingScreen({ fontsLoaded }: { fontsLoaded: boolean }) {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Image
        source={require("../assets/splash-icon.png")}
        className="mb-7 h-28 w-28"
        resizeMode="contain"
        accessibilityLabel="Developer Portfolio logo"
      />

      <Text
        className="text-center text-[27px] tracking-[-0.8px] text-gray-900"
        style={fontsLoaded ? { fontFamily: "SpaceGrotesk_700Bold" } : undefined}
      >
        Developer Portfolio
      </Text>

      <Text
        className="mt-2.5 text-center text-[15px] text-gray-500"
        style={fontsLoaded ? { fontFamily: "Inter_500Medium" } : undefined}
      >
        Building ideas into reality.
      </Text>

      <View className="mt-[42px] flex-row items-center gap-2">
        <View className="h-[7px] w-[7px] rounded-full bg-indigo-500" />

        <Text
          className="text-xs text-gray-400"
          style={fontsLoaded ? { fontFamily: "Inter_400Regular" } : undefined}
        >
          Loading your experience
        </Text>
      </View>
    </View>
  );
}

function RootNavigator() {
  const { tokens, loaded } = useTheme();

  const [showBranding, setShowBranding] = useState(true);

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
  });

  const appReady = (fontsLoaded || fontError) && loaded;

  useEffect(() => {
    if (!appReady || !showBranding) return;

    SplashScreen.hideAsync().catch(() => {
      // Ignore if the native splash has already disappeared.
    });

    const timeoutId = setTimeout(() => {
      setShowBranding(false);
    }, BRANDED_SCREEN_DURATION_MS);

    return () => clearTimeout(timeoutId);
  }, [appReady, showBranding]);

  // Keep native splash visible during initialization.
  if (!appReady) return null;

  // Show branded loading screen before opening the app.
  if (showBranding) {
    return <BrandedLoadingScreen fontsLoaded={fontsLoaded} />;
  }

  // Main application navigation.
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: tokens.background },
      }}
    >
      <Stack.Screen name="(tabs)" />

      <Stack.Screen
        name="project/[id]"
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="experience"
        options={{ animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="settings"
        options={{ animation: "slide_from_right" }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
