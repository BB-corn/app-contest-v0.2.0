/**
 * 京迹 · Web 版地图主页
 * 设计原则：地图绝对主角，默认探索，点击深入
 * Leaflet + CartoDB Voyager · 自定义 divIcon · Bottom Sheet
 */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getAllCategories,
  Landmark,
  LandmarkCategory,
  landmarks,
  searchLandmarks
} from "../data/landmarks";
import { Route, routes } from "../data/routes";
import { useAppState } from "../context/AppStateContext";
import { colors } from "../theme/colors";

/* ════════════════ 常量与工具 ════════════════ */

const categories = getAllCategories();

const CAT_COLORS: Record<string, string> = {
  宫殿: "#8B2500",
  坛庙: "#9C7A30",
  园林: "#2D6A4F",
  城门: "#5B3A6B",
  寺庙: "#B8602A",
  历史街区: "#2C5F7C",
  古迹: "#6B6B6B"
};
function catColor(c: string) {
  return CAT_COLORS[c] ?? "#8B2500";
}

const SHEET_FULL = 360;
const SHEET_PEEK = 88;
const ROUTE_GRADIENT_START = "#d4a017";
const ROUTE_GRADIENT_END = "#e67e22";
const ROUTE_OPACITY = 0.96;
const ROUTE_WEIGHT = 7;

/* ════════════════ Leaflet 加载 ════════════════ */

let _lp: Promise<any> | null = null;
function loadLeaflet(): Promise<any> {
  if (_lp) return _lp;
  _lp = new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && (window as any).L) {
      return resolve((window as any).L);
    }
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(css);
    const js = document.createElement("script");
    js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    js.onload = () => resolve((window as any).L);
    js.onerror = () => reject(new Error("Leaflet CDN error"));
    document.head.appendChild(js);
  });
  return _lp;
}

