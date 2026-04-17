import { useCallback, useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";

export function WelcomeScreen() {
  const nav = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const btnFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: false,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(btnFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, btnFade]);

  const enter = useCallback(() => {
    nav.reset({ index: 0, routes: [{ name: "Main" }] });
  }, [nav]);

  return (
    <View style={s.root}>
      {/* 主内容区 */}
      <Animated.View
        style={[
          s.center,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={s.logo}>
          <Text style={s.logoChar}>京</Text>
        </View>
        <Text style={s.brandName}>京迹</Text>
        <Text style={s.tagline}>探索北京千年古建遗韵</Text>

        <View style={s.divider} />

        <Text style={s.intro}>
          跨越唐、元、明、清的标志性古建遗产，{"\n"}
          以地图为线索，走进北京的历史脉络与建筑之美。
        </Text>

        <View style={s.featureRow}>
          <View style={s.feature}>
            <View style={s.featureIcon}>
              <Text style={s.featureIconText}>探</Text>
            </View>
            <Text style={s.featureLabel}>地图导览</Text>
          </View>
          <View style={s.feature}>
            <View style={s.featureIcon}>
              <Text style={s.featureIconText}>识</Text>
            </View>
            <Text style={s.featureLabel}>古建识别</Text>
          </View>
          <View style={s.feature}>
            <View style={s.featureIcon}>
              <Text style={s.featureIconText}>藏</Text>
            </View>
            <Text style={s.featureLabel}>收藏足迹</Text>
          </View>
        </View>
      </Animated.View>

      {/* 底部 */}
      <Animated.View style={[s.bottom, { opacity: btnFade }]}>
        <Pressable style={s.enterBtn} onPress={enter}>
          <Text style={s.enterBtnText}>开始探索</Text>
        </Pressable>
        <Text style={s.version}>
          v1.0.0 · Expo · React Native · TypeScript
        </Text>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  center: {
    alignItems: "center",
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  logoChar: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
  },
  brandName: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: 4,
  },
  tagline: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
    letterSpacing: 1,
  },
  divider: {
    width: 40,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.primary + "30",
    marginVertical: 24,
  },
  intro: {
    fontSize: 13.5,
    lineHeight: 22,
    color: "#6a5a4a",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  featureRow: {
    flexDirection: "row",
    marginTop: 28,
    gap: 28,
  },
  feature: {
    alignItems: "center",
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primary + "10",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  featureIconText: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.primary,
  },
  featureLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  bottom: {
    position: "absolute",
    bottom: 48,
    left: 32,
    right: 32,
    alignItems: "center",
  },
  enterBtn: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  enterBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
  },
  version: {
    marginTop: 14,
    fontSize: 10.5,
    color: "#c5b8a8",
  },
});
