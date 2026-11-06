import { Briefcase, ChevronRight, Server, ShoppingCart } from "lucide-react-native";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import type { Project, ProjectIcon } from "@/src/types";
import { useTheme } from "@/src/theme/ThemeProvider";
import { Card, Tag } from "@/src/components/ui";

const GLYPHS: Record<ProjectIcon, typeof Briefcase> = {
  briefcase: Briefcase,
  cart: ShoppingCart,
  server: Server,
};

/** Tinted square glyph for a project icon — shared across screens */
export function ProjectGlyph({
  icon,
  accent,
  size = 40,
}: {
  icon: ProjectIcon;
  accent: string;
  size?: number;
}) {
  const Icon = GLYPHS[icon];
  return (
    <View
      className="items-center justify-center rounded-xl"
      style={{ width: size, height: size, backgroundColor: `${accent}22` }}
    >
      <Icon size={Math.round(size * 0.45)} color={accent} strokeWidth={1.8} />
    </View>
  );
}

export function ProjectCard({
  project,
  index = 0,
  onPress,
}: {
  project: Project;
  index?: number;
  onPress: () => void;
}) {
  const { tokens } = useTheme();
  const Icon = GLYPHS[project.icon];

  return (
    <Animated.View entering={FadeInDown.delay(index * 70).duration(420)}>
      <Card className="mb-4" onPress={onPress} accessibilityLabel={`View ${project.name} details`}>
        <View className="flex-row items-start gap-3">
          <View
            className="items-center justify-center rounded-xl"
            style={{ width: 44, height: 44, backgroundColor: `${project.accent}22` }}
          >
            <Icon size={20} color={project.accent} strokeWidth={1.8} />
          </View>

          <View className="flex-1">
            <View className="flex-row items-center justify-between gap-2">
              <Text className="flex-1 font-sans-semibold text-[15px] text-foreground">
                {project.name}
              </Text>
              <ChevronRight size={15} color={tokens.muted} />
            </View>

            <Text
              className="mt-0.5 font-mono-medium text-[10.5px] uppercase tracking-wider"
              style={{ color: project.accent }}
            >
              {project.category}
            </Text>

            <Text className="mt-1.5 text-[12px] leading-snug text-muted">
              {project.tagline}
            </Text>

            <View className="mt-2.5 flex-row flex-wrap gap-1.5">
              {project.tech.slice(0, 3).map((tech) => (
                <Tag key={tech} label={tech} />
              ))}
              {project.tech.length > 3 ? <Tag label={`+${project.tech.length - 3}`} /> : null}
            </View>
          </View>
        </View>
      </Card>
    </Animated.View>
  );
}
