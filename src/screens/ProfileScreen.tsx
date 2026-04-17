import { useCallback } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getLandmarkById, landmarks } from "../data/landmarks";
import { useAppState } from "../context/AppStateContext";
import { LandmarkCard } from "../components/LandmarkCard";

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<any>();
  const { favorites, recentIds } = useAppState();

  const favLandmarks = favorites
    .map(getLandmarkById)
    .filter(Boolean) as typeof landmarks;
  const recentLandmarks = recentIds
    .map(getLandmarkById)
    .filter(Boolean) as typeof landmarks;

  const goMap = useCallback(() => nav.navigate("Explore"), [nav]);

  return (
    <ScrollView
      style={[st.page, { paddingTop: insets.top }]}
      contentContainerStyle={st.content}
    >
      {/* 品牌区 */}
      <View style={st.header}>
        <View style={st.logo}>
          <Text style={st.logoChar}>京</Text>
        </View>
        <View>
          <Text style={st.brandName}>京迹</Text>
          <Text style={st.brandSub}>北京古建地图导览</Text>
        </View>
      </View>

      {/* 收藏 */}
      <View style={st.section}>
        <View style={st.sectionHeader}>
          <Text style={st.sectionTitle}>我的收藏</Text>
          <Text style={st.sectionCount}>{favorites.length}</Text>
        </View>
        {favLandmarks.length === 0 ? (
          <View style={st.empty}>
            <Text style={st.emptyText}>
              还没有收藏，在地图上点击景点即可收藏
            </Text>
            <Pressable style={st.emptyBtn} onPress={goMap}>
              <Text style={st.emptyBtnText}>去探索</Text>
            </Pressable>
          </View>
        ) : (
          favLandmarks.map((l) => (
            <LandmarkCard key={l.id} landmark={l} compact onPress={goMap} />
          ))
        )}
      </View>

      {/* 最近浏览 */}
      <View style={st.section}>
        <View style={st.sectionHeader}>
          <Text style={st.sectionTitle}>最近浏览</Text>
          <Text style={st.sectionCount}>{recentIds.length}</Text>
        </View>
        {recentLandmarks.length === 0 ? (
          <View style={st.empty}>
            <Text style={st.emptyText}>还没有浏览记录</Text>
          </View>
        ) : (
          recentLandmarks.slice(0, 6).map((l) => (
            <LandmarkCard key={l.id} landmark={l} compact onPress={goMap} />
          ))
        )}
      </View>

      {/* 关于 */}
      <View style={st.about}>
        <Text style={st.aboutTitle}>关于京迹</Text>
        <Text style={st.aboutText}>
          面向北京古建筑与历史景点的地图导览应用。{"\n"}
          支持地图浏览、搜索筛选、古建识别与个人收藏。
        </Text>
        <View style={st.aboutMeta}>
          <Text style={st.aboutVersion}>v1.0.0</Text>
          <Text style={st.aboutDot}>·</Text>
          <Text style={st.aboutTech}>Expo · React Native · TypeScript</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const st = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#faf8f5" },
  content: { padding: 20, paddingBottom: 40 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28
  },
  logo: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: "#8B2500",
    alignItems: "center", justifyContent: "center", marginRight: 12
  },
  logoChar: { color: "#fff", fontSize: 20, fontWeight: "800" },
  brandName: {
    fontSize: 20, fontWeight: "800", color: "#2c1810", letterSpacing: 0.5
  },
  brandSub: { fontSize: 11, color: "#9a8a7a", marginTop: 1 },

  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: "row", alignItems: "baseline",
    marginBottom: 10, gap: 8
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#2c1810" },
  sectionCount: { fontSize: 12, fontWeight: "600", color: "#b0a090" },

  empty: {
    backgroundColor: "#fffcf8", borderRadius: 12,
    borderWidth: 1, borderColor: "#ebe4db",
    padding: 20, alignItems: "center"
  },
  emptyText: {
    fontSize: 13, color: "#9a8a7a", textAlign: "center", lineHeight: 19
  },
  emptyBtn: {
    marginTop: 10, paddingHorizontal: 18, paddingVertical: 8,
    borderRadius: 8, backgroundColor: "#f0e8de"
  },
  emptyBtnText: { fontSize: 12, fontWeight: "700", color: "#8B2500" },

  about: {
    backgroundColor: "#fffcf8", borderRadius: 12,
    borderWidth: 1, borderColor: "#ebe4db", padding: 16
  },
  aboutTitle: { fontSize: 14, fontWeight: "700", color: "#2c1810", marginBottom: 6 },
  aboutText: { fontSize: 12, lineHeight: 18, color: "#7a6b60" },
  aboutMeta: {
    flexDirection: "row", alignItems: "center", marginTop: 10, gap: 6
  },
  aboutVersion: { fontSize: 11, fontWeight: "600", color: "#b0a090" },
  aboutDot: { fontSize: 11, color: "#d0c8bc" },
  aboutTech: { fontSize: 11, color: "#b0a090" }
});
