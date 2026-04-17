import { Landmark, getLandmarkById } from "./landmarks";

export type RouteDuration = "half-day" | "full-day";
export type RouteTheme = "皇城" | "园林" | "胡同" | "祭祀" | "文脉" | "中轴线";
export type RouteCoordinate = [number, number];

export interface RouteStop {
  landmarkId: string;
  /** 建议停留时间（分钟） */
  duration: number;
  /** 该站点的游览提示 */
  tip: string;
}

export interface Route {
  id: string;
  name: string;
  subtitle: string;
  theme: RouteTheme;
  duration: RouteDuration;
  /** 预估总时长（小时） */
  estimatedHours: number;
  /** 路线简介 */
  description: string;
  /** 适合人群 */
  suitableFor: string[];
  /** 途经站点（有序） */
  stops: RouteStop[];
  /** 封面图取自第一个景点 */
  coverLandmarkId: string;
  /** 参考来源 */
  source: string;
  /** 路线坐标（按 stops 顺序） */
  coordinates: RouteCoordinate[];
}

function createRoute(route: Omit<Route, "coordinates">): Route {
  const coordinates = route.stops.map((stop) => {
    const landmark = getLandmarkById(stop.landmarkId);
    if (!landmark) {
      throw new Error(`Route "${route.id}" 引用了不存在的景点：${stop.landmarkId}`);
    }
    return [landmark.latitude, landmark.longitude] as RouteCoordinate;
  });

  return {
    ...route,
    coordinates
  };
}

