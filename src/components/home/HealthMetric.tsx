import { spacing } from "@/constants/spacing";
import { Colors } from "@/constants/theme";
import { Droplet, Heart, LucideIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Icon_Map: Record<
  string,
  {
    component:
      | LucideIcon
      | React.ComponentType<{ size?: number; color?: string }>;
    color: string;
    fill: string;
  }
> = {
  heart: { component: Heart, color: "#EF4444", fill: "#a00909" },
  water: { component: Droplet, color: "#3B82F6", fill: "#1e6ce8" },
};

interface HealthMetricProp {
  icon: string;
  label: string;
  value: string;
  unit: string;
}

export default function HealthMetric({
  icon,
  label,
  value,
  unit,
}: HealthMetricProp) {
  const iconConfig = Icon_Map[icon];
  const IconComponent = iconConfig?.component;
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${iconConfig?.color}15` },
        ]}
      >
        {IconComponent ? (
          <IconComponent
            size={24}
            color={iconConfig.color}
            fill={iconConfig.fill}
          />
        ) : null}
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueRow}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.unit}>{unit}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 120,
  },

  content: {
    gap: 2,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing.xs,
  },
  value: {
    fontSize: spacing.xl,
    fontWeight: "bold",
    color: Colors.text,
  },
  unit: {
    fontSize: spacing.md,

    color: Colors.textMuted,
  },
});
