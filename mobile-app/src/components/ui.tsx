import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import type { ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { config } from "@/src/data/config";
import { useTheme } from "@/src/theme/ThemeProvider";
import { cn } from "@/src/lib/cn";
/* ------------------------------------------------------------------ */
/*  Screen                                                             */
/* ------------------------------------------------------------------ */
export function Screen({
  children,
  header,
  padded = true,
  scroll = true,
}: {
  children: ReactNode;
  /** Rendered above the scroll area, inside the top safe-area inset */
  header?: ReactNode;
  padded?: boolean;
  /** false renders children directly (for FlatList-based screens) */
  scroll?: boolean;
}) {
  const insets = useSafeAreaInsets();

  // Keep scrollable content above the Android system navigation area.
  const bottomPadding = Math.max(insets.bottom - 20, 0);

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="flex-1 bg-background"
      edges={["top"]}
    >
      {header}

      {scroll ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName={cn(padded ? "px-5" : "px-0")}
          contentContainerStyle={{
            paddingBottom: bottomPadding,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View className="flex-1">{children}</View>
      )}
    </SafeAreaView>
  );
}

/* ------------------------------------------------------------------ */
/*  ScreenHeader                                                       */
/* ------------------------------------------------------------------ */
export function ScreenHeader({
  title,
  subtitle,
  onBack,
  action,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  action?: ReactNode;
}) {
  const { tokens } = useTheme();
  return (
    <View className="flex-row items-center gap-3 border-b border-line bg-surface px-5 py-3.5">
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={onBack}
          hitSlop={8}
          className="h-9 w-9 items-center justify-center rounded-full border border-line bg-elevated active:opacity-70"
        >
          <ChevronLeft size={17} color={tokens.muted} strokeWidth={2} />
        </Pressable>
      ) : null}
      <View className="flex-1">
        <Text className="font-display-semibold text-[16px] text-foreground">
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-0.5 text-[11.5px] text-muted">{subtitle}</Text>
        ) : null}
      </View>
      {action}
    </View>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionLabel                                                       */
/* ------------------------------------------------------------------ */
export function SectionLabel({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <Text
      className={cn(
        "font-mono-medium text-[10px] uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      {label}
    </Text>
  );
}

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */
export function Card({
  children,
  className,
  onPress,
  accessibilityLabel,
}: {
  children: ReactNode;
  className?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
}) {
  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        className={cn(
          "rounded-2xl border border-line bg-surface p-4 active:opacity-80",
          className,
        )}
      >
        {children}
      </Pressable>
    );
  }
  return (
    <View
      className={cn("rounded-2xl border border-line bg-surface p-4", className)}
    >
      {children}
    </View>
  );
}

/* ------------------------------------------------------------------ */
/*  Tag                                                                */
/* ------------------------------------------------------------------ */
export function Tag({ label, color }: { label: string; color?: string }) {
  return (
    <View
      className="rounded-full border border-line bg-elevated px-2.5 py-1"
      style={color ? { borderColor: `${color}66` } : undefined}
    >
      <Text
        className="text-[11px] font-sans-medium text-muted"
        style={color ? { color } : undefined}
      >
        {label}
      </Text>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/*  Button                                                             */
/* ------------------------------------------------------------------ */
export function Button({
  label,
  icon,
  onPress,
  variant = "primary",
  className,
  disabled,
}: {
  label: string;
  icon?: ReactNode;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
}) {
  const handlePress = () => {
    Haptics.selectionAsync().catch(() => {});
    onPress();
  };
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      onPress={handlePress}
      disabled={disabled}
      className={cn(
        "flex-row items-center justify-center gap-2 rounded-xl px-4 py-3 active:opacity-80",
        variant === "primary" && "bg-primary",
        variant === "secondary" && "border border-line bg-elevated",
        variant === "ghost" && "bg-transparent",
        disabled && "opacity-50",
        className,
      )}
    >
      {icon}
      <Text
        className={cn(
          "text-[13.5px] font-sans-semibold",
          variant === "primary" && "text-white",
          variant === "secondary" && "text-foreground",
          variant === "ghost" && "text-muted",
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/* ------------------------------------------------------------------ */
/*  Monogram — gradient avatar placeholder                             */
/* ------------------------------------------------------------------ */
export function Monogram({ size = 48 }: { size?: number }) {
  return (
    <View
      accessibilityLabel={`${config.name} avatar`}
      accessibilityRole="image"
      className="overflow-hidden rounded-2xl"
      style={{ width: size, height: size }}
    >
      <LinearGradient
        colors={["#6366F1", "#8B5CF6"]}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text
          className="font-display-bold text-white"
          style={{ fontSize: size * 0.34 }}
        >
          {config.initials}
        </Text>
      </LinearGradient>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/*  EmptyState                                                         */
/* ------------------------------------------------------------------ */
export function EmptyState({
  icon,
  title,
  message,
}: {
  icon: ReactNode;
  title: string;
  message: string;
}) {
  return (
    <View className="items-center gap-2 rounded-2xl border border-dashed border-line px-6 py-12">
      <View className="mb-1">{icon}</View>
      <Text className="text-[14px] font-sans-semibold text-foreground">
        {title}
      </Text>
      <Text className="max-w-[240px] text-center text-[12px] leading-relaxed text-muted">
        {message}
      </Text>
    </View>
  );
}
