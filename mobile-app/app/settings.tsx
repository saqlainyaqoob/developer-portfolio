import { useRouter } from "expo-router";
import {
  Check,
  Info,
  Layers,
  Monitor,
  Moon,
  Palette,
  Sun,
  Tag,
  type LucideIcon,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { config } from "@/src/data/config";
import { useTheme } from "@/src/theme/ThemeProvider";
import type { ThemePreference } from "@/src/types";
import { Card, Screen, ScreenHeader, SectionLabel } from "@/src/components/ui";
import { cn } from "@/src/lib/cn";

const THEME_OPTIONS: {
  value: ThemePreference;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    value: "light",
    label: "Light",
    description: "Bright surfaces for daylight",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description: "Easy on the eyes at night",
    icon: Moon,
  },
  {
    value: "system",
    label: "System default",
    description: "Follow your device setting",
    icon: Monitor,
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { tokens, preference, scheme, setPreference } = useTheme();

  return (
    <Screen
      header={
        <ScreenHeader
          title="Settings"
          subtitle="Appearance & app information"
          onBack={() => router.back()}
        />
      }
    >
      {/* Appearance */}
      <SectionLabel label="Appearance" className="mt-4" />
      <Card className="mt-2.5 gap-1 p-2">
        {THEME_OPTIONS.map(({ value, label, description, icon: Icon }) => {
          const active = preference === value;
          return (
            <Pressable
              key={value}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`${label} theme`}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                setPreference(value);
              }}
              className={cn(
                "flex-row items-center gap-3 rounded-xl px-2.5 py-2.5 active:opacity-80",
                active && "bg-soft",
              )}
            >
              <View
                className="h-9 w-9 items-center justify-center rounded-lg border"
                style={{
                  borderColor: active ? `${tokens.primary}66` : tokens.border,
                  backgroundColor: active ? tokens.soft : "transparent",
                }}
              >
                <Icon size={16} color={active ? tokens.primary : tokens.muted} strokeWidth={1.8} />
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-sans-semibold text-foreground">{label}</Text>
                <Text className="text-[10.5px] text-muted">{description}</Text>
              </View>
              {active ? <Check size={16} color={tokens.primary} strokeWidth={2.4} /> : null}
            </Pressable>
          );
        })}
      </Card>
      <Text className="mt-2 text-[10.5px] leading-relaxed text-muted">
        Currently rendering in {scheme} mode. Your preference is persisted on
        device with AsyncStorage and restored on every launch.
      </Text>

      {/* App information */}
      <SectionLabel label="App Information" className="mt-7" />
      <Card className="mt-2.5 gap-4">
        <View className="flex-row items-center gap-3">
          <View className="h-9 w-9 items-center justify-center rounded-lg bg-soft">
            <Tag size={15} color={tokens.primary} strokeWidth={1.8} />
          </View>
          <View className="flex-1">
            <Text className="text-[12.5px] font-sans-semibold text-foreground">Version</Text>
            <Text className="text-[10.5px] text-muted">
              {config.appVersion} (production)
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <View className="h-9 w-9 items-center justify-center rounded-lg bg-soft">
            <Layers size={15} color={tokens.primary} strokeWidth={1.8} />
          </View>
          <View className="flex-1">
            <Text className="text-[12.5px] font-sans-semibold text-foreground">Built with</Text>
            <Text className="text-[10.5px] text-muted">
              React Native · Expo · NativeWind · Expo Router
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <View className="h-9 w-9 items-center justify-center rounded-lg bg-soft">
            <Palette size={15} color={tokens.primary} strokeWidth={1.8} />
          </View>
          <View className="flex-1">
            <Text className="text-[12.5px] font-sans-semibold text-foreground">Design system</Text>
            <Text className="text-[10.5px] text-muted">
              Shared theme tokens across web & native
            </Text>
          </View>
        </View>
      </Card>

      {/* About */}
      <SectionLabel label="About" className="mt-7" />
      <Card className="mt-2.5 mb-10">
        <View className="flex-row gap-2.5">
          <Info size={14} color={tokens.muted} strokeWidth={1.8} />
          <Text className="flex-1 text-[11.5px] leading-relaxed text-muted">
            This portfolio is a real cross-platform mobile application built
            with React Native, Expo, and NativeWind. The same content powers
            the web showcase — both read from the same centralized data files.
          </Text>
        </View>
      </Card>
    </Screen>
  );
}
