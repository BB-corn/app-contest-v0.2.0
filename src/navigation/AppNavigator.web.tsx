import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { MapScreen } from "../screens/MapScreen";
import { RoutesScreen } from "../screens/RoutesScreen";
import { RecognitionScreen } from "../screens/RecognitionScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { colors } from "../theme/colors";

export type TabParamList = {
  Explore: undefined;
  Routes: undefined;
  Recognition: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({ label, color, focused }: { label: string; color: string; focused?: boolean }) {
  return (
    <View style={{
      width: 30, height: 30, borderRadius: 15,
      backgroundColor: focused ? color + "14" : "transparent",
      alignItems: "center", justifyContent: "center"
    }}>
      <Text style={{ fontSize: 13, fontWeight: "800", color }}>{label}</Text>
    </View>
  );
}

export function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 56,
          paddingBottom: 6,
          paddingTop: 4
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" }
      }}
    >
      <Tab.Screen
        name="Explore"
        component={MapScreen}
        options={{
          tabBarLabel: "探索",
          tabBarIcon: ({ color, focused }) => <TabIcon label="探" color={color} focused={focused} />
        }}
      />
      <Tab.Screen
        name="Routes"
        component={RoutesScreen}
        options={{
          tabBarLabel: "路线",
          tabBarIcon: ({ color, focused }) => <TabIcon label="线" color={color} focused={focused} />
        }}
      />
      <Tab.Screen
        name="Recognition"
        component={RecognitionScreen}
        options={{
          tabBarLabel: "识别",
          tabBarIcon: ({ color, focused }) => <TabIcon label="识" color={color} focused={focused} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "我的",
          tabBarIcon: ({ color, focused }) => <TabIcon label="我" color={color} focused={focused} />
        }}
      />
    </Tab.Navigator>
  );
}
