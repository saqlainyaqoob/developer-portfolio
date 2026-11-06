import { Briefcase, Layers } from "lucide-react-native";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import type { ExperienceItem } from "@/src/types";
import { useTheme } from "@/src/theme/ThemeProvider";
import { Card, Tag } from "@/src/components/ui";

export function TimelineItem({
  item,
  index,
  isLast = false,
}: {
  item: ExperienceItem;
  index: number;
  isLast?: boolean;
}) {
  const { tokens } = useTheme();
  const isInternship = item.type === "internship";
  const accentColor = isInternship ? tokens.primary : tokens.secondary;

  return (
    <Animated.View entering={FadeInDown.delay(index * 90).duration(450)} className="flex-row">
      {/* Rail */}
      <View className="w-9 items-center">
        <View
          className="h-[15px] w-[15px] items-center justify-center rounded-full border-2"
          style={{ borderColor: accentColor, backgroundColor: tokens.background }}
        >
          <View className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: accentColor }} />
        </View>
        {!isLast ? (
          <View
            className="absolute bottom-[-20px] top-[19px] w-px"
            style={{ backgroundColor: tokens.border }}
          />
        ) : null}
      </View>

      {/* Content */}
      <View className="flex-1 pb-5">
        <Card>
          <View className="flex-row flex-wrap items-center gap-2">
            <View
              className="rounded-full px-2 py-0.5"
              style={{ backgroundColor: isInternship ? tokens.soft : `${tokens.secondary}22` }}
            >
              <View className="flex-row items-center gap-1">
                {isInternship ? (
                  <Briefcase size={9} color={tokens.primary} />
                ) : (
                  <Layers size={9} color={tokens.secondary} />
                )}
                <Text
                  className="font-sans-semibold text-[9.5px] uppercase tracking-wider"
                  style={{ color: accentColor }}
                >
                  {isInternship ? "Internship" : "Project"}
                </Text>
              </View>
            </View>
            <Text className="font-mono text-[10px] text-muted">{item.period}</Text>
          </View>

          <Text className="mt-2 font-display-semibold text-[15px] leading-tight text-foreground">
            {item.role}
          </Text>
          <Text className="mt-0.5 text-[12.5px] font-sans-medium" style={{ color: accentColor }}>
            {item.company}
            {item.location ? (
              <Text className="font-sans text-muted"> · {item.location}</Text>
            ) : null}
          </Text>

          <Text className="mt-2 text-[12px] leading-relaxed text-muted">{item.summary}</Text>

          <View className="mt-2.5 gap-1.5">
            {item.points.map((point) => (
              <View key={point.slice(0, 24)} className="flex-row gap-2">
                <View className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: tokens.muted }} />
                <Text className="flex-1 text-[12px] leading-snug text-muted">{point}</Text>
              </View>
            ))}
          </View>

          <View className="mt-3 flex-row flex-wrap gap-1.5">
            {item.tech.map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </View>
        </Card>
      </View>
    </Animated.View>
  );
}
