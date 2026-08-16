import { Tabs } from "expo-router";
import { CheckCircle2, Clock, Home, User } from "lucide-react-native/";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#635BFF",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="timeline"
        options={{
          title: "Timeline",
          tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <CheckCircle2 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
