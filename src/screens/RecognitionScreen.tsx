import { useCallback, useState, useRef } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { landmarks, Landmark, LandmarkCategory } from "../data/landmarks";
import { LandmarkCard } from "../components/LandmarkCard";

const TYPES: {
  type: LandmarkCategory;
  label: string;
  desc: string;
}[] = [
  { type: "宫殿", label: "宫殿建筑", desc: "检测到重檐庑殿顶、琉璃瓦、汉白玉台基等皇家宫殿建筑特征。" },
  { type: "坛庙", label: "坛庙建筑", desc: "检测到祭祀建筑特征：圆形穹顶、祭坛基座等元素。" },
  { type: "园林", label: "园林建筑", desc: "检测到亭台楼阁、假山水榭等传统园林建筑元素。" },
  { type: "城门", label: "城门城楼", desc: "检测到城楼、箭楼、城墙等古代防御性建筑特征。" },
  { type: "寺庙", label: "寺庙建筑", desc: "检测到佛塔、大殿、山门等宗教建筑特征。" },
  { type: "历史街区", label: "传统民居", desc: "检测到四合院、胡同、灰砖墙等北京传统民居特征。" },
  { type: "古迹", label: "历史遗迹", desc: "检测到残存的历史建筑遗址特征。" }
];

const CAT_COLORS: Record<string, string> = {
  宫殿: "#8B2500", 坛庙: "#9C7A30", 园林: "#2D6A4F", 城门: "#5B3A6B",
  寺庙: "#B8602A", 历史街区: "#2C5F7C", 古迹: "#6B6B6B"
};

interface Result {
  label: string;
  category: LandmarkCategory;
  desc: string;
  confidence: number;
  related: Landmark[];
}

function mockRecognize(): Result {
  const t = TYPES[Math.floor(Math.random() * TYPES.length)];
  const related = landmarks.filter((l) => l.category === t.type).slice(0, 3);
  return {
    label: t.label,
    category: t.type,
    desc: t.desc,
    confidence: 0.6 + Math.random() * 0.35,
    related: related.length ? related : landmarks.slice(0, 3)
  };
}