let _snakePluginPromise: Promise<boolean> | null = null;
function loadSnakeAnimPlugin(): Promise<boolean> {
  if (_snakePluginPromise) return _snakePluginPromise;

  _snakePluginPromise = new Promise((resolve) => {
    const L = (window as any).L;
    if (!L || typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (typeof L.Polyline?.prototype?.snakeIn === "function") {
      resolve(true);
      return;
    }
    if (document.getElementById("leaflet-snakeanim-js")) {
      const checkReady = () => {
        const ok = typeof (window as any).L?.Polyline?.prototype?.snakeIn === "function";
        resolve(ok);
      };
      setTimeout(checkReady, 0);
      return;
    }

    const js = document.createElement("script");
    js.id = "leaflet-snakeanim-js";
    js.src =
      "https://cdn.jsdelivr.net/gh/IvanSanchez/Leaflet.Polyline.SnakeAnim/L.Polyline.SnakeAnim.js";
    js.onload = () => {
      const ok = typeof (window as any).L?.Polyline?.prototype?.snakeIn === "function";
      if (!ok) {
        console.warn("动态路线：SnakeAnim 插件已加载，但未检测到 snakeIn 方法，将使用静态路线兜底");
      }
      resolve(ok);
    };
    js.onerror = () => {
      console.warn("动态路线：SnakeAnim 插件加载失败，将使用静态路线兜底");
      resolve(false);
    };
    document.head.appendChild(js);
  });

  return _snakePluginPromise;
}

/** 注入 marker 自定义样式 + 动画 */
function injectCSS() {
  if (document.getElementById("jingji-css")) return;
  const s = document.createElement("style");
  s.id = "jingji-css";
  s.textContent = `
    /* ── marker ── */
    .leaflet-div-icon{background:transparent!important;border:none!important}
    .jm-wrap{position:relative;width:36px;height:36px;transition:opacity .45s ease}
    .jm-dot{
      position:absolute;top:10px;left:10px;width:16px;height:16px;
      border-radius:50%;border:2.5px solid rgba(255,255,255,.92);
      box-shadow:0 1px 4px rgba(0,0,0,.25);cursor:pointer;
      transition:transform .22s ease,box-shadow .22s ease;
    }
    .jm-dot:hover{transform:scale(1.4);box-shadow:0 2px 12px rgba(0,0,0,.3)}
    .jm-dot.active{transform:scale(1.55);border-width:3px;box-shadow:0 0 0 5px rgba(139,37,0,.2),0 0 14px rgba(139,37,0,.12)}
    .jm-label{
      position:absolute;top:-4px;left:50%;transform:translateX(-50%);
      font-size:11px;font-weight:700;color:#2c1810;white-space:nowrap;
      background:rgba(255,255,255,.88);padding:1px 6px;border-radius:6px;
      box-shadow:0 1px 3px rgba(0,0,0,.1);pointer-events:none;opacity:0;
      transition:opacity .2s ease;
    }
    .jm-wrap:hover .jm-label,.jm-wrap.selected .jm-label{opacity:1}
    /* ── pulse ring ── */
    @keyframes jm-pulse{
      0%,100%{transform:scale(1);opacity:.55}
      60%{transform:scale(2.2);opacity:0}
    }
    .jm-ring{
      position:absolute;top:8px;left:8px;width:20px;height:20px;
      border-radius:50%;border:2px solid;pointer-events:none;
      animation:jm-pulse 1.8s ease-out infinite;
    }
    /* ── tooltip override ── */
    .leaflet-tooltip{
      background:rgba(255,255,255,.95)!important;border:1px solid #e0d6ca!important;
      border-radius:8px!important;padding:3px 8px!important;font-size:12px!important;
      font-weight:600!important;color:#2c1810!important;box-shadow:0 2px 8px rgba(0,0,0,.1)!important;
    }
    .leaflet-tooltip-top::before{border-top-color:#e0d6ca!important}
    /* ── zoom control ── */
    .leaflet-control-zoom a{
      background:rgba(255,255,255,.9)!important;color:#5a4a3a!important;
      border:1px solid #e0d6ca!important;border-radius:8px!important;
      width:32px!important;height:32px!important;line-height:32px!important;
      font-size:16px!important;
    }
    .leaflet-control-zoom{border:none!important;box-shadow:0 2px 8px rgba(0,0,0,.08)!important}
    /* ── 底图暖化 · 赋予"古纸"气质 ── */
    .leaflet-tile-pane{filter:sepia(0.12) brightness(1.01) saturate(1.08) hue-rotate(-3deg)}
    /* ── 动态路线 ── */
    @keyframes jm-route-glow{
      0%,100%{opacity:.92;filter:drop-shadow(0 0 4px rgba(212,160,23,.35)) drop-shadow(0 0 7px rgba(230,126,34,.22))}
      50%{opacity:1;filter:drop-shadow(0 0 6px rgba(212,160,23,.45)) drop-shadow(0 0 11px rgba(230,126,34,.32))}
    }
    .jm-route-line{
      animation:jm-route-glow 1.8s ease-in-out infinite;
      transform-origin:center;
      stroke-linecap:round;
      stroke-linejoin:round;
      pointer-events:none;
    }
    /* ── 导航箭头 ── */
    .nav-arrow{background:transparent!important;border:none!important}
.nav-arrow-inner{
  width:36px;height:36px;
  background:linear-gradient(160deg,#c8920f,#d4611a);
  border:3px solid rgba(255,255,255,.95);
  border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 16px rgba(0,0,0,.45), 0 0 0 2px rgba(212,160,23,.3);
  transition:transform .06s linear;
}
.nav-arrow-inner svg{
  display:block;
  filter:drop-shadow(0 1px 2px rgba(0,0,0,.3));
}
@keyframes nav-pulse{
  0%,100%{box-shadow:0 4px 16px rgba(0,0,0,.45),0 0 0 2px rgba(212,160,23,.3)}
  50%{box-shadow:0 4px 16px rgba(0,0,0,.45),0 0 0 8px rgba(212,160,23,.15),0 0 20px rgba(212,160,23,.2)}
}
.nav-arrow-inner.moving{animation:nav-pulse 1.2s ease-in-out infinite}
  `;
  document.head.appendChild(s);
}

function hexToRgb(hex: string) {
  const v = hex.replace("#", "");
  const norm = v.length === 3 ? v.split("").map((x) => x + x).join("") : v;
  const n = Number.parseInt(norm, 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255
  };
}

function mixColor(startHex: string, endHex: string, t: number) {
  const clamped = Math.max(0, Math.min(1, t));
  const start = hexToRgb(startHex);
  const end = hexToRgb(endHex);
  const r = Math.round(start.r + (end.r - start.r) * clamped);
  const g = Math.round(start.g + (end.g - start.g) * clamped);
  const b = Math.round(start.b + (end.b - start.b) * clamped);
  // return `rgb(${r}, ${g}, ${b})`;
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function splitRouteSegments(coords: Array<[number, number]>) {
  if (coords.length <= 1) return [];
  if (coords.length === 2) {
    const [start, end] = coords;
    const mid: [number, number] = [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2
    ];
    return [
      { start, end: mid, ratio: 0 },
      { start: mid, end, ratio: 1 }
    ];
  }
  return coords.slice(0, -1).map((start, idx) => ({
    start,
    end: coords[idx + 1],
    ratio: idx / (coords.length - 2)
  }));
}

function computeRouteSnakeSpeed(
  map: {
    project: (latlng: [number, number], zoom: number) => { x: number; y: number };
    getBoundsZoom?: (bounds: unknown) => number;
    getZoom?: () => number;
  } | null,
  coords: Array<[number, number]>
) {
  if (!map || coords.length <= 1) return 220;
  const L = (window as any).L;
  const bounds = L?.latLngBounds ? L.latLngBounds(coords) : null;
  const fitZoom = bounds && typeof map.getBoundsZoom === "function"
    ? map.getBoundsZoom(bounds)
    : map.getZoom?.() ?? 12;
  const targetZoom = Math.min(15, fitZoom);
  let pixelLength = 0;
  for (let i = 0; i < coords.length - 1; i += 1) {
    const p0 = map.project(coords[i], targetZoom);
    const p1 = map.project(coords[i + 1], targetZoom);
    pixelLength += Math.hypot(p1.x - p0.x, p1.y - p0.y);
  }
  if (!Number.isFinite(pixelLength) || pixelLength <= 0) return 220;
  // 目标时长约 2~3 秒，取 2.4 秒并做上下限钳制
  const speed = pixelLength / 2.4;
  return Math.max(160, Math.min(520, speed));
}

/* ════════════════ 高德导航辅助函数 ════════════════ */

/** 计算两点之间的距离（公里），Haversine 公式 */
function getDistance(p1: [number, number], p2: [number, number]): number {
  const R = 6371;
  const dLat = ((p2[0] - p1[0]) * Math.PI) / 180;
  const dLng = ((p2[1] - p1[1]) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((p1[0] * Math.PI) / 180) *
      Math.cos((p2[0] * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** 平滑路径兜底（当高德 API 不可用时） */
function smoothPathFallback(
  coords: [number, number][],
  segmentSteps: number = 50
): [number, number][] {
  if (coords.length < 2) return coords;
  const result: [number, number][] = [];
  for (let i = 0; i < coords.length - 1; i++) {
    const [lat1, lng1] = coords[i];
    const [lat2, lng2] = coords[i + 1];
    for (let t = 0; t < 1; t += 1 / segmentSteps) {
      const lat = lat1 + (lat2 - lat1) * t;
      const lng = lng1 + (lng2 - lng1) * t;
      const noise = Math.sin(t * Math.PI) * 0.0002;
      result.push([lat + noise, lng + noise]);
    }
  }
  result.push(coords[coords.length - 1]);
  return result;
}

/* ── WGS-84 ↔ GCJ-02 坐标转换（高德 API 使用 GCJ-02） ── */

const GCJ_A = 6378245.0;
const GCJ_EE = 0.00669342162296594323;

function _tLat(x: number, y: number): number {
  let r = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  r += ((20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2) / 3;
  r += ((20 * Math.sin(y * Math.PI) + 40 * Math.sin((y / 3) * Math.PI)) * 2) / 3;
  r += ((160 * Math.sin((y / 12) * Math.PI) + 320 * Math.sin((y * Math.PI) / 30)) * 2) / 3;
  return r;
}

function _tLng(x: number, y: number): number {
  let r = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  r += ((20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2) / 3;
  r += ((20 * Math.sin(x * Math.PI) + 40 * Math.sin((x / 3) * Math.PI)) * 2) / 3;
  r += ((150 * Math.sin((x / 12) * Math.PI) + 300 * Math.sin((x / 30) * Math.PI)) * 2) / 3;
  return r;
}

function wgs84ToGcj02(lat: number, lng: number): [number, number] {
  let dLa = _tLat(lng - 105, lat - 35);
  let dLo = _tLng(lng - 105, lat - 35);
  const radLat = (lat / 180) * Math.PI;
  let magic = Math.sin(radLat);
  magic = 1 - GCJ_EE * magic * magic;
  const sq = Math.sqrt(magic);
  dLa = (dLa * 180) / (((GCJ_A * (1 - GCJ_EE)) / (magic * sq)) * Math.PI);
  dLo = (dLo * 180) / ((GCJ_A / sq) * Math.cos(radLat) * Math.PI);
  return [lat + dLa, lng + dLo];
}

function gcj02ToWgs84(lat: number, lng: number): [number, number] {
  const [mLat, mLng] = wgs84ToGcj02(lat, lng);
  return [lat * 2 - mLat, lng * 2 - mLng];
}

/** 解析高德 API 返回的坐标串（"lng,lat;lng,lat;..."） */
function parseAmapPolyline(polylineStr: string): [number, number][] {
  return polylineStr
    .split(';')
    .map((pair) => {
      const parts = pair.split(',');
      if (parts.length < 2) return null;
      const lng = Number(parts[0]);
      const lat = Number(parts[1]);
      if (isNaN(lat) || isNaN(lng)) return null;
      return [lat, lng] as [number, number];
    })
    .filter((p): p is [number, number] => p !== null);
}

/** 调用高德步行路径规划 API，逐段并行请求后合并，返回 WGS-84 坐标 */
async function fetchWalkingRoute(
  coords: [number, number][]
): Promise<[number, number][] | null> {
  if (coords.length < 2) return null;
  const key = process.env.EXPO_PUBLIC_AMAP_WEB_KEY;
  if (!key) {
    console.warn('高德路径规划：未配置 AMAP_WEB_KEY');
    return null;
  }

  const segFetches = coords.slice(0, -1).map(async (origin, i) => {
    const dest = coords[i + 1];
    const oG = wgs84ToGcj02(origin[0], origin[1]);
    const dG = wgs84ToGcj02(dest[0], dest[1]);
    const url =
      `https://restapi.amap.com/v3/direction/walking?key=${key}` +
      `&origin=${oG[1].toFixed(6)},${oG[0].toFixed(6)}` +
      `&destination=${dG[1].toFixed(6)},${dG[0].toFixed(6)}`;
    try {
      const res = await Promise.race([
        fetch(url),
        new Promise<never>((_, rej) =>
          setTimeout(() => rej(new Error('timeout')), 6000)
        )
      ]);
      const data = await res.json();
      if (data.status !== '1' || !data.route?.paths?.[0]?.steps) {
        console.warn(`高德步行规划段 ${i} 失败:`, data.info);
        return null;
      }
      const pts: [number, number][] = [];
      (data.route.paths[0].steps as { polyline: string }[]).forEach(
        (step, si) => {
          const sp = parseAmapPolyline(step.polyline).map((p) =>
            gcj02ToWgs84(p[0], p[1])
          );
          if (si > 0 && sp.length > 0 && pts.length > 0) sp.shift();
          pts.push(...sp);
        }
      );
      return pts;
    } catch (err) {
      console.error(`高德 API 段 ${i} 请求失败:`, err);
      return null;
    }
  });

  const segs = await Promise.all(segFetches);
  const all: [number, number][] = [];
  let ok = false;
  segs.forEach((seg, i) => {
    if (!seg || seg.length === 0) {
      // 该段 API 失败，用直线兜底
      if (all.length === 0) all.push(coords[i]);
      all.push(coords[i + 1]);
      return;
    }
    ok = true;
    if (
      all.length > 0 &&
      seg.length > 0 &&
      getDistance(all[all.length - 1], seg[0]) < 0.05
    ) {
      seg.shift();
    }
    all.push(...seg);
  });
  if (!ok) return null;
  return all.length > 5 ? all : null;
}

type RouteLayer = {
  addTo: (map: unknown) => unknown;
  getElement?: () => SVGPathElement | null;
  once?: (eventName: string, handler: () => void) => void;
  snakeIn?: () => void;
};

/* ═══════ 侧栏缩略图（含加载失败兜底） ═══════ */

function SidebarThumb({ uri, name, color }: { uri: string; name: string; color: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <View style={{ width: 36, height: 36, borderRadius: 6, backgroundColor: color + "18", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color, fontWeight: "700", fontSize: 13 }}>{name[0]}</Text>
      </View>
    );
  }
  return (
    <Image
      source={{ uri }}
      style={{ width: 36, height: 36, borderRadius: 6 } as any}
      resizeMode="cover"
      onError={() => setErr(true)}
    />
  );
}

/* ════════════════ 主组件 ════════════════ */

export function MapScreen() {
  const navigation = useNavigation<any>();
  const mapRef = useRef<any>(null);
  const markersRef = useRef<
    Map<string, { marker: any; category: string }>
  >(new Map());
  const routeLayersRef = useRef<RouteLayer[]>([]);
  const routeAnimTokenRef = useRef(0);
  // 导航模拟相关 refs
  const navigatingRef = useRef(false);
  const navMarkerRef = useRef<any>(null);
  const navFrameRef = useRef(0);
  const navRouteLayerRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapErr, setMapErr] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [selCat, setSelCat] = useState<LandmarkCategory | undefined>();
  const [selected, setSelected] = useState<Landmark | null>(null);
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const [navigating, setNavigating] = useState(false);
  const [navLoading, setNavLoading] = useState(false);
  const [navInfo, setNavInfo] = useState<{ name: string; progress: number } | null>(null);
  const [imgFailed, setImgFailed] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(12);

  const [sheetMode, setSheetMode] = useState<'hidden' | 'peek' | 'full'>('hidden');
  const sheetAnim = useRef(new Animated.Value(SHEET_FULL)).current;
  const sidebarOpacity = useRef(new Animated.Value(0)).current;
  const loadingPulse = useRef(new Animated.Value(1)).current;
  const { isFavorite, toggleFavorite, addRecent } = useAppState();

  const filtered = useMemo(
    () => searchLandmarks(query, selCat),
    [query, selCat]
  );
  const filteredIds = useMemo(
    () => new Set(filtered.map((l) => l.id)),
    [filtered]
  );

  /* ── sidebar 入场 ── */
  useEffect(() => {
    Animated.timing(sidebarOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, [sidebarOpacity]);

  /* ── Bottom Sheet 模式控制 ── */
  useEffect(() => {
    if (selected) {
      setImgFailed(false);
      setSheetMode('peek');
    } else {
      setSheetMode('hidden');
    }
  }, [selected]);

  useEffect(() => {
    const target =
      sheetMode === 'full' ? 0 :
      sheetMode === 'peek' ? SHEET_FULL - SHEET_PEEK :
      SHEET_FULL;
    Animated.spring(sheetAnim, {
      toValue: target,
      useNativeDriver: false,
      friction: 12,
      tension: 55
    }).start();
  }, [sheetMode, sheetAnim]);

  /* ── Loading 呼吸动画 ── */
  useEffect(() => {
    if (!mapReady) {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(loadingPulse, { toValue: 1.08, duration: 900, useNativeDriver: false }),
          Animated.timing(loadingPulse, { toValue: 1, duration: 900, useNativeDriver: false }),
        ])
      );
      anim.start();
      return () => anim.stop();
    }
  }, [mapReady, loadingPulse]);

  /* ── 初始化 Leaflet 地图 ── */
  useEffect(() => {
    let dead = false;
    loadLeaflet()
      .then((L) => {
        if (dead) return;
        injectCSS();
        const el = document.getElementById("jingji-map");
        if (!el) return;

        const map = L.map(el, {
          center: [39.916, 116.390],
          zoom: 12,
          zoomControl: false,
          attributionControl: false
        });
        L.control.zoom({ position: "bottomright" }).addTo(map);
        L.control
          .attribution({ position: "bottomright", prefix: false })
          .addAttribution(
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &middot; CartoDB'
          )
          .addTo(map);

        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          { maxZoom: 19, subdomains: "abcd" }
        ).addTo(map);

        const mMap = new Map<string, { marker: any; category: string }>();
        landmarks.forEach((l) => {
          const col = catColor(l.category);
          const icon = L.divIcon({
            className: "",
            html: `<div class="jm-wrap" data-id="${l.id}">
                     <div class="jm-dot" style="background:${col}"></div>
                     <div class="jm-label">${l.name}</div>
                   </div>`,
            iconSize: [36, 36],
            iconAnchor: [18, 18]
          });
          const marker = L.marker([l.latitude, l.longitude], {
            icon,
            zIndexOffset: l.priority === 1 ? 100 : 0
          }).addTo(map);

          marker.on("click", () => {
            window.dispatchEvent(
              new CustomEvent("jingji-select", { detail: l.id })
            );
          });
          mMap.set(l.id, { marker, category: l.category });
        });

        map.on("click", () => {
          window.dispatchEvent(new CustomEvent("jingji-deselect"));
        });
        map.on("zoomend", () => {
          window.dispatchEvent(
            new CustomEvent("jingji-zoom", { detail: map.getZoom() })
          );
        });

        mapRef.current = map;
        markersRef.current = mMap;
        setMapReady(true);
        // 地图初始化后预加载动态路线插件，失败时走静态路线兜底
        void loadSnakeAnimPlugin();
      })
      .catch(() => {
        if (!dead) setMapErr("地图加载失败，请检查网络");
      });
    return () => {
      dead = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  /* ── marker 选择事件 ── */
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent).detail;
      const lm = landmarks.find((l) => l.id === id);
      if (lm) {
        setSelected(lm);
        addRecent(lm.id);
      }
    };
    const onDeselect = () => setSelected(null);
    window.addEventListener("jingji-select", onSelect);
    window.addEventListener("jingji-deselect", onDeselect);
    return () => {
      window.removeEventListener("jingji-select", onSelect);
      window.removeEventListener("jingji-deselect", onDeselect);
    };
  }, [addRecent]);

  /* ── 地图缩放级别 ── */
  useEffect(() => {
    const onZoom = (e: Event) =>
      setCurrentZoom(Math.round((e as CustomEvent).detail));
    window.addEventListener("jingji-zoom", onZoom);
    return () => window.removeEventListener("jingji-zoom", onZoom);
  }, []);

  /* ── 缩放 + 筛选 → marker 可见性 ── */
  useEffect(() => {
    markersRef.current.forEach((data, id) => {
      const el = data.marker.getElement();
      if (!el) return;
      const wrap = el.querySelector(".jm-wrap") as HTMLElement | null;
      if (!wrap) return;
      const lm = landmarks.find((l) => l.id === id);
      const zoomOk = lm ? currentZoom >= lm.zoomThreshold : true;
      const filterOk = filteredIds.has(id);
      if (zoomOk && filterOk) {
        wrap.style.opacity = "1";
        wrap.style.pointerEvents = "auto";
      } else if (zoomOk && !filterOk) {
        wrap.style.opacity = "0.12";
        wrap.style.pointerEvents = "none";
      } else {
        wrap.style.opacity = "0";
        wrap.style.pointerEvents = "none";
      }
    });
  }, [filteredIds, currentZoom]);

  /* ── 选中态视觉 ── */
  const applySelection = useCallback((activeId: string | null) => {
    markersRef.current.forEach((data, id) => {
      const el = data.marker.getElement();
      if (!el) return;
      const wrap = el.querySelector(".jm-wrap") as HTMLElement | null;
      const dot = el.querySelector(".jm-dot") as HTMLElement | null;
      const oldRing = el.querySelector(".jm-ring");
      if (id === activeId) {
        wrap?.classList.add("selected");
        dot?.classList.add("active");
        if (!oldRing) {
          const ring = document.createElement("div");
          ring.className = "jm-ring";
          ring.style.borderColor = catColor(data.category);
          wrap?.appendChild(ring);
        }
        data.marker.setZIndexOffset(2000);
      } else {
        wrap?.classList.remove("selected");
        dot?.classList.remove("active");
        oldRing?.remove();
        data.marker.setZIndexOffset(0);
      }
    });
  }, []);

  useEffect(() => {
    applySelection(selected?.id ?? null);
  }, [selected, applySelection]);

  // 清除当前路线图层（含动画中断）
  const clearRouteLayers = useCallback(() => {
    routeAnimTokenRef.current += 1;
    routeLayersRef.current.forEach((layer) => {
      const l = layer as { remove?: () => void };
      l.remove?.();
    });
    routeLayersRef.current = [];
  }, []);

  // 创建路线渐变线段
  const createRouteLayerSet = useCallback((route: Route) => {
    const L = (window as any).L;
    const map = mapRef.current;
    if (!L || !map) return [];
    const snakingSpeed = computeRouteSnakeSpeed(map, route.coordinates);

    const segments = splitRouteSegments(route.coordinates);
    const layers: RouteLayer[] = segments.map((segment) => {
      const color = mixColor(ROUTE_GRADIENT_START, ROUTE_GRADIENT_END, segment.ratio);
      return L.polyline([segment.start, segment.end], {
        color,
        weight: ROUTE_WEIGHT,
        opacity: ROUTE_OPACITY,
        lineCap: "round",
        lineJoin: "round",
        // SnakeAnim 使用该速度（像素/秒）
        snakingSpeed,
        interactive: false
      }) as RouteLayer;
    });
    return layers;
  }, []);

  // 给路线加微光呼吸效果
  const applyRouteGlow = useCallback((layers: RouteLayer[]) => {
    layers.forEach((layer) => {
      const pathEl = layer.getElement?.();
      if (pathEl) {
        pathEl.classList.add("jm-route-line");
      }
    });
  }, []);

  // 根据路线坐标飞行到合适视野
  const flyToRouteBounds = useCallback((route: Route) => {
    const L = (window as any).L;
    const map = mapRef.current;
    if (!L || !map || route.coordinates.length === 0) return;

    if (route.coordinates.length === 1) {
      map.flyTo(route.coordinates[0], 14, { duration: 0.8 });
      return;
    }

    const bounds = L.latLngBounds(route.coordinates);
    map.flyToBounds(bounds, {
      padding: [56, 56],
      maxZoom: 15,
      duration: 0.85
    });
  }, []);

  // 点击路线后，执行动态彩带动画；失败时静态兜底
  const playRouteAnimation = useCallback(
    async (route: Route) => {
      if (!mapRef.current) return;
      setSelected(null);
      setActiveRouteId(route.id);
      clearRouteLayers();
      flyToRouteBounds(route);

      const currentToken = routeAnimTokenRef.current;
      const layerSet = createRouteLayerSet(route);
      if (layerSet.length === 0) return;
      routeLayersRef.current = layerSet;

      const snakeReady = await loadSnakeAnimPlugin();
      if (routeAnimTokenRef.current !== currentToken) return;

      if (!snakeReady) {
        layerSet.forEach((layer) => {
          layer.addTo(mapRef.current);
        });
        applyRouteGlow(layerSet);
        return;
      }

      let cursor = 0;
      const playNext = () => {
        if (routeAnimTokenRef.current !== currentToken) return;
        const layer = layerSet[cursor];
        if (!layer) {
          applyRouteGlow(layerSet);
          return;
        }
        cursor += 1;
        layer.addTo(mapRef.current);
        if (typeof layer.once === "function" && typeof layer.snakeIn === "function") {
          layer.once("snakeend", playNext);
          layer.snakeIn();
          return;
        }
        // 插件状态异常时兜底为静态显示
        console.warn("动态路线：snakeIn 不可用，当前路线改为静态显示");
        for (let i = cursor; i < layerSet.length; i += 1) {
          layerSet[i].addTo(mapRef.current);
        }
        applyRouteGlow(layerSet);
      };
      playNext();
    },
    [applyRouteGlow, clearRouteLayers, createRouteLayerSet, flyToRouteBounds]
  );

  // 停止导航，恢复地图交互和 marker 可见性
  const stopNavigation = useCallback(() => {
    navigatingRef.current = false;
    setNavigating(false);
    setNavLoading(false);
    setNavInfo(null);
    cancelAnimationFrame(navFrameRef.current);

    const map = mapRef.current;
    if (map) {
      map.dragging.enable();
      map.touchZoom.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
    }

    if (navMarkerRef.current) {
      navMarkerRef.current.remove();
      navMarkerRef.current = null;
    }
    if (navRouteLayerRef.current) {
      navRouteLayerRef.current.remove();
      navRouteLayerRef.current = null;
    }

    // 恢复所有 marker 可见性
    markersRef.current.forEach((data) => {
      const el = data.marker.getElement();
      if (el) {
        const wrap = el.querySelector('.jm-wrap') as HTMLElement;
        if (wrap) {
          wrap.style.opacity = '1';
          wrap.style.pointerEvents = 'auto';
        }
      }
    });
  }, []);

  // 开始导航模拟：调高德 API 获取真实道路坐标，箭头沿道路行走
  const startNavigation = useCallback(
    async (route: Route) => {
      const map = mapRef.current;
      const L = (window as any).L;
      if (!map || !L) return;

      // 停止已有导航 / 路线动画
      stopNavigation();
      clearRouteLayers();

      setNavLoading(true);
      setActiveRouteId(route.id);
      setSelected(null);

      // 获取真实道路路径
      let roadCoords = await fetchWalkingRoute(route.coordinates);

      if (!roadCoords || roadCoords.length < 20) {
        console.log('高德规划不可用，使用平滑曲线兜底');
        roadCoords = smoothPathFallback(route.coordinates, 60);
      }

      // 检查组件 / 地图是否仍存在
      if (!mapRef.current) {
        setNavLoading(false);
        return;
      }

      setNavLoading(false);
      navigatingRef.current = true;
      setNavigating(true);

      // 绘制路线轨迹（虚线底色）
      const trailLine = L.polyline(roadCoords, {
        color: ROUTE_GRADIENT_START,
        weight: 5,
        opacity: 0.45,
        dashArray: '10, 8',
        lineCap: 'round',
        interactive: false
      }).addTo(map);
      navRouteLayerRef.current = trailLine;

      // 创建箭头 marker
      navMarkerRef.current = L.marker(roadCoords[0], {
        icon: L.divIcon({
          className: 'nav-arrow',
          // html: '<div class="nav-arrow-inner moving">▲</div>'
          html: `<div class="nav-arrow-inner moving">
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1L13 12.5L7 9.5L1 12.5Z" fill="white" stroke="rgba(255,255,255,0.6)" stroke-width="0.5"/>
  </svg>
</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        }),
        zIndexOffset: 9999
      }).addTo(map);

      // 飞到起点（街景级别）
      map.flyTo(roadCoords[0], 15, { duration: 0.8 });
      route.stops.forEach((st) => addRecent(st.landmarkId));

      // 等待 flyTo 完成
      await new Promise<void>((r) => setTimeout(r, 900));
      if (!navigatingRef.current) return;

      // 禁用地图交互
      map.dragging.disable();
      map.touchZoom.disable();
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();

      // 动画循环（基于时间而非帧数，保证流畅）
      const total = roadCoords.length;
      const duration = 6000;
      const startTime = performance.now();
      const path = roadCoords;

      const tick = () => {
        if (!navigatingRef.current) return;

        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const fi = progress * (total - 1);
        const i = Math.floor(fi);
        const t = fi - i;
        const ni = Math.min(i + 1, total - 1);
        const c = path[i];
        const n = path[ni];
        const lat = c[0] + (n[0] - c[0]) * t;
        const lng = c[1] + (n[1] - c[1]) * t;
        const pos: [number, number] = [lat, lng];

        // 更新箭头位置和朝向
        if (navMarkerRef.current) {
          navMarkerRef.current.setLatLng(pos);
          const angle =
            Math.atan2(n[1] - c[1], n[0] - c[0]) * (180 / Math.PI) - 90;
          const inner = navMarkerRef.current
            .getElement()
            ?.querySelector('.nav-arrow-inner') as HTMLElement | null;
          if (inner) inner.style.transform = `rotate(${angle}deg)`;
        }

        // 地图跟随（箭头始终居中）
        map.panTo(pos, { animate: false });

        // 检测附近重要景点（200m 内）
        const nearby = landmarks.find(
          (lm) =>
            lm.priority === 1 &&
            getDistance(pos, [lm.latitude, lm.longitude]) < 0.2
        );
        const pct = Math.round(progress * 100);
        setNavInfo({
          name: nearby ? `即将到达：${nearby.name}` : route.name,
          progress: pct
        });

        // 动态显示附近 marker（300m 内可见）
        markersRef.current.forEach((data, id) => {
          const lm = landmarks.find((l) => l.id === id);
          if (!lm) return;
          const d = getDistance(pos, [lm.latitude, lm.longitude]);
          const el = data.marker.getElement();
          if (el) {
            const wrap = el.querySelector('.jm-wrap') as HTMLElement;
            if (wrap) wrap.style.opacity = d < 0.3 ? '1' : '0.08';
          }
        });

        if (progress >= 1) {
          setNavInfo({ name: '已到达终点 🎉', progress: 100 });
          setTimeout(() => {
            if (navigatingRef.current) stopNavigation();
          }, 2000);
          return;
        }

        navFrameRef.current = requestAnimationFrame(tick);
      };

      navFrameRef.current = requestAnimationFrame(tick);
    },
    [addRecent, clearRouteLayers, stopNavigation]
  );

  /* ── 飞到景点 ── */
  const flyTo = useCallback(
    (l: Landmark) => {
      stopNavigation();
      setSelected(l);
      addRecent(l.id);
      setActiveRouteId(null);
      clearRouteLayers();
      if (mapRef.current) {
        mapRef.current.flyTo([l.latitude, l.longitude], 15, {
          duration: 0.8
        });
      }
    },
    [addRecent, clearRouteLayers, stopNavigation]
  );

  /* ── 回到全景 ── */
  const resetView = useCallback(() => {
    stopNavigation();
    if (mapRef.current) {
      mapRef.current.flyTo([39.916, 116.390], 12, { duration: 0.8 });
    }
    setActiveRouteId(null);
    clearRouteLayers();
    setSelected(null);
    setQuery("");
    setSelCat(undefined);
  }, [clearRouteLayers, stopNavigation]);

  /* ── 搜索/筛选时自动适配视野（地图"理解输入"） ── */
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    const L = (window as any).L;
    if (!L) return;
    // 只在筛选缩小结果且未选中单点时触发
    if (filtered.length > 0 && filtered.length < landmarks.length && !selected) {
      const bounds = L.latLngBounds(
        filtered.map((l: Landmark) => [l.latitude, l.longitude])
      );
      mapRef.current.flyToBounds(bounds, { padding: [50, 50], maxZoom: 15, duration: 0.6 });
    }
  }, [filtered, mapReady, selected]);

  /* ── 收藏动效 ── */
  const favScale = useRef(new Animated.Value(1)).current;
  const onFav = useCallback(
    (id: string) => {
      toggleFavorite(id);
      Animated.sequence([
        Animated.timing(favScale, {
          toValue: 1.3,
          duration: 120,
          useNativeDriver: false
        }),
        Animated.timing(favScale, {
          toValue: 1,
          duration: 180,
          useNativeDriver: false
        })
      ]).start();
    },
    [toggleFavorite, favScale]
  );

  /* ════════════════ 渲染 ════════════════ */

  return (
    <View style={s.root}>
      {/* ═══ 左侧栏 ═══ */}
      <Animated.View style={[s.sidebar, { opacity: sidebarOpacity }]}>
        {/* 品牌 */}
        <View style={s.brand}>
          <View style={s.logoMark}>
            <Text style={s.logoChar}>京</Text>
          </View>
          <View>
            <Text style={s.brandName}>京迹</Text>
            <Text style={s.brandSub}>北京古建地图导览</Text>
          </View>
        </View>

        {/* 搜索 */}
        <View style={s.searchRow}>
          <Text style={s.searchIcon}>⌕</Text>
          <TextInput
            style={s.searchInput}
            placeholder="搜索景点名称或朝代…"
            placeholderTextColor="#b5a898"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")} hitSlop={8}>
              <Text style={s.searchClear}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* 分类 */}
        <View style={s.chips}>
          <Pressable
            style={[s.chip, !selCat && s.chipOn]}
            onPress={() => setSelCat(undefined)}
          >
            <Text style={[s.chipText, !selCat && s.chipTextOn]}>全部</Text>
          </Pressable>
          {categories.map((c) => (
            <Pressable
              key={c}
              style={[s.chip, selCat === c && s.chipOn]}
              onPress={() => setSelCat(selCat === c ? undefined : c)}
            >
              <Text style={[s.chipText, selCat === c && s.chipTextOn]}>
                {c}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* 路线 + 景点列表 */}
        <ScrollView
          style={s.list}
          showsVerticalScrollIndicator={false}
        >
          <Text style={s.routeSectionTitle}>推荐路线</Text>
          {routes.map((route) => {
            const active = activeRouteId === route.id;
            return (
              <Pressable
                key={route.id}
                style={[
                  s.routeItem,
                  active && s.routeItemActive
                ]}
                onPress={() => !navigating && !navLoading && startNavigation(route)}
              >
                <View style={s.routeSwatch}>
                  <View style={s.routeSwatchStart} />
                  <View style={s.routeSwatchEnd} />
                </View>
                <View style={s.routeItemText}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[s.routeName, active && s.routeNameActive]} numberOfLines={1}>
                      {route.name}
                    </Text>
                    {navLoading && active && (
                      <Text style={{ fontSize: 11, color: colors.primary, marginLeft: 6 }}>规划中...</Text>
                    )}
                  </View>
                  <Text style={s.routeMeta} numberOfLines={1}>
                    {route.subtitle}
                  </Text>
                </View>
              </Pressable>
            );
          })}

          <View style={s.routeDivider} />
          <Text style={s.listCount}>
            {filtered.length} 个景点
            {filtered.length < landmarks.length
              ? ` / 共 ${landmarks.length}`
              : ""}
          </Text>

          {filtered.map((l) => {
            const active = selected?.id === l.id;
            return (
              <Pressable
                key={l.id}
                style={(state: any) => [
                  s.listItem,
                  state.hovered && !active && s.listItemHover,
                  active && s.listItemActive
                ]}
                onPress={() => flyTo(l)}
              >
                <SidebarThumb uri={l.cover} name={l.name} color={catColor(l.category)} />
                <View style={s.listText}>
                  <Text
                    style={[
                      s.listName,
                      active && { color: catColor(l.category) }
                    ]}
                    numberOfLines={1}
                  >
                    {l.name}
                  </Text>
                  <Text style={s.listMeta} numberOfLines={1}>
                    {l.dynasty} · {l.category} · {l.district}
                  </Text>
                </View>
              </Pressable>
            );
          })}
          <View style={{ height: 24 }} />
        </ScrollView>
      </Animated.View>

      {/* ═══ 地图区 ═══ */}
      <View style={s.mapArea}>
        <View nativeID="jingji-map" style={s.map} />

        {/* 加载 */}
        {!mapReady && (
          <View style={s.loadingOverlay}>
            <Animated.View style={[s.loadingBrand, { transform: [{ scale: loadingPulse }] }]}>
              <Text style={s.loadingBrandChar}>京</Text>
            </Animated.View>
            <Text style={s.loadingText}>
              {mapErr ?? "正在连接地图…"}
            </Text>
          </View>
        )}

        {/* 全景按钮 */}
        {mapReady && (
          <Pressable style={s.resetBtn} onPress={resetView}>
            <Text style={s.resetBtnText}>全景</Text>
          </Pressable>
        )}

        {/* ── 导航规划中提示 ── */}
        {navLoading && (
          <View style={s.navPanel}>
            <Text style={s.navTitle}>正在规划路线...</Text>
          </View>
        )}

        {/* ── 导航进度面板 ── */}
        {navigating && navInfo && (
          <View style={s.navPanel}>
            <Text style={s.navTitle} numberOfLines={1}>
              {navInfo.name}
            </Text>
            <View style={s.navProgressBg}>
              <View
                style={[
                  s.navProgressFill,
                  { width: `${navInfo.progress}%` as any }
                ]}
              />
            </View>
            <Text style={s.navPercent}>{navInfo.progress}%</Text>
            <Pressable style={s.navExit} onPress={stopNavigation}>
              <Text style={s.navExitText}>退出导航</Text>
            </Pressable>
          </View>
        )}

        {/* ── Bottom Sheet ── */}
        <Animated.View
          style={[
            s.sheet,
            { transform: [{ translateY: sheetAnim }] }
          ]}
        >
          {selected && (
            <>
              {/* 拖拽把手 */}
              <Pressable
                style={s.sheetHandle}
                onPress={() => setSheetMode(sheetMode === 'peek' ? 'full' : 'peek')}
              >
                <View style={s.sheetHandleBar} />
              </Pressable>

              {/* 关闭 */}
              <Pressable
                style={s.sheetClose}
                onPress={() => setSelected(null)}
              >
                <Text style={s.sheetCloseText}>✕</Text>
              </Pressable>

              {/* Peek 区：名称 + 朝代 + 类别 */}
              <Pressable
                style={s.sheetPeek}
                onPress={() => sheetMode === 'peek' && setSheetMode('full')}
              >
                <Text style={s.sheetName}>{selected.name}</Text>
                <View style={s.sheetMetaRow}>
                  <View
                    style={[
                      s.sheetBadge,
                      {
                        backgroundColor: catColor(selected.category) + "18",
                        borderColor: catColor(selected.category) + "40"
                      }
                    ]}
                  >
                    <Text
                      style={[
                        s.sheetBadgeText,
                        { color: catColor(selected.category) }
                      ]}
                    >
                      {selected.category}
                    </Text>
                  </View>
                  <Text style={s.sheetDistrict}>{selected.district}</Text>
                  <Text style={s.sheetDynasty}>
                    {selected.dynasty} · 始建{selected.builtYear}年
                  </Text>
                </View>
                {sheetMode === 'peek' && (
                  <Text style={s.sheetPeekHint}>↑ 点击查看详情</Text>
                )}
              </Pressable>

              {/* Full 区：图片 + 详情 */}
              {sheetMode === 'full' && (
                <View style={s.sheetBody}>
                  {/* 图片 */}
                  <View style={s.sheetImgWrap}>
                    {!imgFailed ? (
                      <Image
                        source={{ uri: selected.cover }}
                        style={s.sheetImg}
                        resizeMode="cover"
                        onError={() => setImgFailed(true)}
                      />
                    ) : (
                      <View
                        style={[
                          s.sheetImgFallback,
                          {
                            backgroundColor:
                              catColor(selected.category) + "18"
                          }
                        ]}
                      >
                        <Text style={s.sheetImgFallbackText}>
                          {selected.name[0]}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* 信息 */}
                  <View style={s.sheetInfo}>
                    <View style={s.sheetTags}>
                      {selected.tags.map((t) => (
                        <Text key={t} style={s.sheetTag}>
                          {t}
                        </Text>
                      ))}
                    </View>

                    <Text style={s.sheetSummary} numberOfLines={4}>
                      {selected.summary}
                    </Text>

                    {/* 收藏 */}
                    <Animated.View
                      style={{ transform: [{ scale: favScale }] }}
                    >
                      <Pressable
                        style={[
                          s.sheetFav,
                          isFavorite(selected.id) && s.sheetFavOn
                        ]}
                        onPress={() => onFav(selected.id)}
                      >
                        <Text
                          style={[
                            s.sheetFavText,
                            isFavorite(selected.id) && { color: "#fff" }
                          ]}
                        >
                          {isFavorite(selected.id)
                            ? "♥ 已收藏"
                            : "♡ 收藏"}
                        </Text>
                      </Pressable>
                    </Animated.View>

                    {/* 详细介绍按钮 */}
                    <Pressable
                      style={s.sheetDetailBtn}
                      onPress={() => navigation.navigate('LandmarkDetail', { landmarkId: selected.id })}
                    >
                      <Text style={s.sheetDetailBtnText}>详细介绍 →</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </>
          )}
        </Animated.View>
      </View>
    </View>
  );
}

/* ════════════════ 样式 ════════════════ */

const s = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.background
  },

  /* ── sidebar ── */
  sidebar: {
    width: 240,
    backgroundColor: "#fffcf8",
    borderRightWidth: 1,
    borderRightColor: "#ebe4db",
    paddingTop: 20,
    paddingHorizontal: 14
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18
  },
  logoMark: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#8B2500",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  logoChar: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800"
  },
  brandName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2c1810",
    letterSpacing: 1
  },
  brandSub: {
    fontSize: 9,
    color: "#9a8a7a",
    marginTop: 1,
    letterSpacing: 0.5
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f0ea",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 34,
    marginBottom: 12
  },
  searchIcon: {
    fontSize: 15,
    color: "#b0a090",
    marginRight: 6
  },
  searchInput: {
    flex: 1,
    fontSize: 12.5,
    color: "#2c1810"
  },
  searchClear: {
    fontSize: 12,
    color: "#b0a090",
    paddingLeft: 6
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 10
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: "#f5f0ea"
  },
  chipOn: {
    backgroundColor: "#8B2500"
  },
  chipText: {
    fontSize: 10.5,
    color: "#7a6b60",
    fontWeight: "600"
  },
  chipTextOn: {
    color: "#fff"
  },

  list: { flex: 1 },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    marginBottom: 1
  },
  listItemActive: {
    backgroundColor: "#f5ede2"
  },
  listItemHover: {
    backgroundColor: "#f8f3ed"
  },
  listThumb: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 9,
    backgroundColor: "#f0e8de"
  },
  listCount: {
    fontSize: 10,
    color: "#b0a090",
    marginBottom: 6,
    fontWeight: "600"
  },
  routeSectionTitle: {
    fontSize: 11,
    color: "#8a7a6a",
    fontWeight: "700",
    letterSpacing: 0.4,
    marginBottom: 6
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 9,
    marginBottom: 4,
    backgroundColor: "#fff9f2",
    borderWidth: 1,
    borderColor: "#efe4d6"
  },
  routeItemActive: {
    backgroundColor: "#fff2df",
    borderColor: "#e7c795"
  },
  routeSwatch: {
    width: 40,
    height: 6,
    borderRadius: 999,
    overflow: "hidden",
    flexDirection: "row",
    marginRight: 8
  },
  routeSwatchStart: {
    flex: 1,
    backgroundColor: ROUTE_GRADIENT_START
  },
  routeSwatchEnd: {
    flex: 1,
    backgroundColor: ROUTE_GRADIENT_END
  },
  routeItemText: {
    flex: 1
  },
  routeName: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#4b3727"
  },
  routeNameActive: {
    color: "#8B2500"
  },
  routeMeta: {
    fontSize: 10,
    color: "#9f8f80",
    marginTop: 1
  },
  routeDivider: {
    height: 1,
    backgroundColor: "#eee5da",
    marginVertical: 8
  },
  listText: { flex: 1 },
  listName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2c1810"
  },
  listMeta: {
    fontSize: 10,
    color: "#9a8a7a",
    marginTop: 1
  },

  /* ── map ── */
  mapArea: { flex: 1 },
  map: { flex: 1 },
  resetBtn: {
    position: "absolute",
    top: 14,
    left: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "rgba(255,252,248,0.92)",
    borderWidth: 1,
    borderColor: "#e0d6ca",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6
  },
  resetBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#5a4a3a"
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f5efe5",
    alignItems: "center",
    justifyContent: "center"
  },
  loadingBrand: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#8B2500",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14
  },
  loadingBrandChar: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800"
  },
  loadingText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8a7a6a"
  },

  /* ── Bottom Sheet ── */
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: SHEET_FULL,
    backgroundColor: "rgba(255,252,248,0.97)",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 16,
    elevation: 8
  },
  sheetHandle: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 4
  },
  sheetHandleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#d5ccc0"
  },
  sheetClose: {
    position: "absolute",
    top: 10,
    right: 14,
    zIndex: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    justifyContent: "center"
  },
  sheetCloseText: {
    fontSize: 13,
    color: "#8a7a6a",
    fontWeight: "600"
  },

  sheetPeek: {
    paddingHorizontal: 16,
    paddingBottom: 6
  },
  sheetPeekHint: {
    fontSize: 10,
    color: "#b0a090",
    marginTop: 6,
    textAlign: "center",
    letterSpacing: 0.5
  },
  sheetDynasty: {
    fontSize: 11,
    color: "#9C7A30",
    fontWeight: "600"
  },

  sheetBody: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 14
  },
  sheetImgWrap: {
    width: 200,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0e8de"
  },
  sheetImg: {
    width: 200,
    height: "100%" as any,
    borderRadius: 12
  },
  sheetImgFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12
  },
  sheetImgFallbackText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#b0a090"
  },

  sheetInfo: {
    flex: 1,
    paddingTop: 2
  },
  sheetName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2c1810",
    letterSpacing: 0.5
  },
  sheetMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 8
  },
  sheetBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1
  },
  sheetBadgeText: {
    fontSize: 11,
    fontWeight: "700"
  },
  sheetDistrict: {
    fontSize: 12,
    color: "#9a8a7a"
  },
  sheetTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 4
  },
  sheetTag: {
    fontSize: 10.5,
    color: "#7a6b60",
    backgroundColor: "#f0e8de",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: "hidden"
  },
  sheetSummary: {
    fontSize: 13,
    lineHeight: 20,
    color: "#4a3a2a",
    marginTop: 8
  },
  sheetFav: {
    marginTop: 10,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f0e8de",
    alignSelf: "flex-start"
  },
  sheetFavOn: {
    backgroundColor: "#8B2500"
  },
  sheetFavText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7a6b60"
  },
  sheetDetailBtn: {
    marginTop: 6,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0d6ca",
    backgroundColor: "rgba(255,252,248,0.9)",
    alignSelf: "flex-start"
  },
  sheetDetailBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8B2500"
  },

  /* ── 导航面板样式 ── */
  navPanel: {
    position: "absolute",
    top: 80,
    left: "50%" as any,
    transform: [{ translateX: -120 }],
    width: 240,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 6,
    zIndex: 100
  },
  navTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 10
  },
  navProgressBg: {
    width: "100%" as any,
    height: 5,
    backgroundColor: "#e8e0d6",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 6
  },
  navProgressFill: {
    height: "100%" as any,
    backgroundColor: "#d4a017",
    borderRadius: 3
  },
  navPercent: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 10
  },
  navExit: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#f5ede0",
    borderRadius: 14
  },
  navExitText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "600"
  }
});
