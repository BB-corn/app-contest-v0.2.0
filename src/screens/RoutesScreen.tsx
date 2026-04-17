import { useCallback } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { routes, Route, getRouteCover } from "../data/routes";
import { colors } from "../theme/colors";

const THEME_COLORS: Record<string, string> = {
  皇城: "#8B2500",
  园林: "#2D6A4F",
  胡同: "#5B3A6B",
  祭祀: "#9C7A30",
  文脉: "#2C5F7C",
  中轴线: "#B8602A",
};

function DurationBadge({ duration }: { duration: string }) {
  return (
    <View style={st.badge}>
      <Text style={st.badgeText}>
        {duration === "half-day" ? "半日游" : "一日游"}
      </Text>
    </View>
  );
}

function RouteCard({ route, onPress }: { route: Route; onPress: () => void }) {
  const cover = getRouteCover(route);
  const themeColor = THEME_COLORS[route.theme] ?? colors.primary;

  return (
    <Pressable style={st.card} onPress={onPress}>
      {/* 封面图 */}
      {cover ? (
        <View style={st.coverWrap}>
          <Image source={{ uri: cover }} style={st.coverImg} resizeMode="cover" />
          <View style={st.coverOverlay} />
          <DurationBadge duration={route.duration} />
          <Text style={st.coverTitle}>{route.name}</Text>
        </View>
      ) : (
        <View style={[st.coverWrap, { backgroundColor: "#f0e8de" }]}>
          <DurationBadge duration={route.duration} />
          <Text style={st.coverTitle}>{route.name}</Text>
        </View>
      )}

      {/* 内容区 */}
      <View style={st.cardBody}>
        <Text style={st.subtitle}>{route.subtitle}</Text>

        {/* 主题标签 + 时长 */}
        <View style={st.metaRow}>
          <View style={[st.themeTag, { backgroundColor: themeColor + "18" }]}>
            <Text style={[st.themeTagText, { color: themeColor }]}>
              {route.theme}
            </Text>
          </View>
          <Text style={st.hours}>约 {route.estimatedHours} 小时</Text>
          <Text style={st.stops}>{route.stops.length} 个景点</Text>
        </View>

        {/* 适合人群 */}
        <View style={st.tagsRow}>
          {route.suitableFor.map((tag) => (
            <View key={tag} style={st.suitTag}>
              <Text style={st.suitTagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

export function RoutesScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<any>();

  const handlePress = useCallback(
    (route: Route) => {
      nav.navigate("RouteDetail", { routeId: route.id });
    },
    [nav]
  );

  return (
    <View style={[st.page, { paddingTop: insets.top }]}>
      {/* 头部 */}
      <View style={st.header}>
        <Text style={st.headerTitle}>推荐路线</Text>
        <Text style={st.headerSub}>精选北京古建探索路线，半日或一日，按需出发</Text>
      </View>

      {/* 路线列表 */}
      <FlatList
        data={routes}
        keyExtractor={(r) => r.id}
        contentContainerStyle={st.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <RouteCard route={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
}

const st = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  coverWrap: {
    height: 160,
    position: "relative",
    justifyContent: "flex-end",
  },
  coverImg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  coverTitle: {
    position: "absolute",
    bottom: 14,
    left: 16,
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  cardBody: {
    padding: 14,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  themeTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  themeTagText: {
    fontSize: 11,
    fontWeight: "700",
  },
  hours: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  stops: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  suitTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: "#f0e8de",
  },
  suitTagText: {
    fontSize: 11,
    color: "#7a6b60",
    fontWeight: "600",
  },
});
