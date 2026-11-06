import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { experience } from "@/src/data/experience";
import { TimelineItem } from "@/src/components/TimelineItem";
import { Screen, ScreenHeader } from "@/src/components/ui";

export default function ExperienceScreen() {
  const router = useRouter();

  return (
    <Screen
      header={
        <ScreenHeader
          title="Experience"
          subtitle="Professional & project experience"
          onBack={() => router.back()}
        />
      }
    >
      <View className="mt-4 gap-1">
        {experience.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            isLast={index === experience.length - 1}
          />
        ))}
      </View>
      <Text className="mt-5 text-center text-[10.5px] leading-relaxed text-muted">
        Professional experience and personal project work are kept clearly
        separate — just like on a well-structured résumé.
      </Text>
    </Screen>
  );
}
