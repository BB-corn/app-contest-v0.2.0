import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Landmark } from "../data/landmarks";
import { useAppState } from "../context/AppStateContext";
import { colors } from "../theme/colors";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHEET_HEIGHT = 400;

interface Props {
  landmark: Landmark | null;
  onClose: () => void;
  onViewDetail?: (id: string) => void;
}

export function SpotBottomSheet({ landmark, onClose, onViewDetail }: Props) {
  const { isFavorite, toggleFavorite, addRecent } = useAppState();
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  useEffect(() => {
    if (landmark) {
      addRecent(landmark.id);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SHEET_HEIGHT,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  }, [landmark]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 5,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          translateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 80 || gesture.vy > 0.5) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 65,
            friction: 11
          }).start();
        }
      }
    })
  ).current;

  if (!landmark) return null;

  const fav = isFavorite(landmark.id);

  return (
    <Animated.View
      style={[styles.sheet, { transform: [{ translateY }] }]}
      {...panResponder.panHandlers}
    >
      {/* 拖拽条 */}
      <View style={styles.handleBar} />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* 标题行 */}
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{landmark.name}</Text>
            <Text style={styles.meta}>
              {landmark.dynasty} · {landmark.category} · {landmark.district}
            </Text>
          </View>
          <Pressable
            style={styles.favBtn}
            onPress={() => toggleFavorite(landmark.id)}
            hitSlop={8}
          >
            <Text style={[styles.favIcon, fav && styles.favIconActive]}>
              {fav ? "♥" : "♡"}
            </Text>
          </Pressable>
        </View>

        {/* 封面图 */}
        {landmark.cover ? (
          <View style={styles.coverWrap}>
            <Image
              source={{ uri: landmark.cover }}
              style={styles.coverImg}
              resizeMode="cover"
            />
          </View>
        ) : null}

        {/* 标签 */}
        <View style={styles.tagsRow}>
          {landmark.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* 简介 */}
        <Text style={styles.summary}>{landmark.summary}</Text>

        {/* 详细介绍按钮 */}
        {onViewDetail && (
          <Pressable
            style={styles.detailBtn}
            onPress={() => onViewDetail(landmark.id)}
          >
            <Text style={styles.detailBtnText}>详细介绍 →</Text>
          </Pressable>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 10,
    elevation: 10,
    zIndex: 20
  },
  handleBar: {
    alignSelf: "center",
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginTop: 10,
    marginBottom: 6
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 18
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2
  },
  favBtn: {
    padding: 4,
    marginLeft: 8,
    marginTop: 2
  },
  favIcon: {
    fontSize: 22,
    color: "#c5b8a8"
  },
  favIconActive: {
    color: "#8B2500"
  },
  coverWrap: {
    marginTop: 10,
    borderRadius: 12,
    overflow: "hidden",
    height: 120,
    backgroundColor: "#f0e8de"
  },
  coverImg: {
    width: "100%",
    height: 120
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 6
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#f0e6d6"
  },
  tagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600"
  },
  summary: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textPrimary
  },
  detailBtn: {
    marginTop: 14,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0d6ca",
    backgroundColor: "rgba(255,252,248,0.95)",
    alignSelf: "flex-start"
  },
  detailBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#8B2500"
  }
});
