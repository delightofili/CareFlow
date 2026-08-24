import { Colors } from "@/constants/theme";
import { DimensionValue, StyleSheet, View } from "react-native";

interface SkeletonProps {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
}

export default function Skeleton({
  width,
  height,
  borderRadius = 10,
}: SkeletonProps) {
  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.surfaceSecondary,
  },
});
