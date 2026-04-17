import { useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getLandmarkById } from "../data/landmarks";
import { useAppState } from "../context/AppStateContext";
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

export function LandmarkDetailScreen() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useAppState();
  const [imgErr, setImgErr] = useState(false);

  const landmark = getLandmarkById(route.params?.landmarkId);
  if (!landmark) return null;

  const fav = isFavorite(landmark.id);
  const col = CAT_COLORS[landmark.category] ?? colors.primary;
  const builtYearText = landmark.builtYear ? `始建${landmark.builtYear}年` : "始建年代不详";

  return (
    <View style={[s.page, { paddingTop: insets.top }]}>
      {/* 顶部导航栏 */}
      <View style={s.topBar}>
        <Pressable style={s.backBtn} onPress={() => nav.goBack()}>
          <Text style={s.backText}>← 返回</Text>
        </Pressable>
        <Pressable
          style={[s.favChip, fav && s.favChipOn]}
          onPress={() => toggleFavorite(landmark.id)}
        >
          <Text style={[s.favChipText, fav && { color: "#fff" }]}>
            {fav ? "♥ 已收藏" : "♡ 收藏"}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 封面图 */}
        <View style={s.heroWrap}>
          {!imgErr ? (
            <Image
              source={{ uri: landmark.cover }}
              style={s.hero}
              resizeMode="cover"
              onError={() => setImgErr(true)}
            />
          ) : (
            <View style={[s.heroFallback, { backgroundColor: col + "18" }]}>
              <Text style={[s.heroFallbackText, { color: col }]}>
                {landmark.name[0]}
              </Text>
            </View>
          )}
          {/* 图片来源提示 */}
          <View style={s.imgCredit}>
            <Text style={s.imgCreditText}>图片来源：Wikimedia Commons</Text>
          </View>
        </View>

        {/* 标题区 */}
        <Text style={s.name}>{landmark.name}</Text>

        <View style={s.metaRow}>
          <View style={[s.badge, { backgroundColor: col + "14", borderColor: col + "30" }]}>
            <Text style={[s.badgeText, { color: col }]}>
              {landmark.category}
            </Text>
          </View>
          <Text style={s.metaText}>{landmark.dynasty} · {builtYearText}</Text>
          <Text style={s.metaText}>{landmark.district}</Text>
        </View>

        {/* 标签 */}
        <View style={s.tagsRow}>
          {landmark.tags.map((t) => (
            <View key={t} style={s.tag}>
              <Text style={s.tagText}>{t}</Text>
            </View>
          ))}
        </View>

        {/* 详细介绍 */}
        <View style={s.descSection}>
          <Text style={s.sectionTitle}>详细介绍</Text>
          <Text style={s.descText}>{landmark.description}</Text>
        </View>

        {/* 资料来源 */}
        <View style={s.sourcesSection}>
          <Text style={s.sectionTitle}>资料来源</Text>
          <Text style={s.sourcesNote}>
            以下资料来源用于本景点介绍内容的编写与核实
          </Text>
          {landmark.sources.map((src, i) => (
            <Pressable
              key={i}
              style={s.sourceItem}
              onPress={() => Linking.openURL(src.url).catch(() => {})}
            >
              <View style={s.sourceIndex}>
                <Text style={s.sourceIndexText}>{i + 1}</Text>
              </View>
              <View style={s.sourceBody}>
                <Text style={s.sourceTitle}>{src.title}</Text>
                <Text style={s.sourceUrl} numberOfLines={1}>
                  {src.url}
                </Text>
              </View>
              <Text style={s.sourceArrow}>↗</Text>
            </Pressable>
          ))}
        </View>

        {/* 操作按钮 */}
        <View style={s.actions}>
          <Pressable
            style={s.actionBtn}
            onPress={() => {
              nav.navigate("Main", { screen: "Explore" });
            }}
          >
            <Text style={s.actionBtnText}>在地图上查看</Text>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    paddingVertical: 4,
    paddingRight: 12,
  },
  backText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  favChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#f0e8de",
  },
  favChipOn: {
    backgroundColor: colors.primary,
  },
  favChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7a6b60",
  },

  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  /* ── 封面 ── */
  heroWrap: {
    width: "100%",
    aspectRatio: 1.6,
    backgroundColor: "#f0e8de",
    overflow: "hidden",
  },
  hero: {
    width: "100%",
    height: "100%",
  },
  heroFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heroFallbackText: {
    fontSize: 56,
    fontWeight: "800",
  },
  imgCredit: {
    position: "absolute",
    bottom: 8,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  imgCreditText: {
    fontSize: 9,
    color: "rgba(255,255,255,0.85)",
  },

  /* ── 标题 ── */
  name: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 8,
    gap: 8,
    flexWrap: "wrap",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "600",
  },

  /* ── 标签 ── */
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginTop: 12,
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#f0e6d6",
  },
  tagText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#7a6b60",
  },

  /* ── 详细介绍 ── */
  descSection: {
    paddingHorizontal: 20,
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 10,
  },
  descText: {
    fontSize: 14.5,
    lineHeight: 26,
    color: "#3a2e22",
    letterSpacing: 0.2,
  },

  /* ── 资料来源 ── */
  sourcesSection: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  sourcesNote: {
    fontSize: 11.5,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 17,
  },
  sourceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  sourceIndex: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary + "12",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  sourceIndexText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  sourceBody: {
    flex: 1,
  },
  sourceTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  sourceUrl: {
    fontSize: 10.5,
    color: "#2C5F7C",
    marginTop: 2,
  },
  sourceArrow: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },

  /* ── 操作 ── */
  actions: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  actionBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  actionBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});
