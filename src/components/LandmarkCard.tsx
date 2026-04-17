import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Landmark } from "../data/landmarks";
import { useAppState } from "../context/AppStateContext";
import { colors } from "../theme/colors";

interface Props {
  landmark: Landmark;
  onPress: () => void;
  compact?: boolean;
}

const CAT_COLORS: Record<string, string> = {
  宫殿: "#8B2500",
  坛庙: "#9C7A30",
  园林: "#2D6A4F",
  城门: "#5B3A6B",
  寺庙: "#B8602A",
  历史街区: "#2C5F7C",
  古迹: "#6B6B6B"
};

export function LandmarkCard({ landmark, onPress, compact }: Props) {
  const { isFavorite, toggleFavorite } = useAppState();
  const fav = isFavorite(landmark.id);
  const [imgErr, setImgErr] = useState(false);
  const col = CAT_COLORS[landmark.category] ?? "#8B2500";

  return (
    <Pressable
      style={[st.card, compact && st.cardCompact]}
      onPress={onPress}
    >
      {/* 缩略图 */}
      <View style={st.thumb}>
        {!imgErr ? (
          <Image
            source={{ uri: landmark.cover }}
            style={st.thumbImg}
            resizeMode="cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <View
            style={[st.thumbFallback, { backgroundColor: col + "18" }]}
          >
            <Text style={[st.thumbLetter, { color: col }]}>
              {landmark.name[0]}
            </Text>
          </View>
        )}
      </View>

      <View style={st.body}>
        <Text style={st.name} numberOfLines={1}>
          {landmark.name}
        </Text>
        <View style={st.metaRow}>
          <View style={[st.badge, { backgroundColor: col + "14" }]}>
            <Text style={[st.badgeText, { color: col }]}>
              {landmark.category}
            </Text>
          </View>
          <Text style={st.district}>{landmark.dynasty} · {landmark.district}</Text>
        </View>
        {!compact && (
          <Text style={st.summary} numberOfLines={2}>
            {landmark.summary}
          </Text>
        )}
      </View>

      <Pressable
        style={st.favBtn}
        onPress={(e) => {
          e.stopPropagation?.();
          toggleFavorite(landmark.id);
        }}
        hitSlop={10}
      >
        <Text style={[st.favIcon, fav && { color: "#8B2500" }]}>
          {fav ? "♥" : "♡"}
        </Text>
      </Pressable>
    </Pressable>
  );
}

const st = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fffcf8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ebe4db",
    padding: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1
  },
  cardCompact: {
    padding: 8,
    marginBottom: 6
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
    backgroundColor: "#f0e8de"
  },
  thumbImg: {
    width: 48,
    height: 48
  },
  thumbFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  thumbLetter: {
    fontSize: 18,
    fontWeight: "800"
  },
  body: {
    flex: 1
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2c1810"
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    gap: 6
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 5
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700"
  },
  district: {
    fontSize: 10.5,
    color: "#9a8a7a"
  },
  summary: {
    fontSize: 12,
    lineHeight: 17,
    color: "#7a6b60",
    marginTop: 4
  },
  favBtn: {
    padding: 6,
    marginLeft: 4
  },
  favIcon: {
    fontSize: 18,
    color: "#c5b8a8"
  }
});
