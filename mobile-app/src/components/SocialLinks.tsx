import { Mail } from "lucide-react-native";
import type { ReactNode } from "react";
import { Alert, Linking, Text, Pressable, View  } from "react-native";
import * as Haptics from "expo-haptics";
import { config } from "@/src/data/config";
import { isSafeExternalUrl, openExternalUrl } from "@/src/lib/links";
import { GithubIcon, LinkedinIcon } from "@/src/components/BrandIcons";
import { useTheme } from "@/src/theme/ThemeProvider";
import { cn } from "@/src/lib/cn";

type SocialKind = "github" | "linkedin" | "email";

const PLACEHOLDER_MARKERS = ["yourusername", "example.com"];

async function openSocial(kind: SocialKind, url: string, label: string) {
  Haptics.selectionAsync().catch(() => {});
  const isConfigured =
    isSafeExternalUrl(url) &&
    !PLACEHOLDER_MARKERS.some((marker) => url.includes(marker));

  if (kind === "email") {
    // mailto: always composes locally — never claims a backend exists
    try {
      await Linking.openURL(`mailto:${config.email}`);
    } catch {
      Alert.alert("No email app", "No email app is installed on this device.");
    }
    return;
  }

  if (!isConfigured) {
    Alert.alert(
      "Link not configured",
      `Add your real ${label} URL in src/data/config.ts — this placeholder is intentionally left unset.`,
    );
    return;
  }

  const opened = await openExternalUrl(url);
  if (!opened) {
    Alert.alert("Could not open link", "The link could not be opened on this device.");
  }
}

export function SocialLinks({ className }: { className?: string }) {
  const { tokens } = useTheme();

  const items: { kind: SocialKind; label: string; url: string; icon: ReactNode }[] = [
    {
      kind: "github",
      label: "GitHub",
      url: config.socials.github,
      icon: <GithubIcon size={15} color={tokens.muted} />,
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      url: config.socials.linkedin,
      icon: <LinkedinIcon size={15} color={tokens.muted} />,
    },
    {
      kind: "email",
      label: "Email",
      url: `mailto:${config.email}`,
      icon: <Mail size={15} color={tokens.muted} strokeWidth={1.8} />,
    },
  ];

  return (
    <View className={cn("flex-row gap-2.5", className)}>
      {items.map(({ kind, label, url, icon }) => (
        <Pressable
          key={kind}
          accessibilityRole="button"
          accessibilityLabel={`Open ${label}`}
          onPress={() => openSocial(kind, url, label)}
          className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-line bg-surface py-3 active:opacity-75"
        >
          {icon}
          <Text className="text-[12.5px] font-sans-semibold text-muted">{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
