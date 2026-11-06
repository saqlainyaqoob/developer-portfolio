import { useRouter } from "expo-router";
import { ChevronRight, FolderGit2, Mail, Settings, Sparkles } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { config } from "@/src/data/config";
import { experience } from "@/src/data/experience";
import { profile } from "@/src/data/profile";
import { projects } from "@/src/data/projects";
import { skillCategories } from "@/src/data/skills";
import { useTheme } from "@/src/theme/ThemeProvider";
import { ProjectGlyph } from "@/src/components/ProjectCard";
import { Button, Monogram, Screen, SectionLabel, Tag } from "@/src/components/ui";
import { SocialLinks } from "@/src/components/SocialLinks";

export default function HomeScreen() {
  const router = useRouter();
  const { tokens } = useTheme();
  const internship = experience[0];
  const previewSkills = skillCategories.flatMap((category) => category.items).slice(0, 10);

  return (
    <Screen>
      {/* Identity header */}
      <View className="flex-row items-center gap-3.5 pt-4">
        <Monogram size={48} />
        <View className="flex-1">
          <Text className="font-display-bold text-[18px] text-foreground">{profile.name}</Text>
          <Text className="mt-0.5 text-[11.5px] leading-tight text-muted">
            {profile.roles.join(" · ")}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open settings"
          onPress={() => router.push("/settings")}
          className="h-10 w-10 items-center justify-center rounded-full border border-line bg-surface active:opacity-70"
        >
          <Settings size={17} color={tokens.muted} strokeWidth={1.8} />
        </Pressable>
      </View>

      {/* Status chips */}
      <View className="mt-4 flex-row flex-wrap items-center gap-2">
        {config.availableForWork ? (
          <View
            className="flex-row items-center gap-1.5 rounded-full px-2.5 py-1"
            style={{ backgroundColor: "#34D3991A", borderColor: "#34D39944", borderWidth: 1 }}
          >
            <View className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <Text className="text-[10.5px] font-sans-semibold text-emerald-400">
              Open to opportunities
            </Text>
          </View>
        ) : null}
        <Tag label={config.location} />
      </View>

      {/* Intro */}
      <Animated.Text
        entering={FadeInDown.duration(400)}
        className="mt-4 text-[13.5px] leading-relaxed text-muted"
      >
        {profile.intro}
      </Animated.Text>

      {/* Primary CTAs */}
      <View className="mt-5 flex-row gap-2.5">
        <Button
          label="View My Projects"
          icon={<FolderGit2 size={15} color="#FFFFFF" />}
          className="flex-1"
          onPress={() => router.navigate("/projects")}
        />
        <Button
          label="Contact Me"
          variant="secondary"
          icon={<Mail size={15} color={tokens.foreground} />}
          className="flex-1"
          onPress={() => router.navigate("/contact")}
        />
      </View>

      {/* Experience shortcut */}
      <Animated.View entering={FadeInDown.delay(80).duration(420)} className="mt-3">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open experience timeline"
          onPress={() => router.push("/experience")}
          className="flex-row items-center gap-3 rounded-2xl border border-line bg-surface p-4 active:opacity-80"
        >
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-soft">
            <Sparkles size={18} color={tokens.primary} strokeWidth={1.8} />
          </View>
          <View className="flex-1">
            <Text className="text-[13.5px] font-sans-semibold text-foreground">
              Experience & Journey
            </Text>
            <Text className="mt-0.5 text-[11px] text-muted" numberOfLines={1}>
              {internship?.company} · {internship?.period}
            </Text>
          </View>
          <ChevronRight size={16} color={tokens.muted} />
        </Pressable>
      </Animated.View>

      {/* Featured projects */}
      <View className="mt-7">
        <View className="flex-row items-center justify-between">
          <SectionLabel label="Featured Projects" />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="See all projects"
            onPress={() => router.navigate("/projects")}
            className="flex-row items-center gap-0.5 active:opacity-70"
          >
            <Text className="text-[11.5px] font-sans-semibold" style={{ color: tokens.primary }}>
              See all
            </Text>
            <ChevronRight size={12} color={tokens.primary} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="-mx-5 mt-3"
          contentContainerClassName="gap-3 px-5"
        >
          {projects.map((project, index) => (
            <Animated.View key={project.id} entering={FadeInDown.delay(index * 60).duration(400)}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Open ${project.name} details`}
                onPress={() => router.push(`/project/${project.id}`)}
                className="w-[208px] rounded-2xl border border-line bg-surface p-4 active:opacity-80"
              >
                <ProjectGlyph icon={project.icon} accent={project.accent} size={40} />
                <Text className="mt-3 text-[14px] font-sans-semibold text-foreground">
                  {project.name}
                </Text>
                <Text className="mt-0.5 font-mono-medium text-[10px] uppercase tracking-wide text-muted">
                  {project.category}
                </Text>
                <Text numberOfLines={2} className="mt-1.5 text-[11.5px] leading-snug text-muted">
                  {project.tagline}
                </Text>
              </Pressable>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      {/* Skills preview */}
      <View className="mt-7">
        <View className="flex-row items-center justify-between">
          <SectionLabel label="Technical Skills" />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View all skills"
            onPress={() => router.navigate("/skills")}
            className="active:opacity-70"
          >
            <Text className="text-[11.5px] font-sans-semibold" style={{ color: tokens.primary }}>
              View all
            </Text>
          </Pressable>
        </View>
        <View className="mt-3 flex-row flex-wrap gap-1.5">
          {previewSkills.map((skill) => (
            <Tag key={skill} label={skill} />
          ))}
        </View>
      </View>

      {/* Socials + footer */}
      <View className="mt-7">
        <SectionLabel label="Find me online" className="mb-3" />
        <SocialLinks />
        <Text className="mt-6 text-center font-mono text-[10px] tracking-wide text-muted">
          Built with React Native · Expo · NativeWind
        </Text>
      </View>
    </Screen>
  );
}
