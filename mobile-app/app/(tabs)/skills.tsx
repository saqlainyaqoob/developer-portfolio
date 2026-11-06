import {
  Code2,
  Container,
  Database,
  Server,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react-native";
import { FlatList, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { skillCategories } from "@/src/data/skills";
import { useTheme } from "@/src/theme/ThemeProvider";
import { Screen, ScreenHeader, Tag } from "@/src/components/ui";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  devops: Container,
  tools: Wrench,
  mobile: Smartphone,
};

export default function SkillsScreen() {
  const { tokens } = useTheme();

  return (
    <Screen
      scroll={false}
      header={<ScreenHeader title="Technical Skills" subtitle="Tools I use to build software" />}
    >
      <FlatList
        data={skillCategories}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-5 pb-8"
        renderItem={({ item, index }) => {
          const Icon = CATEGORY_ICONS[item.id] ?? Code2;
          return (
            <Animated.View
              entering={FadeInDown.delay(index * 60).duration(420)}
              className="mt-3 rounded-2xl border border-line bg-surface p-4"
            >
              <View className="flex-row items-center gap-3">
                <View className="h-9 w-9 items-center justify-center rounded-lg bg-soft">
                  <Icon size={17} color={tokens.primary} strokeWidth={1.8} />
                </View>
                <View className="flex-1">
                  <Text className="font-sans-semibold text-[14px] text-foreground">
                    {item.title}
                  </Text>
                  <Text className="text-[10.5px] text-muted">{item.blurb}</Text>
                </View>
              </View>
              <View className="mt-3 flex-row flex-wrap gap-1.5">
                {item.items.map((skill) => (
                  <Tag key={skill} label={skill} />
                ))}
              </View>
            </Animated.View>
          );
        }}
        ListFooterComponent={
          <Text className="mt-4 text-center text-[10.5px] leading-relaxed text-muted">
            Skills are grouped by category — no inflated percentages, just the
            tools used in real projects.
          </Text>
        }
      />
    </Screen>
  );
}
