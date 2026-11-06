// import { zodResolver } from "@hookform/resolvers/zod";
// import * as Clipboard from "expo-clipboard";
// import { Check, CheckCircle, Copy, RotateCcw, Send } from "lucide-react-native";
// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
// import { z } from "zod";
// import { config } from "@/src/data/config";
// import { useTheme } from "@/src/theme/ThemeProvider";
// import { buildMailtoUrl, openExternalUrl } from "@/src/lib/links";
// import { Button, Card, SectionLabel } from "@/src/components/ui";

// const schema = z.object({
//   name: z.string().min(2, "Please enter your name"),
//   email: z.email("Enter a valid email address"),
//   message: z.string().min(10, "Message should be at least 10 characters"),
// });

// type FormValues = z.infer<typeof schema>;

// export function ContactForm() {
//   const { tokens } = useTheme();
//   const [sent, setSent] = useState<FormValues | null>(null);

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: { name: "", email: "", message: "" },
//   });

//   const onSubmit = (values: FormValues) => {
//     // Honest behavior: no fake backend — we only prepare the message.
//     setSent(values);
//   };

//   const openEmailApp = async () => {
//     if (!sent) return;
//     const url = buildMailtoUrl(
//       config.email,
//       `Portfolio contact from ${sent.name}`,
//       `${sent.message}\n\n— ${sent.name} (${sent.email})`,
//     );
//     const opened = await openExternalUrl(url);
//     if (!opened) {
//       Alert.alert("No email app", "No email app is available on this device.");
//     }
//   };

//   const copyMessage = async () => {
//     if (!sent) return;
//     const text = `From: ${sent.name} <${sent.email}>\n\n${sent.message}`;
//     try {
//       await Clipboard.setStringAsync(text);
//       Alert.alert("Copied", "Message copied to the clipboard.");
//     } catch {
//       Alert.alert("Copy failed", "Copying is not available on this device.");
//     }
//   };

//   if (sent) {
//     return (
//       <Card className="items-center border-primary/30 py-6">
//         <CheckCircle size={36} color="#34D399" strokeWidth={1.6} />
//         <Text className="mt-3 text-[15px] font-sans-semibold text-foreground">
//           Message ready to send
//         </Text>
//         <Text className="mx-3 mt-1.5 text-center text-[12px] leading-relaxed text-muted">
//           No backend is configured, so nothing was sent automatically. Open
//           your email app with the pre-filled message below, or copy it first.
//         </Text>
//         <View className="mt-4 w-full gap-2 px-2">
//           <Button label="Open email app" icon={<Send size={14} color="#FFFFFF" />} onPress={openEmailApp} />
//           <View className="flex-row gap-2">
//             <Button
//               label="Copy message"
//               variant="secondary"
//               className="flex-1"
//               icon={<Copy size={14} color={tokens.muted} />}
//               onPress={copyMessage}
//             />
//             <Button
//               label="Write another"
//               variant="secondary"
//               className="flex-1"
//               icon={<RotateCcw size={14} color={tokens.muted} />}
//               onPress={() => {
//                 setSent(null);
//                 reset();
//               }}
//             />
//           </View>
//         </View>
//       </Card>
//     );
//   }

//   const borderColorFor = (hasError: boolean) => (hasError ? "#F87171" : tokens.border);

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       keyboardVerticalOffset={12}
//     >
//       <Card>
//         <SectionLabel label="Message" className="mb-3" />

//         <View className="gap-3.5">
//           <Controller
//             control={control}
//             name="name"
//             render={({ field: { onChange, value }, fieldState: { error } }) => (
//               <View>
//                 <Text className="mb-1.5 text-[11.5px] font-sans-semibold text-muted">Name</Text>
//                 <TextInput
//                   accessibilityLabel="Your name"
//                   value={value}
//                   onChangeText={onChange}
//                   placeholder="Your name"
//                   placeholderTextColor={tokens.muted}
//                   className="rounded-xl border bg-elevated px-3.5 py-2.5 text-[13px] text-foreground"
//                   style={{ borderColor: borderColorFor(!!error) }}
//                 />
//                 {error ? <Text className="mt-1 text-[11px] text-red-400">{error.message}</Text> : null}
//               </View>
//             )}
//           />

//           <Controller
//             control={control}
//             name="email"
//             render={({ field: { onChange, value }, fieldState: { error } }) => (
//               <View>
//                 <Text className="mb-1.5 text-[11.5px] font-sans-semibold text-muted">Email</Text>
//                 <TextInput
//                   accessibilityLabel="Your email address"
//                   value={value}
//                   onChangeText={onChange}
//                   placeholder="you@example.com"
//                   placeholderTextColor={tokens.muted}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   autoComplete="email"
//                   className="rounded-xl border bg-elevated px-3.5 py-2.5 text-[13px] text-foreground"
//                   style={{ borderColor: borderColorFor(!!error) }}
//                 />
//                 {error ? <Text className="mt-1 text-[11px] text-red-400">{error.message}</Text> : null}
//               </View>
//             )}
//           />

//           <Controller
//             control={control}
//             name="message"
//             render={({ field: { onChange, value }, fieldState: { error } }) => (
//               <View>
//                 <Text className="mb-1.5 text-[11.5px] font-sans-semibold text-muted">Message</Text>
//                 <TextInput
//                   accessibilityLabel="Your message"
//                   value={value}
//                   onChangeText={onChange}
//                   placeholder="Tell me about your project or role…"
//                   placeholderTextColor={tokens.muted}
//                   multiline
//                   numberOfLines={4}
//                   className="rounded-xl border bg-elevated px-3.5 py-2.5 text-[13px] text-foreground"
//                   style={{ borderColor: borderColorFor(!!error), minHeight: 110, textAlignVertical: "top" }}
//                 />
//                 {error ? <Text className="mt-1 text-[11px] text-red-400">{error.message}</Text> : null}
//               </View>
//             )}
//           />

