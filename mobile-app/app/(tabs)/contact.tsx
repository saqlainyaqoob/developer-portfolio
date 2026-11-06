import * as Clipboard from "expo-clipboard";
import { Copy, Mail } from "lucide-react-native";
import { Alert, Pressable, Text, View } from "react-native";
import { config } from "@/src/data/config";
import { useTheme } from "@/src/theme/ThemeProvider";
import { ContactForm } from "@/src/components/ContactForm";
import { Card, Screen, ScreenHeader } from "@/src/components/ui";
import { SocialLinks } from "@/src/components/SocialLinks";

export default function ContactScreen() {
  const { tokens } = useTheme();

  const copyEmail = async () => {
    try {
      await Clipboard.setStringAsync(config.email);
      Alert.alert("Copied", "Email address copied to the clipboard.");
    } catch {
      Alert.alert("Copy failed", "Copying is not available on this device.");
    }
  };

  return (
    <Screen
      header={<ScreenHeader title="Contact" subtitle="Let's build something together" />}
    >
      <Text className="mt-4 text-[12.5px] leading-relaxed text-muted">
        I'm open to full-time roles, freelance projects, and interesting
        collaborations. The fastest way to reach me is email — or use the form
        below.
      </Text>

      {/* Direct email */}
      <Card className="mt-4">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-soft">
            <Mail size={17} color={tokens.primary} strokeWidth={1.8} />
          </View>
          <View className="flex-1">
            <Text className="font-mono-medium text-[10px] uppercase tracking-wider text-muted">
              Email
            </Text>
            <Text
              className="mt-0.5 text-[13.5px] font-sans-semibold text-foreground"
              numberOfLines={1}
            >
              {config.email}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Copy email address"
            onPress={copyEmail}
            className="h-8 w-8 items-center justify-center rounded-lg border border-line active:opacity-70"
          >
            <Copy size={13} color={tokens.muted} />
          </Pressable>
        </View>
      </Card>

      {/* Socials */}
      <View className="mt-4">
        <SocialLinks />
      </View>

      {/* Form */}
      <View className="mt-5">
        <ContactForm />
      </View>
    </Screen>
  );
}
