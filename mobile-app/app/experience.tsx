import { useRouter } from "expo-router";
import { View } from "react-native";
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
      <View className="mt-4 mb-12 gap-1">
        {experience.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            isLast={index === experience.length - 1}
          />
        ))}
      </View>
    </Screen>
  );
}
