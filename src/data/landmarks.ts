export type LandmarkCategory =
  | "宫殿"
  | "坛庙"
  | "园林"
  | "城门"
  | "寺庙"
  | "历史街区"
  | "古迹";

export interface Landmark {
  id: string;
  name: string;
  category: LandmarkCategory;
  district: string;
  /** WGS-84 纬度（适配 Leaflet / OpenStreetMap） */
  latitude: number;
  /** WGS-84 经度 */
  longitude: number;
  /** 地图缩放到此级别及以上时显示 marker；数值越小 = 越早出现 */
  zoomThreshold: number;
  /** 排序权重，1 = 最高 */
  priority: number;
  summary: string;
  tags: string[];
  /** 真实封面图 URL（Wikimedia Commons） */
  cover: string;
  /** 主要朝代 */
  dynasty: string;
  /** 始建年份（显示用） */
  builtYear: string;
  /** 详细介绍（比 summary 更长） */
  description: string;
  /** 资料来源 */
  sources: Array<{ title: string; url: string }>;
}

/**
 * 18 个北京精选古建 / 标志性历史景点
 * 坐标体系：WGS-84（适配 Leaflet + OpenStreetMap / CartoDB 瓦片）
 * 来源：OpenStreetMap Nominatim 查询 + 人工校正
 */
