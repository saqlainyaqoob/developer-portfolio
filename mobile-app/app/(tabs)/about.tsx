import { useRouter } from "expo-router";
import { ArrowRight, GraduationCap, Heart, Target } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { profile } from "@/src/data/profile";
import { useTheme } from "@/src/theme/ThemeProvider";
import { Card, Screen, SectionLabel, ScreenHeader, Tag } from "@/src/components/ui";

export default function AboutScreen() {
  const router = useRouter();
  const { tokens } = useTheme();

  return (
    <Screen
      padded={false}
      header={<ScreenHeader title="About Me" subtitle="Background, education & approach" />}
    >
      <View className="px-5 pt-5">
          {/* Bio */}
          <SectionLabel label="Biography" />
          <View className="mt-2.5 gap-2.5">
            {profile.bio.map((paragraph, index) => (
              <Animated.Text
                key={paragraph.slice(0, 24)}
                entering={FadeInDown.delay(index * 60).duration(400)}
                className="text-[12.5px] leading-relaxed text-muted"
              >
                {paragraph}
              </Animated.Text>
            ))}
          </View>

          {/* Education */}
          <SectionLabel label="Education" className="mt-7" />
          <Card className="mt-2.5">
            <View className="flex-row items-start gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-soft">
                <GraduationCap size={18} color={tokens.primary} strokeWidth={1.8} />
              </View>
              <View className="flex-1">
                <Text className="font-sans-semibold text-[14px] text-foreground">
                  {profile.education.degree}
                </Text>
                <Text className="mt-1 text-[11.5px] leading-relaxed text-muted">
                  {profile.education.summary}
                </Text>
              </View>
            </View>
          </Card>

          {/* Interests */}
          <SectionLabel label="Development Interests" className="mt-7" />
          <View className="mt-2.5 flex-row flex-wrap gap-1.5">
            {profile.interests.map((interest) => (
              <Tag key={interest} label={interest} />
            ))}
          </View>

          {/* Approach */}
          <SectionLabel label="My Engineering Approach" className="mt-7" />
          <View className="mt-2.5 gap-2.5">
            {profile.approach.map((item, index) => (
              <Card key={item.title}>
                <View className="flex-row gap-3">
                  <Text className="font-mono-medium text-[11px]" style={{ color: tokens.primary }}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <View className="flex-1">
                    <Text className="font-sans-semibold text-[13.5px] text-foreground">
                      {item.title}
                    </Text>
                    <Text className="mt-1 text-[12px] leading-relaxed text-muted">
                      {item.description}
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          {/* Objectives */}
          <SectionLabel label="Career Objectives" className="mt-7" />
          <Card className="mt-2.5">
            <View className="gap-3">
              {profile.objectives.map((objective) => (
                <View key={objective} className="flex-row gap-2.5">
                  <Target size={14} color={tokens.secondary} strokeWidth={1.8} />
                  <Text className="flex-1 text-[12px] leading-relaxed text-muted">{objective}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* CTA */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open experience timeline"
            onPress={() => router.push("/experience")}
            className="mt-6 flex-row items-center justify-between rounded-2xl border bg-soft px-4 py-3.5 active:opacity-80"
            style={{ borderColor: `${tokens.primary}55` }}
          >
            <Text className="text-[13.5px] font-sans-semibold" style={{ color: tokens.primary }}>
              View my experience timeline
            </Text>
            <ArrowRight size={16} color={tokens.primary} />
          </Pressable>
        </View>
    </Screen>
  );
}