//           <Button
//             label="Prepare Message"
//             icon={<Send size={14} color="#FFFFFF" />}
//             onPress={handleSubmit(onSubmit)}
//           />

//           <Text className="text-center text-[10.5px] leading-relaxed text-muted">
//             No data is transmitted — the message is composed locally and handed
//             to your email app.
//           </Text>
//         </View>
//       </Card>
//     </KeyboardAvoidingView>
//   );
// }



import { zodResolver } from "@hookform/resolvers/zod";
import * as Clipboard from "expo-clipboard";
import {
  CheckCircle,
  Copy,
  RotateCcw,
  Send,
} from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";

import { config } from "@/src/data/config";
import { useTheme } from "@/src/theme/ThemeProvider";
import { Button, Card, SectionLabel } from "@/src/components/ui";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Enter a valid email address").max(254),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(5000),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const { tokens } = useTheme();

  const [sent, setSent] = useState<FormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (!config.apiUrl) {
        throw new Error("The contact API URL is not configured.");
      }

      const apiUrl = config.apiUrl.replace(/\/+$/, "");

      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ??
            "Unable to submit your message. Please try again.",
        );
      }

      // Only show success after the backend confirms the message was saved.
      setSent(values);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setSubmitError(
        message.includes("Network request failed")
          ? "Unable to reach the server. Check your Wi-Fi connection and try again."
          : message,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyMessage = async () => {
    if (!sent) return;

    const text = `From: ${sent.name} <${sent.email}>\n\n${sent.message}`;

    try {
      await Clipboard.setStringAsync(text);
      Alert.alert("Copied", "Message copied to the clipboard.");
    } catch {
      Alert.alert("Copy failed", "Copying is not available on this device.");
    }
  };

  if (sent) {
    return (
      <Card className="items-center border-primary/30 py-6">
        <CheckCircle size={36} color="#34D399" strokeWidth={1.6} />

        <Text className="mt-3 text-[15px] font-sans-semibold text-foreground">
          Message submitted successfully!
        </Text>

        <Text className="mx-3 mt-1.5 text-center text-[12px] leading-relaxed text-muted">
          Thank you for reaching out. Your message has been saved successfully.
          I'll get back to you as soon as possible.
        </Text>

        <View className="mt-4 w-full gap-2 px-2">
          <Button
            label="Copy submitted message"
            variant="secondary"
            icon={<Copy size={14} color={tokens.muted} />}
            onPress={copyMessage}
          />

          <Button
            label="Write another"
            variant="secondary"
            icon={<RotateCcw size={14} color={tokens.muted} />}
            onPress={() => {
              setSent(null);
              setSubmitError("");
              reset();
            }}
          />
        </View>
      </Card>
    );
  }

  const borderColorFor = (hasError: boolean) =>
    hasError ? "#F87171" : tokens.border;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={12}
    >
      <Card>
        <SectionLabel label="Message" className="mb-3" />

        <View className="gap-3.5">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View>
                <Text className="mb-1.5 text-[11.5px] font-sans-semibold text-muted">
                  Name
                </Text>

                <TextInput
                  accessibilityLabel="Your name"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Your name"
                  placeholderTextColor={tokens.muted}
                  className="rounded-xl border bg-elevated px-3.5 py-2.5 text-[13px] text-foreground"
                  style={{ borderColor: borderColorFor(!!error) }}
                />

                {error ? (
                  <Text className="mt-1 text-[11px] text-red-400">
                    {error.message}
                  </Text>
                ) : null}
              </View>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View>
                <Text className="mb-1.5 text-[11.5px] font-sans-semibold text-muted">
                  Email
                </Text>

                <TextInput
                  accessibilityLabel="Your email address"
                  value={value}
                  onChangeText={onChange}
                  placeholder="you@example.com"
                  placeholderTextColor={tokens.muted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  className="rounded-xl border bg-elevated px-3.5 py-2.5 text-[13px] text-foreground"
                  style={{ borderColor: borderColorFor(!!error) }}
                />

                {error ? (
                  <Text className="mt-1 text-[11px] text-red-400">
                    {error.message}
                  </Text>
                ) : null}
              </View>
            )}
          />

          <Controller
            control={control}
            name="message"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View>
                <Text className="mb-1.5 text-[11.5px] font-sans-semibold text-muted">
                  Message
                </Text>

                <TextInput
                  accessibilityLabel="Your message"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Tell me about your project or role…"
                  placeholderTextColor={tokens.muted}
                  multiline
                  numberOfLines={4}
                  className="rounded-xl border bg-elevated px-3.5 py-2.5 text-[13px] text-foreground"
                  style={{
                    borderColor: borderColorFor(!!error),
                    minHeight: 110,
                    textAlignVertical: "top",
                  }}
                />

                {error ? (
                  <Text className="mt-1 text-[11px] text-red-400">
                    {error.message}
                  </Text>
                ) : null}
              </View>
            )}
          />

          {submitError ? (
            <View className="rounded-xl border border-red-400/30 bg-red-400/10 p-3">
              <Text className="text-[12px] leading-relaxed text-red-400">
                {submitError}
              </Text>
            </View>
          ) : null}

          <Button
            label={isSubmitting ? "Sending..." : "Send Message"}
            icon={
              isSubmitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Send size={14} color="#FFFFFF" />
              )
            }
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />

          <Text className="text-center text-[10.5px] leading-relaxed text-muted">
            Your message will be securely submitted to my portfolio backend.
          </Text>
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
}
