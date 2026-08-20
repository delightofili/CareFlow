import ProfileRow from "@/components/profile/ProfileRow";
import { Colors } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>C</Text>
          </View>

          <View>
            <Text style={styles.profilename}>Chukwunonso</Text>
            <Text style={styles.account}>Personal Account</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Settings</Text>

        <View style={styles.settings}>
          <ProfileRow title="Personal information" icon="personal" />

          <ProfileRow title="Notifications" icon="notification" />

          <ProfileRow title="Appearance" icon="appearance" />

          <ProfileRow title="Privacy" icon="privacy" />

          <ProfileRow title="Help & Support" icon="help" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.text,
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 28,
    padding: 20,
    borderRadius: 22,
    backgroundColor: Colors.surface,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },

  avatarText: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.white,
  },

  profilename: {
    marginLeft: 16,
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },

  account: {
    marginLeft: 16,
    marginTop: 3,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  sectionTitle: {
    marginTop: 32,
    marginBottom: 4,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: Colors.textMuted,
  },

  settings: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
