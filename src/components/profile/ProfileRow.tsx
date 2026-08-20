import { Colors } from "@/constants/theme";
import {
  Bell,
  ChevronRight,
  CircleHelp,
  LucideIcon,
  ShieldCheck,
  Sun,
  UserRound,
} from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ICON_MAP: Record<string, LucideIcon> = {
  personal: UserRound,
  notification: Bell,
  appearance: Sun,
  privacy: ShieldCheck,
  help: CircleHelp,
};

interface ProfileRowProps {
  title: string;
  icon: string;
  onPress?: () => void;
}

export default function ProfileRow({ title, icon, onPress }: ProfileRowProps) {
  const IconComponent = ICON_MAP[icon];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          {IconComponent && (
            <IconComponent size={18} color={Colors.textSecondary} />
          )}
        </View>

        <Text style={styles.title}>{title}</Text>
      </View>

      <ChevronRight size={18} color={Colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  pressed: {
    opacity: 0.55,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surfaceSecondary,
  },

  title: {
    marginLeft: 13,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
});
