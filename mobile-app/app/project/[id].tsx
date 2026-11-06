import { useRouter, useLocalSearchParams } from "expo-router";
import { Check, ExternalLink, FolderGit2, Lightbulb, Link2, Wrench } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { getProject } from "@/src/data/projects";
import { useTheme } from "@/src/theme/ThemeProvider";
import { isSafeExternalUrl, openExternalUrl } from "@/src/lib/links";
import { GithubIcon } from "@/src/components/BrandIcons";
import { ProjectGlyph } from "@/src/components/ProjectCard";
import {
  Card,
  EmptyState,
  Screen,
  ScreenHeader,
  SectionLabel,
  Tag,
} from "@/src/components/ui";

function LinkButton({
  kind,
  url,
}: {
  kind: "github" | "demo";
  url: string | undefined;
}) {
  const { tokens } = useTheme();
  const label = kind === "github" ? "GitHub Repo" : "Live Demo";
  const Icon = kind === "github" ? GithubIcon : ExternalLink;

  if (!isSafeExternalUrl(url)) {
    return (
      <View
        className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-dashed py-3"
        style={{ borderColor: tokens.border }}
      >
        <Link2 size={14} color={tokens.muted} />
        <Text className="text-[12px] font-sans-semibold text-muted">{label}: not set</Text>
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`Open ${label}`}
      onPress={() => {
        void openExternalUrl(url);
      }}
      className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-primary py-3 active:opacity-80"
    >
      <Icon size={14} color="#FFFFFF" />
      <Text className="text-[12px] font-sans-semibold text-white">{label}</Text>
    </Pressable>
  );
}

export default function ProjectDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { tokens } = useTheme();
  const project = params.id ? getProject(params.id) : undefined;

  if (!project) {
    return (
      <Screen
        header={<ScreenHeader title="Project" onBack={() => router.back()} />}
        padded={false}
      >
        <View className="flex-1 items-center justify-center px-8">
          <EmptyState
            icon={<FolderGit2 size={28} color={tokens.muted} strokeWidth={1.6} />}
            title="Project not found"
            message="The project you are looking for does not exist or was removed."
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      header={
        <ScreenHeader
          title={project.name}
          subtitle={project.category}
          onBack={() => router.back()}
        />
      }
    >
      {/* Hero */}
      <Animated.View
        entering={FadeInDown.duration(420)}
        className="mt-4 rounded-2xl border p-5"
        style={{ borderColor: `${project.accent}44`, backgroundColor: `${project.accent}14` }}
      >
        <ProjectGlyph icon={project.icon} accent={project.accent} size={46} />
        <Text className="mt-3 font-display-bold text-[20px] text-foreground">{project.name}</Text>
        <Text
          className="mt-0.5 font-mono-medium text-[11px] uppercase tracking-wider"
          style={{ color: project.accent }}
        >
          {project.category}
        </Text>
        <Text className="mt-2 text-[12.5px] leading-relaxed text-muted">
          {project.description}
        </Text>
      </Animated.View>

      {/* Problem */}
      <SectionLabel label="The Problem It Solves" className="mt-6" />
      <Card className="mt-2.5">
        <View className="flex-row gap-2.5">
          <Lightbulb size={15} color="#FBBF24" strokeWidth={1.8} />
          <Text className="flex-1 text-[12px] leading-relaxed text-muted">{project.problem}</Text>
        </View>
      </Card>

      {/* Features */}
      <SectionLabel label="Key Features" className="mt-6" />
      <View className="mt-2.5 flex-row flex-wrap justify-between">
        {project.features.map((feature, index) => (
          <Animated.View
            key={feature}
            entering={FadeInDown.delay(Math.min(index, 8) * 40).duration(380)}
            className="mb-2 w-[48.5%] flex-row gap-1.5"
          >
            <Check size={12} color={project.accent} strokeWidth={3} />
            <Text className="flex-1 text-[11px] leading-snug text-muted">{feature}</Text>
          </Animated.View>
        ))}
      </View>

      {/* Tech stack */}
      <SectionLabel label="Technology Stack" className="mt-4" />
      <View className="mt-2.5 flex-row flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <Tag key={tech} label={tech} color={project.accent} />
        ))}
      </View>

      {/* Highlights */}
      <SectionLabel label="Implementation Highlights" className="mt-6" />
      <View className="mt-2.5 gap-2.5">
        {project.highlights.map((highlight) => (
          <View key={highlight.slice(0, 24)} className="flex-row gap-2.5">
            <Wrench size={12} color={tokens.muted} strokeWidth={1.8} />
            <Text className="flex-1 text-[11.5px] leading-relaxed text-muted">{highlight}</Text>
          </View>
        ))}
      </View>

      {/* Links */}
      <SectionLabel label="Links" className="mt-6" />
      <View className="mt-2.5 mb-8 flex-row gap-2.5">
        <LinkButton kind="github" url={project.links.github} />
        <LinkButton kind="demo" url={project.links.demo} />
      </View>
      {/* <Text className="mt-2.5 text-center text-[10.5px] leading-relaxed text-muted">
        Repository and demo URLs are configured in src/data/projects.ts —
        placeholders are never presented as live links.
      </Text> */}
    </Screen>
  );
}
