import { useRouter } from "expo-router";
import { FolderOpen } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useTheme } from "@/src/theme/ThemeProvider";
import { projectCategories, projects } from "@/src/data/projects";
import { ProjectCard } from "@/src/components/ProjectCard";
import { EmptyState, Screen, ScreenHeader } from "@/src/components/ui";
import { cn } from "@/src/lib/cn";

export default function ProjectsScreen() {
  const router = useRouter();
  const { tokens } = useTheme();
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <Screen
      scroll={false}
      header={<ScreenHeader title="Projects" subtitle="Featured work & case studies" />}
    >
      {/* Category filters */}
      <View className="border-b border-line bg-surface px-5 py-3">
        <FlatList
          data={[...projectCategories]}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-2" />}
          renderItem={({ item }) => {
            const active = filter === item;
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                accessibilityLabel={`Filter projects by ${item}`}
                onPress={() => setFilter(item)}
                className={cn(
                  "rounded-full px-3.5 py-1.5",
                  active ? "bg-primary" : "border border-line bg-elevated",
                )}
              >
                <Text
                  className={cn(
                    "text-[11.5px] font-sans-semibold",
                    active ? "text-white" : "text-muted",
                  )}
                >
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-5 pb-8 pt-3"
        renderItem={({ item, index }) => (
          <ProjectCard
            project={item}
            index={index}
            onPress={() => router.push(`/project/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View className="pt-6">
            <EmptyState
              icon={<FolderOpen size={26} color={tokens.muted} strokeWidth={1.6} />}
              title="No projects here yet"
              message="New case studies will appear in this category as they are published."
            />
          </View>
        }
      />
    </Screen>
  );
}
