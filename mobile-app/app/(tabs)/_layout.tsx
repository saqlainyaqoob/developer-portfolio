import { Tabs } from "expo-router";
import { Code2, FolderGit2, Home, Mail, User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/src/theme/ThemeProvider";

export default function TabsLayout() {
  const { tokens } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.primary,
        tabBarInactiveTintColor: tokens.muted,

        tabBarStyle: {
          backgroundColor: tokens.surface,
          borderTopColor: tokens.border,
          borderTopWidth: 1,

          // Account for Android's bottom system navigation area
          height: 58 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 1,
        },
      
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "Inter_500Medium",
        },

        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />

      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          tabBarIcon: ({ color, size }) => (
            <FolderGit2 size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />

      <Tabs.Screen
        name="skills"
        options={{
          title: "Skills",
          tabBarIcon: ({ color, size }) => (
            <Code2 size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />

      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color, size }) => (
            <Mail size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />
    </Tabs>
  );
}
