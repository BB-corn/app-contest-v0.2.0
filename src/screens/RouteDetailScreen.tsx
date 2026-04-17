import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getRouteById, getRouteStops, getRouteCover } from "../data/routes";
import { colors } from "../theme/colors";

const CAT_COLORS: Record<string, string> = {
  宫殿: "#8B2500",
  坛庙: "#9C7A30",
  园林: "#2D6A4F",
  城门: "#5B3A6B",
  寺庙: "#B8602A",
  历史街区: "#2C5F7C",
  古迹: "#6B6B6B",
};

export function RouteDetailScreen() {
  const routeP = useRoute<any>();
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const route = getRouteById(routeP.params?.routeId);
  if (!route) return null;

  const stopsData = getRouteStops(route);
  const cover = getRouteCover(route);

  return (
    <View style={[st.page, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Hero */}
        <View style={st.hero}>
          {cover ? (
            <Image source={{ uri: cover }} style={st.heroImg} resizeMode="cover" />
          ) : null}
          <View style={st.heroOverlay} />

          {/* 返回按钮 */}
          <Pressable style={st.backBtn} onPress={() => nav.goBack()}>
            <Text style={st.backText}>← 返回</Text>
          </Pressable>

          {/* 标题区 */}
          <View style={st.heroContent}>
            <View style={st.durationBadge}>
              <Text style={st.durationText}>
                {route.duration === "half-day" ? "半日游" : "一日游"} · 约{route.estimatedHours}小时
              </Text>
            </View>
            <Text style={st.heroTitle}>{route.name}</Text>
            <Text style={st.heroSub}>{route.subtitle}</Text>
          </View>
        </View>

        {/* 描述 */}
        <View style={st.section}>
          <Text style={st.desc}>{route.description}</Text>

          {/* 适合人群 */}
          <View style={st.tagsRow}>
            {route.suitableFor.map((tag) => (
              <View key={tag} style={st.suitTag}>
                <Text style={st.suitTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 行程时间线 */}
        <View style={st.section}>
          <Text style={st.sectionTitle}>行程安排</Text>

          {stopsData.map(({ stop, landmark }, idx) => {
            const isLast = idx === stopsData.length - 1;
            const catColor = landmark ? (CAT_COLORS[landmark.category] ?? colors.primary) : colors.primary;

            return (
              <Pressable
                key={stop.landmarkId}
                style={st.stopRow}
                onPress={() => {
                  if (landmark) {
                    nav.navigate("LandmarkDetail", { landmarkId: landmark.id });
                  }
                }}
              >
                {/* 时间线 */}
                <View style={st.timeline}>
                  <View style={[st.dot, { backgroundColor: catColor }]}>
                    <Text style={st.dotNum}>{idx + 1}</Text>
                  </View>
                  {!isLast && <View style={st.line} />}
                </View>

                {/* 内容卡片 */}
                <View style={[st.stopCard, isLast && { marginBottom: 0 }]}>
                  {/* 缩略图 */}
                  {landmark?.cover ? (
                    <Image
                      source={{ uri: landmark.cover }}
                      style={st.stopThumb}
                      resizeMode="cover"
                    />
                  ) : null}

                  <View style={st.stopInfo}>
                    <Text style={st.stopName}>
                      {landmark?.name ?? stop.landmarkId}
                    </Text>

                    <View style={st.stopMeta}>
                      {landmark && (
                        <Text style={[st.stopCat, { color: catColor }]}>
                          {landmark.category}
                        </Text>
                      )}
                      <Text style={st.stopDur}>停留 {stop.duration} 分钟</Text>
                    </View>

                    <Text style={st.stopTip}>{stop.tip}</Text>

                    <Text style={st.stopLink}>查看详情 →</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* 参考来源 */}
        <View style={[st.section, { marginBottom: insets.bottom + 30 }]}>
          <Text style={st.sourceLabel}>路线参考</Text>
          <Text style={st.sourceText}>{route.source}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const st = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    height: 240,
    position: "relative",
    justifyContent: "flex-end",
  },
  heroImg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  backBtn: {
    position: "absolute",
    top: 12,
    left: 16,
    backgroundColor: "rgba(255,255,255,0.85)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  backText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  heroContent: {
    padding: 18,
  },
  durationBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 8,
  },
  durationText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.88)",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  desc: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 12,
  },
  suitTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: "#f0e8de",
  },
  suitTagText: {
    fontSize: 12,
    color: "#7a6b60",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  stopRow: {
    flexDirection: "row",
    minHeight: 100,
  },
  timeline: {
    width: 36,
    alignItems: "center",
  },
  dot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  dotNum: {
    fontSize: 12,
    fontWeight: "800",
    color: "#fff",
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  stopCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginLeft: 8,
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  stopThumb: {
    width: 80,
    height: "100%",
    minHeight: 90,
  },
  stopInfo: {
    flex: 1,
    padding: 12,
  },
  stopName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  stopMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  stopCat: {
    fontSize: 11,
    fontWeight: "700",
  },
  stopDur: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  stopTip: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 6,
    lineHeight: 17,
  },
  stopLink: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8B2500",
    marginTop: 6,
  },
  sourceLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
    marginBottom: 4,
  },
  sourceText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
