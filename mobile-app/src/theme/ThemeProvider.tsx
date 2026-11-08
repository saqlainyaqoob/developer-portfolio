import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { View } from "react-native";
import { palette, schemeClass, tokensFor, type ThemeTokens } from "./tokens";
import type { Scheme, ThemePreference } from "@/src/types";

const STORAGE_KEY = "portfolio.theme-preference";

export interface ThemeContextValue {
  preference: ThemePreference;
  scheme: Scheme;
  tokens: ThemeTokens;
  setPreference: (preference: ThemePreference) => void;
  /** True once the persisted preference has been restored from storage */
  loaded: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme: systemScheme } = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>("dark");
  const [loaded, setLoaded] = useState(false);

  // Restore persisted preference
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === "light" || saved === "dark" || saved === "system") {
          setPreferenceState(saved);
        }
      })
      .catch(() => {
        // Storage unavailable — keep default preference
      })
      .finally(() => setLoaded(true));
  }, []);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {
      // Persist failures are non-fatal — the choice applies for this session
    });
  }, []);

  const scheme: Scheme =
    preference === "system" ? (systemScheme ?? "light") : preference;

  const value = useMemo<ThemeContextValue>(
    () => ({
      preference,
      scheme,
      tokens: tokensFor(scheme),
      setPreference,
      loaded,
    }),
    [preference, scheme, setPreference, loaded],
  );

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      {/* The `dark` class activates the dark palette for all NativeWind classes */}
      <View
        className={`flex-1 ${schemeClass(scheme)}`}
        style={{ backgroundColor: palette[scheme].background }}
      >
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