export const routes: Route[] = [
  createRoute({
    id: "imperial-axis",
    name: "皇城中轴线",
    subtitle: "沿北京中轴线北行，感受皇城气魄",
    theme: "中轴线",
    duration: "half-day",
    estimatedHours: 4,
    description:
      "从永定门出发，沿北京城的脊梁——中轴线一路向北，经正阳门、天安门，深入故宫核心，最后登景山俯瞰紫禁城全景。这条线路浓缩了北京城六百年的规划智慧。",
    suitableFor: ["初次到访", "历史爱好者", "摄影"],
    stops: [
      { landmarkId: "yongdingmen", duration: 20, tip: "中轴线南起点，适合远眺" },
      { landmarkId: "qianmen", duration: 30, tip: "登城楼可俯瞰前门大街" },
      { landmarkId: "tiananmen", duration: 30, tip: "广场拍照，感受空间尺度" },
      { landmarkId: "forbidden-city", duration: 120, tip: "建议午门入、神武门出，重点看三大殿" },
      { landmarkId: "jingshan-park", duration: 40, tip: "登万春亭俯瞰故宫全貌，最佳拍照点" }
    ],
    coverLandmarkId: "forbidden-city",
    source: "参考：北京中轴线世界文化遗产申报资料、知乎经典路线推荐"
  }),
  createRoute({
    id: "forbidden-city-deep",
    name: "紫禁城到皇家园林",
    subtitle: "从皇宫到园林，一天穿越明清",
    theme: "皇城",
    duration: "full-day",
    estimatedHours: 7,
    description:
      "上午深度游览故宫三大殿与后宫区，中午出神武门登景山，下午漫步北海公园皇家园林，傍晚在什刹海畔感受老北京烟火气。皇城与市井的一日跨越。",
    suitableFor: ["深度游", "文化探索", "亲子"],
    stops: [
      { landmarkId: "tiananmen", duration: 20, tip: "从天安门进入午门方向" },
      { landmarkId: "forbidden-city", duration: 150, tip: "故宫深度游：中轴线 + 东六宫或珍宝馆" },
      { landmarkId: "jingshan-park", duration: 40, tip: "午间登高，光线适合拍故宫全景" },
      { landmarkId: "beihai-park", duration: 60, tip: "白塔、琼岛、五龙亭，皇家园林精华" },
      { landmarkId: "shichahai", duration: 60, tip: "湖边漫步，傍晚氛围最佳" }
    ],
    coverLandmarkId: "jingshan-park",
    source: "参考：故宫博物院官方推荐路线、北京旅游网一日游攻略"
  }),
  createRoute({
    id: "hutong-walk",
    name: "老北京胡同漫步",
    subtitle: "走进巷弄人家，触摸京城肌理",
    theme: "胡同",
    duration: "half-day",
    estimatedHours: 3.5,
    description:
      "从南锣鼓巷出发，穿过北京最有韵味的胡同区，到钟鼓楼下听一听六百年的晨钟暮鼓，再沿什刹海散步到恭王府。这是最接近老北京日常生活的一条线路。",
    suitableFor: ["City Walk", "文艺青年", "慢旅行"],
    stops: [
      { landmarkId: "nanluoguxiang", duration: 40, tip: "清晨人少，适合感受胡同本来的安静" },
      { landmarkId: "bell-drum-towers", duration: 40, tip: "可登鼓楼俯瞰胡同屋顶，感受老城肌理" },
      { landmarkId: "shichahai", duration: 30, tip: "银锭桥观山，烟袋斜街觅食" },
      { landmarkId: "prince-gong-mansion", duration: 60, tip: "清代王府建筑精华，花园极美" }
    ],
    coverLandmarkId: "bell-drum-towers",
    source: "参考：知乎北京City Walk路线推荐、马蜂窝胡同攻略"
  }),
  createRoute({
    id: "altar-culture",
    name: "坛庙祭祀之旅",
    subtitle: "探寻明清祭祀文化与天地信仰",
    theme: "祭祀",
    duration: "half-day",
    estimatedHours: 4,
    description:
      "天坛是世界最大的古代祭天建筑群，先农坛承载着帝王亲耕的传统。从祭祀天地到前门市井，感受明清北京城神圣空间与世俗生活的交织。",
    suitableFor: ["建筑爱好者", "传统文化", "摄影"],
    stops: [
      { landmarkId: "temple-of-heaven", duration: 90, tip: "祈年殿、圜丘坛、回音壁都值得细看" },
      { landmarkId: "temple-of-agriculture", duration: 45, tip: "游客少但建筑精美，了解耕籍礼文化" },
      { landmarkId: "qianmen", duration: 30, tip: "正阳门城楼值得登临" },
      { landmarkId: "yongdingmen", duration: 20, tip: "中轴线南端收尾" }
    ],
    coverLandmarkId: "temple-of-heaven",
    source: "参考：天坛公园官网、UNESCO世界文化遗产资料"
  }),
  createRoute({
    id: "royal-gardens",
    name: "皇家园林巡礼",
    subtitle: "从废墟到仙境，三座皇家园林",
    theme: "园林",
    duration: "full-day",
    estimatedHours: 7,
    description:
      "上午游览颐和园的湖光山色，午后走进圆明园的断壁残垣，感受历史的沧桑。傍晚回到城内，在北海公园的白塔下结束一天的园林之旅。三座园林，三种命运。",
    suitableFor: ["自然风光", "历史反思", "家庭出游"],
    stops: [
      { landmarkId: "summer-palace", duration: 150, tip: "万寿山、长廊、昆明湖，建议从东宫门入" },
      { landmarkId: "old-summer-palace", duration: 90, tip: "西洋楼遗址必看，黄昏光线最有氛围" },
      { landmarkId: "beihai-park", duration: 60, tip: "傍晚到北海看夕阳映白塔" }
    ],
    coverLandmarkId: "summer-palace",
    source: "参考：颐和园官网、圆明园遗址公园官网、北京园林学会资料"
  }),
  createRoute({
    id: "confucian-heritage",
    name: "国学文脉探访",
    subtitle: "从藏传佛教到儒学殿堂",
    theme: "文脉",
    duration: "half-day",
    estimatedHours: 3,
    description:
      "雍和宫是北京最大的藏传佛教寺院，对面的国子监是古代最高学府。从宗教到教育，从佛到儒，这条线路串起了中国文化的两条主线。结束后可在南锣鼓巷小憩。",
    suitableFor: ["文化探索", "安静散步", "学生"],
    stops: [
      { landmarkId: "yonghe-temple", duration: 60, tip: "万福阁的弥勒佛像高26米，极为震撼" },
      { landmarkId: "confucius-temple", duration: 50, tip: "辟雍大殿与元代古柏值得细看" },
      { landmarkId: "nanluoguxiang", duration: 40, tip: "文创小店与咖啡馆，适合休憩" }
    ],
    coverLandmarkId: "yonghe-temple",
    source: "参考：雍和宫官网、国子监博物馆官网"
  })
];

/** 根据 ID 获取路线 */
export function getRouteById(id: string): Route | undefined {
  return routes.find((r) => r.id === id);
}

/** 获取路线的所有景点完整数据 */
export function getRouteStops(route: Route): Array<{ stop: RouteStop; landmark: Landmark | undefined }> {
  return route.stops.map((stop) => ({
    stop,
    landmark: getLandmarkById(stop.landmarkId)
  }));
}

/** 获取路线封面图 URL */
export function getRouteCover(route: Route): string {
  const lm = getLandmarkById(route.coverLandmarkId);
  return lm?.cover ?? "";
}