export const landmarks: Landmark[] = [
  {
    id: "forbidden-city",
    name: "故宫",
    category: "宫殿",
    district: "东城区",
    latitude: 39.9173,
    longitude: 116.3908,
    zoomThreshold: 10,
    priority: 1,
    summary:
      "明清两代皇宫，世界现存规模最大的木质结构古建筑群，1987年列入世界文化遗产。",
    tags: ["明朝", "清朝", "世界遗产", "皇家"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/e/ef/The_Forbidden_City_-_View_from_Coal_Hill.jpg",
    dynasty: "明清",
    builtYear: "1406–1420",
    description:
      "故宫，旧称紫禁城，始建于明永乐四年（1406年），历时十四年建成，是明清两代共24位皇帝的皇宫。占地约72万平方米，建筑面积约15万平方米，拥有大小宫殿七十多座、房屋九千余间，是世界上现存规模最大、保存最完整的木质结构古建筑群。\n\n建筑严格沿中轴线对称布局：前朝以太和殿、中和殿、保和殿三大殿为核心，用于举行朝政典礼；后寝以乾清宫、交泰殿、坤宁宫为主体，为帝后起居生活区。整体设计体现了中国传统宫殿建筑的最高水平与“天人合一”的营造理念。1987年被联合国教科文组织列入世界文化遗产名录，现为故宫博物院所在地，馆藏文物超过186万件。",
    sources: [
      { title: "维基百科 · 故宫", url: "https://zh.wikipedia.org/wiki/故宫" },
      { title: "UNESCO · Imperial Palaces of the Ming and Qing Dynasties", url: "https://whc.unesco.org/en/list/439" },
      { title: "故宫博物院官网", url: "https://www.dpm.org.cn/" }
    ]
  },
  {
    id: "temple-of-heaven",
    name: "天坛",
    category: "坛庙",
    district: "东城区",
    latitude: 39.8799,
    longitude: 116.4029,
    zoomThreshold: 10,
    priority: 1,
    summary:
      "明清两代帝王祭天祈谷之所，祈年殿为三重檐圆形大殿，是中国古建筑的杰出代表。",
    tags: ["明朝", "清朝", "世界遗产", "祭祀"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/Temple_of_Heaven_20160323_01.jpg",
    dynasty: "明清",
    builtYear: "1420",
    description:
      "天坛始建于明永乐十八年（1420年），是明清两代帝王祭天、祈谷和祈雨的场所。总面积约273万平方米，是现存中国古代规模最大、伦理等级最高的祭祀建筑群。\n\n祈年殿为天坛标志性建筑，三重檐圆形大殿高38.2米，直径24.2米，全部采用木结构，不用一根大梁和铁钉。建筑布局遵循“天圆地方”理念，北侧圆形（祈年殿），南侧方形（圜丘），体现了中国古代宇宙观。回音壁与三音石展示了精妙的声学设计。1998年被列入世界文化遗产名录。",
    sources: [
      { title: "维基百科 · 天坛", url: "https://zh.wikipedia.org/wiki/天坛" },
      { title: "UNESCO · Temple of Heaven", url: "https://whc.unesco.org/en/list/881" }
    ]
  },
  {
    id: "summer-palace",
    name: "颐和园",
    category: "园林",
    district: "海淀区",
    latitude: 39.9901,
    longitude: 116.2647,
    zoomThreshold: 10,
    priority: 1,
    summary:
      "中国现存最大的皇家园林，以万寿山和昆明湖为主体，集传统造园艺术之大成。",
    tags: ["清朝", "世界遗产", "皇家", "园林"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/d/db/Longevity_Hill_of_the_Summer_Palace.jpg",
    dynasty: "清",
    builtYear: "1750",
    description:
      "颐和园始建于清乾隆十五年（1750年），原名清漪园，以万寿山和昆明湖为主体，是中国现存最大、保存最完整的皇家园林。占地约290公顷，其中水面面积约占四分之三。\n\n园内集中国传统造园艺术之大成，将江南园林的精巧与北方园林的恢弘融为一体。长廊全长728米，共273间，是世界上最长的画廊，沿廊壁绘有14000余幅彩画。1860年被英法联军焚毁，光绪年间（1886年）慈禧太后挪用海军军费重建并改名颐和园。1998年被列入世界文化遗产名录。",
    sources: [
      { title: "维基百科 · 颐和园", url: "https://zh.wikipedia.org/wiki/颐和园" },
      { title: "UNESCO · Summer Palace", url: "https://whc.unesco.org/en/list/880" }
    ]
  },
  {
    id: "tiananmen",
    name: "天安门",
    category: "城门",
    district: "东城区",
    latitude: 39.9087,
    longitude: 116.3914,
    zoomThreshold: 10,
    priority: 1,
    summary:
      "始建于明永乐十五年（1417年），原名承天门，是明清皇城的正门，中国的标志性建筑。",
    tags: ["明朝", "城楼", "标志性"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/20200110_Tiananmen-3.jpg",
    dynasty: "明",
    builtYear: "1417",
    description:
      "天安门始建于明永乐十五年（1417年），原名承天门，取“承天启运、受命于天”之意。清顺治八年（1651年）重修后更名为天安门。城楼高33.7米，面阔九间、进深五间，体现“九五之尊”的皇家规制。\n\n天安门是明清皇城的正门，也是封建时代颁布诏令的重要场所。城楼前的金水桥、华表、石狮等附属设施均为明清原物，整体建筑庄严宏伟。天安门现已成为中国最具代表性的标志性建筑之一。",
    sources: [
      { title: "维基百科 · 天安门", url: "https://zh.wikipedia.org/wiki/天安门" }
    ]
  },
  {
    id: "jingshan-park",
    name: "景山公园",
    category: "园林",
    district: "西城区",
    latitude: 39.9245,
    longitude: 116.3904,
    zoomThreshold: 11,
    priority: 2,
    summary:
      "位于故宫北侧的皇家御苑，万春亭是俯瞰故宫全景与北京中轴线的最佳观景点。",
    tags: ["明朝", "清朝", "中轴线", "皇家"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/1/19/Jingshan_park.jpg",
    dynasty: "明清",
    builtYear: "1421",
    description:
      "景山公园位于故宫北侧，始建于明永乐年间（约1421年），是元、明、清三代的御苑。山体由营建紫禁城时开挖护城河的泥土堆积而成，高约45米，山上建有五座亭子，中峰万春亭是俯瞰故宫全景与北京中轴线的最佳观景点。\n\n景山曾名“煤山”，明崇祯十七年（1644年），崇祯帝在此自缢殉国，现存古槐为纪念标志。清代景山为皇帝祭祀祖先的场所。2001年被列为全国重点文物保护单位。",
    sources: [
      { title: "维基百科 · 景山公园", url: "https://zh.wikipedia.org/wiki/景山公园" }
    ]
  },
  {
    id: "beihai-park",
    name: "北海公园",
    category: "园林",
    district: "西城区",
    latitude: 39.9264,
    longitude: 116.3825,
    zoomThreshold: 11,
    priority: 2,
    summary:
      "中国现存历史最悠久的皇家园林之一，白塔矗立琼华岛上，是北海的标志。",
    tags: ["辽代", "元朝", "明朝", "清朝", "皇家"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/Beihai_Park_65414.jpg",
    dynasty: "辽–清",
    builtYear: "938",
    description:
      "北海公园是中国现存历史最悠久、保存最完整的皇家园林之一，始建于辽承天元年（938年），历经金、元、明、清各代扩建修缮，已有千余年历史。占地约68.2万平方米，其中水面面积约38.9万平方米。\n\n琼华岛上的白塔建于清顺治八年（1651年），为藏式佛塔，高35.9米，是北海公园的标志性建筑。园内还有九龙壁、五龙亭、团城等重要古建筑群，集中体现了中国古代皇家园林的造园艺术。",
    sources: [
      { title: "维基百科 · 北海公园", url: "https://zh.wikipedia.org/wiki/北海公园_(北京)" }
    ]
  },
  {
    id: "bell-drum-towers",
    name: "钟鼓楼",
    category: "城门",
    district: "东城区",
    latitude: 39.9393,
    longitude: 116.3897,
    zoomThreshold: 11,
    priority: 2,
    summary:
      "元明清三代报时中心，钟楼与鼓楼南北相望，是北京中轴线北端的标志建筑。",
    tags: ["元朝", "明朝", "中轴线", "报时"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Beijing_Drum_Tower.jpg",
    dynasty: "元明清",
    builtYear: "1272",
    description:
      "钟鼓楼位于北京中轴线北端，元、明、清三代为京城报时中心。鼓楼始建于元至元九年（1272年），通高46.7米；钟楼始建于明永乐十八年（1420年），通高47.9米。两楼南北相望，相距约100米。\n\n鼓楼内曾设25面报时大鼓，钟楼内悬挂一口重约63吨的铜钟，每日清晨先鸣鼓、后撞钟以报晓。这种“晨钟暮鼓”的报时制度持续了近七百年。2013年作为“北京中轴线”组成部分被列入世界遗产预备名录。",
    sources: [
      { title: "维基百科 · 北京钟鼓楼", url: "https://zh.wikipedia.org/wiki/北京钟鼓楼" }
    ]
  },
  {
    id: "yonghe-temple",
    name: "雍和宫",
    category: "寺庙",
    district: "东城区",
    latitude: 39.9456,
    longitude: 116.4110,
    zoomThreshold: 11,
    priority: 2,
    summary:
      "清代规格最高的藏传佛教寺院，原为雍正帝即位前的府邸，后改为喇嘛庙。",
    tags: ["清朝", "藏传佛教", "皇家"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/65618-Beijing-Lama-Temple_%2828098480603%29.jpg",
    dynasty: "清",
    builtYear: "1694",
    description:
      "雍和宫始建于清康熙三十三年（1694年），原为清世宗胤禛（雍正帝）即位前的府邸，称“雍亲王府”。雍正即位后改为行宫，乾隆九年（1744年）正式改为藏传佛教格鲁派寺院。\n\n寺内最著名的是万福阁中供奉的一尊由整根白檀木雕成的弥勒大佛像，高18米、地下埋入8米，共26米，被列入吉尼斯世界纪录。雍和宫是清代规格最高的一座佛教寺院，也是北京市内最大的藏传佛教寺院。",
    sources: [
      { title: "维基百科 · 雍和宫", url: "https://zh.wikipedia.org/wiki/雍和宫" }
    ]
  },
  {
    id: "confucius-temple",
    name: "孔庙和国子监",
    category: "坛庙",
    district: "东城区",
    latitude: 39.9451,
    longitude: 116.4083,
    zoomThreshold: 12,
    priority: 2,
    summary:
      "元明清三代国家最高学府与祭孔场所，国子监辟雍是中国唯一的古代「学堂」。",
    tags: ["元朝", "明朝", "清朝", "儒学", "教育"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/BeijingConfuciusTemple2.jpg",
    dynasty: "元明清",
    builtYear: "1302",
    description:
      "北京孔庙始建于元大德六年（1302年），是元、明、清三代国家祭祀孔子的场所。国子监始建于元大德十年（1306年），是三代国家最高教育管理机构和最高学府。\n\n国子监内的辟雍是中国现存唯一的古代“学堂”，为清乾隆年间修建，皇帝在此讲学。孔庙内保存有198座进士题名碑，记载了元、明、清三代51624名进士的姓名、籍贯和名次，是研究中国古代科举制度的珍贵资料。",
    sources: [
      { title: "维基百科 · 北京孔庙", url: "https://zh.wikipedia.org/wiki/北京孔庙" },
      { title: "维基百科 · 国子监", url: "https://zh.wikipedia.org/wiki/国子监" }
    ]
  },
  {
    id: "prince-gong-mansion",
    name: "恭王府",
    category: "宫殿",
    district: "西城区",
    latitude: 39.9353,
    longitude: 116.3801,
    zoomThreshold: 12,
    priority: 2,
    summary:
      "清代规模最大、保存最完整的王府建筑群，曾是和珅宅邸，后为恭亲王府。",
    tags: ["清朝", "王府", "和珅"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/5/52/Gongwangfu1.jpg",
    dynasty: "清",
    builtYear: "1776",
    description:
      "恭王府始建于清乾隆四十一年（1776年），原为大学士和珅的宅邸。嘉庆四年（1799年）和珅被抄家后，宅邸转赐庆王永璘，后成为恭亲王奕訢的府邸，因此得名“恭王府”。\n\n恭王府占地约6万平方米，由府邸和花园两部分组成，是清代规模最大、保存最完整的王府建筑群。花园中的“蝠池”和“福”字碑是著名景点。府邸建筑布局严格按照清代王府规制，共有大小房屋数百间。2012年被列为全国重点文物保护单位。",
    sources: [
      { title: "维基百科 · 恭王府", url: "https://zh.wikipedia.org/wiki/恭王府" }
    ]
  },
  {
    id: "qianmen",
    name: "正阳门",
    category: "城门",
    district: "东城区",
    latitude: 39.8992,
    longitude: 116.3916,
    zoomThreshold: 11,
    priority: 2,
    summary:
      "俗称「前门」，是明清内城正南门，由城楼与箭楼组成，北京中轴线重要节点。",
    tags: ["明朝", "清朝", "中轴线", "城楼"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/8/82/Qianmen_14_april_2010.jpg",
    dynasty: "明",
    builtYear: "1419",
    description:
      "正阳门俗称“前门”，位于北京中轴线上，是明清北京内城正南门。由城楼和箭楼两座建筑组成，城楼始建于明永乐十七年（1419年），箭楼建于明正统四年（1439年）。\n\n城楼通高42米，是北京所有城门中最高大的一座。正阳门是中国古代城市防御体系的杰出代表，也是北京中轴线上的重要节点。历史上正阳门多次遭遇火灾和战争破坏，现存建筑为清代重修。",
    sources: [
      { title: "维基百科 · 正阳门", url: "https://zh.wikipedia.org/wiki/正阳门" }
    ]
  },
  {
    id: "yongdingmen",
    name: "永定门",
    category: "城门",
    district: "东城区",
    latitude: 39.8648,
    longitude: 116.3930,
    zoomThreshold: 12,
    priority: 3,
    summary:
      "明清外城正南门，北京中轴线最南端的标志建筑，2004年复建。",
    tags: ["明朝", "中轴线", "复建"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/2/27/Beijing_Yongdingmen_1950.jpg",
    dynasty: "明",
    builtYear: "1553",
    description:
      "永定门始建于明嘉靖三十二年（1553年），是明清外城正南门，也是北京中轴线最南端的标志建筑。原有城楼和瓮城，清乾隆年间重修。\n\n1957年永定门因城市建设被拆除，2004年在原址复建。复建后的永定门基本恢复了清代乾隆年间的形制，成为北京中轴线保护的重要组成部分。2012年，“北京中轴线”被列入中国世界遗产预备名录，永定门作为南端起点具有重要意义。",
    sources: [
      { title: "维基百科 · 永定门", url: "https://zh.wikipedia.org/wiki/永定门" }
    ]
  },
  {
    id: "old-summer-palace",
    name: "圆明园",
    category: "古迹",
    district: "海淀区",
    latitude: 40.0050,
    longitude: 116.2948,
    zoomThreshold: 11,
    priority: 2,
    summary:
      "清代大型皇家园林，有「万园之园」之称，1860年被英法联军焚毁，遗址具有深刻历史意义。",
    tags: ["清朝", "皇家", "遗址", "近代史"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/9/9e/20090731_Remains_of_the_Old_Summer_Palace_02.jpg",
    dynasty: "清",
    builtYear: "1707",
    description:
      "圆明园始建于清康熙四十六年（1707年），由圆明园、长春园、绮春园三园组成，占地约350公顷，有“万园之园”之美誉。园内汇集了中西方建筑艺术精华，既有江南水乡意境，又有西洋楼的巴洛克建筑群。\n\n1860年第二次鸦片战争期间，英法联军纵火焚烧圆明园，大火持续三天三夜，园内珍贵文物遭大规模掠夺。圆明园遗址现为全国重点文物保护单位和爱国主义教育基地，残存的西洋楼石雕遗迹成为近代中国屈辱历史的见证。",
    sources: [
      { title: "维基百科 · 圆明园", url: "https://zh.wikipedia.org/wiki/圆明园" }
    ]
  },
  {
    id: "white-pagoda-temple",
    name: "白塔寺",
    category: "寺庙",
    district: "西城区",
    latitude: 39.9236,
    longitude: 116.3570,
    zoomThreshold: 13,
    priority: 3,
    summary:
      "又名妙应寺，建于元代，寺内白塔为中国现存最早最大的藏式佛塔。",
    tags: ["元朝", "藏传佛教", "佛塔"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Miaoying_Temple_8.jpg",
    dynasty: "元",
    builtYear: "1271",
    description:
      "白塔寺正式名称为妙应寺，始建于元至元八年（1271年），由尼泊尔工匠阿尼哥设计建造。寺内白塔高50.9米，是中国现存最早、最大的藏式佛塔，也是元大都城市规划的重要标志。\n\n白塔为覆钵式喇嘛塔，塔身通体洁白，塔刹部分有铜质华盖和风铃。明清两代多次重修，基本保持了元代原貌。1961年被列为第一批全国重点文物保护单位。",
    sources: [
      { title: "维基百科 · 妙应寺", url: "https://zh.wikipedia.org/wiki/妙应寺" }
    ]
  },
  {
    id: "fayuan-temple",
    name: "法源寺",
    category: "寺庙",
    district: "西城区",
    latitude: 39.8835,
    longitude: 116.3638,
    zoomThreshold: 13,
    priority: 3,
    summary:
      "始建于唐贞观十九年（645年），北京现存历史最悠久的古寺，现为中国佛学院所在地。",
    tags: ["唐朝", "佛教", "最古老"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Hall_of_Kings_of_Heaven_at_Fa_yuan_temple.JPG",
    dynasty: "唐",
    builtYear: "645",
    description:
      "法源寺始建于唐贞观十九年（645年），是北京城内现存历史最悠久的古寺。原名悯忠寺，为唐太宗李世民纪念东征阵亡将士所建。清雍正年间（1734年）改名法源寺。\n\n寺院坐北朝南，六进院落，保存了自唐代建寺以来历代增修的建筑风格。寺内珍藏大量佛教文物，包括唐代铜佛像和明代木雕卧佛等。现为中国佛学院所在地和中国佛教图书文物馆，是中国佛教教育和学术研究的重要场所。",
    sources: [
      { title: "维基百科 · 法源寺", url: "https://zh.wikipedia.org/wiki/法源寺_(北京)" }
    ]
  },
  {
    id: "temple-of-agriculture",
    name: "先农坛",
    category: "坛庙",
    district: "西城区",
    latitude: 39.8800,
    longitude: 116.3890,
    zoomThreshold: 12,
    priority: 3,
    summary:
      "明清帝王祭祀先农神和亲耕的场所，与天坛东西对称布局，体现「左祖右社」规制。",
    tags: ["明朝", "清朝", "祭祀", "农耕"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/a/aa/Xiannongtan_pic_2.jpg",
    dynasty: "明",
    builtYear: "1420",
    description:
      "先农坛始建于明永乐十八年（1420年），位于北京中轴线西侧，与天坛东西对称布局，体现了中国古代“左祖右社”的城市规划理念。是明清帝王祭祀先农神和亲耕的场所。\n\n每年仲春二月，帝王亲临先农坛行“耕籍礼”——在“一亩三分地”上亲自扶犁耕种，以示对农事的重视。坛内的太岁殿是北京最大的单体古建筑之一。先农坛现为北京古代建筑博物馆所在地，2006年被列为全国重点文物保护单位。",
    sources: [
      { title: "维基百科 · 先农坛", url: "https://zh.wikipedia.org/wiki/先农坛" }
    ]
  },
  {
    id: "shichahai",
    name: "什刹海",
    category: "历史街区",
    district: "西城区",
    latitude: 39.9360,
    longitude: 116.3901,
    zoomThreshold: 12,
    priority: 2,
    summary:
      "由前海、后海、西海三个湖泊组成的历史文化街区，沿岸保存大量胡同和四合院。",
    tags: ["元朝", "胡同", "四合院", "湖泊"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/9/95/Shishahai.jpg",
    dynasty: "元",
    builtYear: "1267",
    description:
      "什刹海地区由前海、后海、西海（积水潭）三个相连的湖泊组成，是元大都规划设计的重要水系节点。元代漕运终点即设于积水潭，使此地成为全城最繁华的商业区。\n\n什刹海沿岸保存了大量明清时期的胡同和四合院，是北京内城面积最大、保存最完好的传统风貌区。这里曾是王公贵族聚居之地，醇亲王府、恭王府等王府建筑沿湖分布。如今的什刹海是北京最具代表性的历史文化街区和休闲旅游目的地。",
    sources: [
      { title: "维基百科 · 什刹海", url: "https://zh.wikipedia.org/wiki/什刹海" }
    ]
  },
  {
    id: "nanluoguxiang",
    name: "南锣鼓巷",
    category: "历史街区",
    district: "东城区",
    latitude: 39.9358,
    longitude: 116.3969,
    zoomThreshold: 13,
    priority: 3,
    summary:
      "北京最古老的街区之一，元大都时期的棋盘式胡同格局保存完好，全长786米。",
    tags: ["元朝", "胡同", "文化街区"],
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/9/95/2016-09-04_Beijing_Nanluoguxiang_anagoria_23.jpg",
    dynasty: "元",
    builtYear: "1267",
    description:
      "南锣鼓巷始建于元大都时期（约1267年），是北京最古老的街区之一。胡同全长786米，南北走向，东西各有8条胡同对称排列，形成鱼骨状棋盘式格局，完整保存了元大都的街巷规划。\n\n街区内保存了大量明清至民国时期的四合院和名人故居，包括茅盾故居、齐白石故居等。2009年被评为“中国十大历史文化名街”之一。南锣鼓巷是了解老北京胡同文化和传统民居建筑的重要窗口。",
    sources: [
      { title: "维基百科 · 南锣鼓巷", url: "https://zh.wikipedia.org/wiki/南锣鼓巷" }
    ]
  }
];

/** 根据 id 查找景点 */
export function getLandmarkById(id: string): Landmark | undefined {
  return landmarks.find((l) => l.id === id);
}

/** 获取所有不重复的分类 */
export function getAllCategories(): LandmarkCategory[] {
  const set = new Set<LandmarkCategory>();
  for (const l of landmarks) set.add(l.category);
  return Array.from(set);
}

/** 根据关键词和可选分类过滤景点 */
export function searchLandmarks(
  keyword: string,
  category?: LandmarkCategory
): Landmark[] {
  const q = keyword.trim().toLowerCase();
  return landmarks.filter((l) => {
    if (category && l.category !== category) return false;
    if (!q) return true;
    return (
      l.name.toLowerCase().includes(q) ||
      l.tags.some((t) => t.toLowerCase().includes(q)) ||
      l.category.includes(q) ||
      l.district.includes(q) ||
      l.summary.toLowerCase().includes(q)
    );
  });
}
