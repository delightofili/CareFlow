import { Colors } from "@/constants/theme";
import { spacing } from "@/constants/spacing";
import { Droplet, Heart, LucideIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ICON_MAP: Record<
  string,
  {
    component: LucideIcon;
    color: string;
  }
> = {
  heart: {
    component: Heart,
    color: Colors.primary,
  },

  water: {
    component: Droplet,
    color: "#4A90E2",
  },
};

interface HealthMetricProps {
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
}: HealthMetricProps) {
  const iconConfig = ICON_MAP[icon];
  const IconComponent = iconConfig?.component;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: iconConfig
              ? `${iconConfig.color}15`
              : Colors.surfaceSecondary,
          },
        ]}
      >
        {IconComponent && <IconComponent size={20} color={iconConfig.color} />}
      </View>

      <Text style={styles.label}>{label}</Text>

      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  label: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },

  value: {
    fontSize: 23,
    fontWeight: "800",
    color: Colors.text,
  },

  unit: {
    marginLeft: spacing.xs,
    fontSize: 12,
    color: Colors.textMuted,
  },
});