export function RecognitionScreen() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<any>();
  const [uri, setUri] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const run = useCallback(async (imgUri: string) => {
    setLoading(true);
    setErr(null);
    setUri(imgUri);
    setResult(null);
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
    try {
      setResult(mockRecognize());
    } catch {
      setErr("识别失败，请重试");
    } finally {
      setLoading(false);
    }
  }, []);
  // Web: 使用隐藏的 <input type="file"> 来打开相册 / 摄像头（capture）
  const webFileInputRef = useRef<HTMLInputElement | null>(null);
  const webCameraInputRef = useRef<HTMLInputElement | null>(null);

  async function pickImage() {
    setErr(null);
    if (Platform.OS === 'web') {
      if (!webFileInputRef.current) {
        const inp = document.createElement('input');
        inp.type = 'file';
        inp.accept = 'image/*';
        inp.style.display = 'none';
        inp.onchange = (ev: Event) => {
          const f = (ev.target as HTMLInputElement).files?.[0];
          if (f) {
            const url = URL.createObjectURL(f);
            run(url);
          }
          // 清理
          (ev.target as HTMLInputElement).value = '';
        };
        document.body.appendChild(inp);
        webFileInputRef.current = inp;
      }
      webFileInputRef.current.click();
      return;
    }

    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { setErr("未获得相册权限"); return; }
    const r = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8
    } as any);
    if (!r.canceled && r.assets?.[0]?.uri) await run(r.assets[0].uri);
  }

  async function takePhoto() {
    setErr(null);
    if (Platform.OS === 'web') {
      // 首先尝试使用 MediaDevices API 直接打开相机并拍照（更可靠）
      try {
        const nav: any = navigator;
        if (nav.mediaDevices && nav.mediaDevices.getUserMedia) {
          const stream = await nav.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } } });
          const video = document.createElement('video');
          video.style.display = 'none';
          document.body.appendChild(video);
          video.srcObject = stream;
          await video.play();
          // 等待一帧渲染
          await new Promise((r) => requestAnimationFrame(r));
          const w = video.videoWidth || 1280;
          const h = video.videoHeight || 720;
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) ctx.drawImage(video, 0, 0, w, h);
          // 导出为 blob URL
          const blob: Blob | null = await new Promise((res) => canvas.toBlob((b) => res(b), 'image/jpeg', 0.85));
          // 停止摄像头
          stream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
          video.remove();
          if (blob) {
            const url = URL.createObjectURL(blob);
            await run(url);
            return;
          }
        }
      } catch (err) {
        // 若用户拒绝或设备不支持，则降级到 input[file] capture
        console.warn('getUserMedia 摄像头调用失败，降级到 file input：', err);
      }

      // 降级方案：使用带 capture 属性的 file input（某些移动浏览器会打开相机）
      if (!webCameraInputRef.current) {
        const inp = document.createElement('input');
        inp.type = 'file';
        inp.accept = 'image/*';
        inp.setAttribute('capture', 'environment');
        inp.style.display = 'none';
        inp.onchange = (ev: Event) => {
          const f = (ev.target as HTMLInputElement).files?.[0];
          if (f) {
            const url = URL.createObjectURL(f);
            run(url);
          }
          (ev.target as HTMLInputElement).value = '';
        };
        document.body.appendChild(inp);
        webCameraInputRef.current = inp;
      }
      webCameraInputRef.current.click();
      return;
    }

    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) { setErr("未获得相机权限"); return; }
    const r = await ImagePicker.launchCameraAsync({ quality: 0.8 } as any);
    if (!r.canceled && r.assets?.[0]?.uri) await run(r.assets[0].uri);
  }

  const goMap = useCallback(() => nav.navigate("Explore"), [nav]);

  const col = result ? (CAT_COLORS[result.category] ?? "#8B2500") : "#8B2500";

  return (
    <ScrollView
      style={[st.page, { paddingTop: insets.top }]}
      contentContainerStyle={st.content}
    >
      {/* 标题区 */}
      <Text style={st.title}>古建识别</Text>
      <Text style={st.subtitle}>
        选择一张建筑照片，识别建筑类型并推荐相关北京古建景点
      </Text>

      {/* 空状态 / 预览 */}
      {!uri && !loading && (
        <View style={st.uploadArea}>
          <View style={st.uploadIcon}>
            <Text style={st.uploadIconText}>+</Text>
          </View>
          <Text style={st.uploadHint}>选择或拍摄建筑照片</Text>
        </View>
      )}

      {uri && (
        <View style={st.previewWrap}>
          <Image source={{ uri }} style={st.previewImg} resizeMode="cover" />
          {loading && (
            <View style={st.previewOverlay}>
              <ActivityIndicator color="#fff" size="large" />
              <Text style={st.previewLoading}>分析建筑特征…</Text>
            </View>
          )}
        </View>
      )}

      {/* 按钮 */}
      <View style={st.btns}>
        <Pressable style={st.btnPrimary} onPress={pickImage} disabled={loading}>
          <Text style={st.btnPrimaryText}>选择照片</Text>
        </Pressable>
        <Pressable style={st.btnSecondary} onPress={takePhoto} disabled={loading}>
          <Text style={st.btnSecondaryText}>拍照</Text>
        </Pressable>
      </View>

      {err && (
        <View style={st.errCard}>
          <Text style={st.errText}>{err}</Text>
        </View>
      )}

      {/* 结果 */}
      {result && (
        <>
          <View style={st.resultCard}>
            <View style={st.resultHeader}>
              <View style={[st.resultBadge, { backgroundColor: col + "18" }]}>
                <Text style={[st.resultBadgeText, { color: col }]}>
                  {result.label}
                </Text>
              </View>
              <Text style={st.resultConf}>
                {(result.confidence * 100).toFixed(0)}%
              </Text>
            </View>
            <Text style={st.resultDesc}>{result.desc}</Text>
          </View>

          <Text style={st.sectionTitle}>相关景点</Text>
          {result.related.map((l) => (
            <LandmarkCard key={l.id} landmark={l} compact onPress={goMap} />
          ))}

          <Pressable style={st.mapBtn} onPress={goMap}>
            <Text style={st.mapBtnText}>在地图上查看</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const st = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#faf8f5" },
  content: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 22, fontWeight: "800", color: "#2c1810", letterSpacing: 0.5
  },
  subtitle: {
    marginTop: 4, fontSize: 13, lineHeight: 19, color: "#9a8a7a"
  },

  uploadArea: {
    marginTop: 20, height: 200, borderRadius: 14,
    borderWidth: 2, borderColor: "#e0d6ca", borderStyle: "dashed",
    backgroundColor: "#f5f0ea", alignItems: "center", justifyContent: "center"
  },
  uploadIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: "#e0d6ca", alignItems: "center", justifyContent: "center"
  },
  uploadIconText: { fontSize: 24, color: "#8a7a6a", fontWeight: "300" },
  uploadHint: { marginTop: 10, fontSize: 13, color: "#9a8a7a" },

  previewWrap: {
    marginTop: 16, borderRadius: 14, overflow: "hidden",
    backgroundColor: "#e8e0d4"
  },
  previewImg: { width: "100%", aspectRatio: 1.4 },
  previewOverlay: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(44,24,16,0.45)",
    alignItems: "center", justifyContent: "center"
  },
  previewLoading: { color: "#fff", fontSize: 13, marginTop: 8, fontWeight: "600" },

  btns: { marginTop: 14, flexDirection: "row", gap: 10 },
  btnPrimary: {
    flex: 1, borderRadius: 10, backgroundColor: "#8B2500",
    paddingVertical: 12, alignItems: "center"
  },
  btnPrimaryText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  btnSecondary: {
    flex: 1, borderRadius: 10, borderWidth: 1, borderColor: "#e0d6ca",
    backgroundColor: "#fffcf8", paddingVertical: 12, alignItems: "center"
  },
  btnSecondaryText: { color: "#2c1810", fontSize: 14, fontWeight: "600" },

  errCard: {
    marginTop: 12, borderRadius: 10, backgroundColor: "#fff3f3",
    borderWidth: 1, borderColor: "#e8b0b0", padding: 12
  },
  errText: { fontSize: 12, color: "#9f1d2f" },

  resultCard: {
    marginTop: 18, borderRadius: 12, backgroundColor: "#fffcf8",
    borderWidth: 1, borderColor: "#ebe4db", padding: 16
  },
  resultHeader: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between"
  },
  resultBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  resultBadgeText: { fontSize: 14, fontWeight: "800" },
  resultConf: { fontSize: 13, fontWeight: "700", color: "#9C7A30" },
  resultDesc: { marginTop: 8, fontSize: 13, lineHeight: 20, color: "#5a4a3a" },

  sectionTitle: {
    fontSize: 15, fontWeight: "700", color: "#2c1810",
    marginTop: 20, marginBottom: 8
  },

  mapBtn: {
    marginTop: 14, backgroundColor: "#8B2500", borderRadius: 10,
    paddingVertical: 13, alignItems: "center"
  },
  mapBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" }
});
