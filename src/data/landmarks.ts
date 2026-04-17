export type LandmarkCategory = string;

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
  /** 始建年份（显示用）；未知时为 null */
  builtYear: string | null;
  /** 详细介绍（比 summary 更长） */
  description: string;
  /** 资料来源 */
  sources: Array<{ title: string; url: string }>;
}

/**
 * 北京精选古建 / 标志性历史景点（212个完整版）
 * 坐标体系：WGS-84（适配 Leaflet + OpenStreetMap / CartoDB 瓦片）
 * 来源：Excel经纬度 + OpenStreetMap Nominatim + 人工校正
 */
export const landmarks: Landmark[] = [
  // ==================== 原有18个核心景点 ====================
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
  },

  // ==================== 212个景点完整版补充（按行政区分类） ====================
  // 通州区
 
  
  {
    id: "beijingtongzhoucanalculturetourismscenic-area",
    name: "北京（通州）大运河文化旅游景区",
    category: "历史文化/运河文化",
    district: "通州区",
    latitude: 39.892686,
    longitude: 116.713594,
    zoomThreshold: 10,
    priority: 1,
    summary: "京杭大运河北京段的重要组成部分，展示运河历史文化，是国家级旅游景区。",
    tags: [
      "5A景区",
      "隋代",
      "历史文化",
      "元代",
      "运河文化",
      "通州区"
    ],
    cover: "https://example.com/images/beijingtongzhoucanalculturetourismscenic-area.jpg",
    dynasty: "公元 605 年",
    builtYear: null,
    description: "京杭大运河北京段的重要组成部分，展示运河历史文化，是国家级旅游景区。",
    sources: [
      {
        title: "维基百科 · 北京（通州）大运河文化旅游景区",
        url: "https://zh.wikipedia.org/wiki/北京（通州）大运河文化旅游景区"
      }
    ]
  },
  {
    id: "great-wall-八达岭景区",
    name: "八达岭长城景区",
    category: "历史文化/军事防御",
    district: "延庆区",
    latitude: 40.356188,
    longitude: 116.016802,
    zoomThreshold: 10,
    priority: 1,
    summary: "万里长城的著名景点之一，是明长城的精华部分，为国家重点文物保护单位，1987 年被联合国教科文组织列入《世界遗产名录》。",
    tags: [
      "5A景区",
      "军事防御",
      "历史文化",
      "元代",
      "延庆区"
    ],
    cover: "https://example.com/images/great-wall-八达岭景区.jpg",
    dynasty: "公元前 7 世纪至 17 世纪",
    builtYear: null,
    description: "万里长城的著名景点之一，是明长城的精华部分，为国家重点文物保护单位，1987 年被联合国教科文组织列入《世界遗产名录》。",
    sources: [
      {
        title: "维基百科 · 八达岭长城景区",
        url: "https://zh.wikipedia.org/wiki/八达岭长城景区"
      }
    ]
  },
  {
    id: "great-wall-慕田峪景区",
    name: "慕田峪长城景区",
    category: "历史文化/军事防御",
    district: "怀柔区",
    latitude: 40.431668,
    longitude: 116.565052,
    zoomThreshold: 10,
    priority: 1,
    summary: "万里长城的又一著名景点，位于北京市怀柔区，以险、密、奇、巧著称，景色秀丽。",
    tags: [
      "明代",
      "5A景区",
      "军事防御",
      "历史文化",
      "元代",
      "怀柔区"
    ],
    cover: "https://example.com/images/great-wall-慕田峪景区.jpg",
    dynasty: "1368 年",
    builtYear: null,
    description: "万里长城的又一著名景点，位于北京市怀柔区，以险、密、奇、巧著称，景色秀丽。",
    sources: [
      {
        title: "维基百科 · 慕田峪长城景区",
        url: "https://zh.wikipedia.org/wiki/慕田峪长城景区"
      }
    ]
  },
  {
    id: "圆明园遗址景区-park",
    name: "圆明园遗址公园景区",
    category: "皇家园林/遗址",
    district: "海淀区",
    latitude: 40.008759,
    longitude: 116.30096,
    zoomThreshold: 10,
    priority: 1,
    summary: "中国清代大型皇家园林，被誉为'万园之园'，1860 年被英法联军焚毁，现为遗址公园。",
    tags: [
      "遗址",
      "5A景区",
      "海淀区",
      "皇家园林",
      "清代"
    ],
    cover: "https://example.com/images/圆明园遗址景区-park.jpg",
    dynasty: "1707 年",
    builtYear: null,
    description: "中国清代大型皇家园林，被誉为'万园之园'，1860 年被英法联军焚毁，现为遗址公园。",
    sources: [
      {
        title: "维基百科 · 圆明园遗址公园景区",
        url: "https://zh.wikipedia.org/wiki/圆明园遗址公园景区"
      }
    ]
  },
  {
    id: "北京奥林匹克-park",
    name: "北京奥林匹克公园",
    category: "现代建筑/体育场馆",
    district: "朝阳区",
    latitude: 40.009926,
    longitude: 116.393096,
    zoomThreshold: 10,
    priority: 1,
    summary: "2008 年北京奥运会主场馆所在地，包括鸟巢、水立方等标志性建筑，是集体育、文化、旅游为一体的现代化公园。",
    tags: [
      "5A景区",
      "朝阳区",
      "体育场馆",
      "现代建筑"
    ],
    cover: "https://example.com/images/北京奥林匹克-park.jpg",
    dynasty: "2001 年",
    builtYear: null,
    description: "2008 年北京奥运会主场馆所在地，包括鸟巢、水立方等标志性建筑，是集体育、文化、旅游为一体的现代化公园。",
    sources: [
      {
        title: "维基百科 · 北京奥林匹克公园",
        url: "https://zh.wikipedia.org/wiki/北京奥林匹克公园"
      }
    ]
  },
  {
    id: "恭王府scenic-area",
    name: "恭王府景区",
    category: "历史文化/王府建筑",
    district: "西城区",
    latitude: 39.936428,
    longitude: 116.386442,
    zoomThreshold: 10,
    priority: 1,
    summary: "清代规模最大的一座王府，曾先后作为和珅、恭亲王奕訢的府邸，后世有'一座恭王府，半部清代史'之说。",
    tags: [
      "5A景区",
      "王府建筑",
      "历史文化",
      "西城区",
      "清代"
    ],
    cover: "https://example.com/images/恭王府scenic-area.jpg",
    dynasty: "1776 年",
    builtYear: null,
    description: "清代规模最大的一座王府，曾先后作为和珅、恭亲王奕訢的府邸，后世有'一座恭王府，半部清代史'之说。",
    sources: [
      {
        title: "维基百科 · 恭王府景区",
        url: "https://zh.wikipedia.org/wiki/恭王府景区"
      }
    ]
  },
  {
    id: "明十三陵scenic-area",
    name: "明十三陵景区",
    category: "历史文化/帝王陵墓",
    district: "昌平区",
    latitude: 40.280532,
    longitude: 116.235741,
    zoomThreshold: 10,
    priority: 1,
    summary: "明朝十三位皇帝的陵寝，是中国现存规模宏大、保存完整的帝王陵墓群，世界文化遗产。",
    tags: [
      "明代",
      "5A景区",
      "帝王陵墓",
      "昌平区",
      "历史文化"
    ],
    cover: "https://example.com/images/明十三陵scenic-area.jpg",
    dynasty: "1409 年",
    builtYear: null,
    description: "明朝十三位皇帝的陵寝，是中国现存规模宏大、保存完整的帝王陵墓群，世界文化遗产。",
    sources: [
      {
        title: "维基百科 · 明十三陵景区",
        url: "https://zh.wikipedia.org/wiki/明十三陵景区"
      }
    ]
  },
  {
    id: "天坛-park",
    name: "天坛公园",
    category: "历史文化/皇家祭坛",
    district: "东城区",
    latitude: 39.881913,
    longitude: 116.410829,
    zoomThreshold: 10,
    priority: 1,
    summary: "明、清两代皇帝祭祀皇天和农神的场所，是中国现存最大的古代祭祀性建筑群，世界文化遗产。",
    tags: [
      "明代",
      "5A景区",
      "皇家祭坛",
      "东城区",
      "历史文化"
    ],
    cover: "https://example.com/images/天坛-park.jpg",
    dynasty: "1420 年",
    builtYear: null,
    description: "明、清两代皇帝祭祀皇天和农神的场所，是中国现存最大的古代祭祀性建筑群，世界文化遗产。",
    sources: [
      {
        title: "维基百科 · 天坛公园",
        url: "https://zh.wikipedia.org/wiki/天坛公园"
      }
    ]
  },
  {
    id: "summer-palace",
    name: "颐和园",
    category: "皇家园林",
    district: "海淀区",
    latitude: 39.999617,
    longitude: 116.275179,
    zoomThreshold: 10,
    priority: 1,
    summary: "中国清朝时期皇家园林，前身为清漪园，坐落在北京西郊，是以昆明湖、万寿山为基址，以杭州西湖为蓝本，汲取江南园林的设计手法而建成的一座大型山水园林。",
    tags: [
      "海淀区",
      "5A景区",
      "皇家园林",
      "清代"
    ],
    cover: "https://example.com/images/summer-palace.jpg",
    dynasty: "1750 年",
    builtYear: null,
    description: "中国清朝时期皇家园林，前身为清漪园，坐落在北京西郊，是以昆明湖、万寿山为基址，以杭州西湖为蓝本，汲取江南园林的设计手法而建成的一座大型山水园林。",
    sources: [
      {
        title: "维基百科 · 颐和园",
        url: "https://zh.wikipedia.org/wiki/颐和园"
      }
    ]
  },
  {
    id: "forbidden-city",
    name: "故宫博物院",
    category: "历史文化/宫殿建筑",
    district: "东城区",
    latitude: 39.917839,
    longitude: 116.397029,
    zoomThreshold: 10,
    priority: 1,
    summary: "中国明清两代的皇家宫殿，旧称紫禁城，位于北京中轴线的中心，是中国古代宫廷建筑之精华，世界上现存规模最大、保存最为完整的木质结构古建筑之一。",
    tags: [
      "明代",
      "5A景区",
      "宫殿建筑",
      "东城区",
      "历史文化"
    ],
    cover: "https://example.com/images/forbidden-city.jpg",
    dynasty: "1406 年",
    builtYear: null,
    description: "中国明清两代的皇家宫殿，旧称紫禁城，位于北京中轴线的中心，是中国古代宫廷建筑之精华，世界上现存规模最大、保存最为完整的木质结构古建筑之一。",
    sources: [
      {
        title: "维基百科 · 故宫博物院",
        url: "https://zh.wikipedia.org/wiki/故宫博物院"
      }
    ]
  },
  {
    id: "乐多港假日广场scenic-area",
    name: "乐多港假日广场景区",
    category: "现代商业/休闲娱乐",
    district: "昌平区",
    latitude: 40.232923,
    longitude: 116.190008,
    zoomThreshold: 11,
    priority: 2,
    summary: "集购物、餐饮、娱乐、休闲于一体的综合性商业旅游景区。",
    tags: [
      "现代商业",
      "4A景区",
      "昌平区",
      "休闲娱乐"
    ],
    cover: "https://example.com/images/乐多港假日广场scenic-area.jpg",
    dynasty: "2010 年",
    builtYear: null,
    description: "集购物、餐饮、娱乐、休闲于一体的综合性商业旅游景区。",
    sources: [
      {
        title: "维基百科 · 乐多港假日广场景区",
        url: "https://zh.wikipedia.org/wiki/乐多港假日广场景区"
      }
    ]
  },
  {
    id: "fengtai区中国gardenmuseumscenic-area",
    name: "丰台区中国园林博物馆景区",
    category: "博物馆/园林艺术",
    district: "丰台区",
    latitude: 39.878994,
    longitude: 116.177113,
    zoomThreshold: 11,
    priority: 2,
    summary: "中国第一座以园林为主题的国家级博物馆，展示中国园林艺术和文化。",
    tags: [
      "博物馆",
      "园林艺术",
      "丰台区",
      "4A景区"
    ],
    cover: "https://example.com/images/fengtai区中国gardenmuseumscenic-area.jpg",
    dynasty: "2010 年",
    builtYear: null,
    description: "中国第一座以园林为主题的国家级博物馆，展示中国园林艺术和文化。",
    sources: [
      {
        title: "维基百科 · 丰台区中国园林博物馆景区",
        url: "https://zh.wikipedia.org/wiki/丰台区中国园林博物馆景区"
      }
    ]
  },
  {
    id: "北京世园-park",
    name: "北京世园公园",
    category: "现代园林/博览园",
    district: "延庆区",
    latitude: 39.904179,
    longitude: 116.407387,
    zoomThreshold: 11,
    priority: 2,
    summary: "2019 年北京世界园艺博览会举办地，集园艺展示、科普教育、休闲旅游为一体。",
    tags: [
      "延庆区",
      "现代园林",
      "博览园",
      "4A景区"
    ],
    cover: "https://example.com/images/北京世园-park.jpg",
    dynasty: "2019 年",
    builtYear: null,
    description: "2019 年北京世界园艺博览会举办地，集园艺展示、科普教育、休闲旅游为一体。",
    sources: [
      {
        title: "维基百科 · 北京世园公园",
        url: "https://zh.wikipedia.org/wiki/北京世园公园"
      }
    ]
  },
  {
    id: "黑龙潭tourism区",
    name: "黑龙潭旅游区",
    category: "自然风光/道教文化",
    district: "密云区",
    latitude: 40.562371,
    longitude: 116.801844,
    zoomThreshold: 11,
    priority: 2,
    summary: "位于密云区，以山水自然风光和道教文化著称，是京郊著名的避暑胜地。",
    tags: [
      "自然风光",
      "密云区",
      "4A景区",
      "道教文化"
    ],
    cover: "https://example.com/images/黑龙潭tourism区.jpg",
    dynasty: "古代",
    builtYear: null,
    description: "位于密云区，以山水自然风光和道教文化著称，是京郊著名的避暑胜地。",
    sources: [
      {
        title: "维基百科 · 黑龙潭旅游区",
        url: "https://zh.wikipedia.org/wiki/黑龙潭旅游区"
      }
    ]
  },
  {
    id: "北京市东城区地坛景区-park",
    name: "北京市东城区地坛公园景区",
    category: "历史文化/皇家祭坛",
    district: "东城区",
    latitude: 39.953777,
    longitude: 116.414443,
    zoomThreshold: 11,
    priority: 2,
    summary: "明清两代帝王祭祀'皇地祇神'的场所，与天坛相对应，是北京市重点文物保护单位。",
    tags: [
      "明代",
      "4A景区",
      "皇家祭坛",
      "东城区",
      "历史文化"
    ],
    cover: "https://example.com/images/北京市东城区地坛景区-park.jpg",
    dynasty: "1530 年",
    builtYear: null,
    description: "明清两代帝王祭祀'皇地祇神'的场所，与天坛相对应，是北京市重点文物保护单位。",
    sources: [
      {
        title: "维基百科 · 北京市东城区地坛公园景区",
        url: "https://zh.wikipedia.org/wiki/北京市东城区地坛公园景区"
      }
    ]
  },
  {
    id: "中国紫檀museum",
    name: "中国紫檀博物馆",
    category: "博物馆/工艺美术",
    district: "朝阳区",
    latitude: 39.910684,
    longitude: 116.526055,
    zoomThreshold: 11,
    priority: 2,
    summary: "中国最大的紫檀木家具博物馆，收藏和展示明清及现代紫檀木家具精品。",
    tags: [
      "博物馆",
      "4A景区",
      "朝阳区",
      "工艺美术"
    ],
    cover: "https://example.com/images/中国紫檀museum.jpg",
    dynasty: "1995 年",
    builtYear: null,
    description: "中国最大的紫檀木家具博物馆，收藏和展示明清及现代紫檀木家具精品。",
    sources: [
      {
        title: "维基百科 · 中国紫檀博物馆",
        url: "https://zh.wikipedia.org/wiki/中国紫檀博物馆"
      }
    ]
  },
  {
    id: "beijing野生动物园scenic-area",
    name: "北京野生动物园景区",
    category: "野生动物园/生态旅游",
    district: "大兴区",
    latitude: 39.496435,
    longitude: 116.334681,
    zoomThreshold: 11,
    priority: 2,
    summary: "集野生动物保护、科普教育、休闲娱乐于一体的大型野生动物园。",
    tags: [
      "生态旅游",
      "4A景区",
      "野生动物园",
      "大兴区"
    ],
    cover: "https://example.com/images/beijing野生动物园scenic-area.jpg",
    dynasty: "1995 年",
    builtYear: null,
    description: "集野生动物保护、科普教育、休闲娱乐于一体的大型野生动物园。",
    sources: [
      {
        title: "维基百科 · 北京野生动物园景区",
        url: "https://zh.wikipedia.org/wiki/北京野生动物园景区"
      }
    ]
  },
  {
    id: "beijing国际鲜花港scenic-area",
    name: "北京国际鲜花港景区",
    category: "花卉园艺/休闲旅游",
    district: "顺义区",
    latitude: 40.180309,
    longitude: 116.796726,
    zoomThreshold: 11,
    priority: 2,
    summary: "以花卉展示、园艺科普、休闲度假为主题的大型花卉主题公园。",
    tags: [
      "花卉园艺",
      "休闲旅游",
      "顺义区",
      "4A景区"
    ],
    cover: "https://example.com/images/beijing国际鲜花港scenic-area.jpg",
    dynasty: "2005 年",
    builtYear: null,
    description: "以花卉展示、园艺科普、休闲度假为主题的大型花卉主题公园。",
    sources: [
      {
        title: "维基百科 · 北京国际鲜花港景区",
        url: "https://zh.wikipedia.org/wiki/北京国际鲜花港景区"
      }
    ]
  },
  {
    id: "小汤山现代农业科技示范园scenic-area",
    name: "小汤山现代农业科技示范园景区",
    category: "现代农业/科普教育",
    district: "昌平区",
    latitude: 40.153909,
    longitude: 116.428354,
    zoomThreshold: 11,
    priority: 2,
    summary: "展示现代农业科技成果，集观光、休闲、科普于一体的现代农业园区。",
    tags: [
      "现代农业",
      "4A景区",
      "昌平区",
      "科普教育"
    ],
    cover: "https://example.com/images/小汤山现代农业科技示范园scenic-area.jpg",
    dynasty: "2000 年",
    builtYear: null,
    description: "展示现代农业科技成果，集观光、休闲、科普于一体的现代农业园区。",
    sources: [
      {
        title: "维基百科 · 小汤山现代农业科技示范园景区",
        url: "https://zh.wikipedia.org/wiki/小汤山现代农业科技示范园景区"
      }
    ]
  },
  {
    id: "仙居谷风scenic-area",
    name: "仙居谷风景区",
    category: "自然风光",
    district: "密云区",
    latitude: 40.58736,
    longitude: 117.233682,
    zoomThreshold: 11,
    priority: 2,
    summary: "以自然风光和人文景观为主要特色的旅游景区。",
    tags: [
      "自然风光",
      "密云区",
      "4A景区"
    ],
    cover: "https://example.com/images/仙居谷风scenic-area.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "以自然风光和人文景观为主要特色的旅游景区。",
    sources: [
      {
        title: "维基百科 · 仙居谷风景区",
        url: "https://zh.wikipedia.org/wiki/仙居谷风景区"
      }
    ]
  },
  {
    id: "世界景区-park",
    name: "世界公园景区",
    category: "城市公园/休闲",
    district: "丰台区",
    latitude: 39.810604,
    longitude: 116.287794,
    zoomThreshold: 11,
    priority: 2,
    summary: "以园林艺术和自然风光为主要特色的旅游景区。",
    tags: [
      "休闲",
      "城市公园",
      "4A景区",
      "丰台区"
    ],
    cover: "https://example.com/images/世界景区-park.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "以园林艺术和自然风光为主要特色的旅游景区。",
    sources: [
      {
        title: "维基百科 · 世界公园景区",
        url: "https://zh.wikipedia.org/wiki/世界公园景区"
      }
    ]
  },
  {
    id: "beijing凤凰岭scenic-area",
    name: "北京凤凰岭景区",
    category: "待分类",
    district: "海淀区",
    latitude: 39.9042,
    longitude: 116.4074,
    zoomThreshold: 11,
    priority: 2,
    summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
    tags: [
      "海淀区",
      "4A景区"
    ],
    cover: "https://example.com/images/beijing凤凰岭scenic-area.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "北京市著名旅游景区，具有独特的文化和自然景观。",
    sources: [
      {
        title: "维基百科 · 北京凤凰岭景区",
        url: "https://zh.wikipedia.org/wiki/北京凤凰岭景区"
      }
    ]
  },
  {
    id: "pinggu区京东石林峡风scenic-area",
    name: "平谷区京东石林峡风景区",
    category: "自然风光",
    district: "平谷区",
    latitude: 40.140805,
    longitude: 117.121589,
    zoomThreshold: 11,
    priority: 2,
    summary: "以自然风光和人文景观为主要特色的旅游景区。",
    tags: [
      "自然风光",
      "4A景区",
      "平谷区"
    ],
    cover: "https://example.com/images/pinggu区京东石林峡风scenic-area.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "以自然风光和人文景观为主要特色的旅游景区。",
    sources: [
      {
        title: "维基百科 · 平谷区京东石林峡风景区",
        url: "https://zh.wikipedia.org/wiki/平谷区京东石林峡风景区"
      }
    ]
  },
  {
    id: "beijing雁栖湖scenic-area",
    name: "北京雁栖湖景区",
    category: "待分类",
    district: "怀柔区",
    latitude: 40.398099,
    longitude: 116.687296,
    zoomThreshold: 11,
    priority: 2,
    summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
    tags: [
      "4A景区",
      "怀柔区"
    ],
    cover: "https://example.com/images/beijing雁栖湖scenic-area.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "北京市著名旅游景区，具有独特的文化和自然景观。",
    sources: [
      {
        title: "维基百科 · 北京雁栖湖景区",
        url: "https://zh.wikipedia.org/wiki/北京雁栖湖景区"
      }
    ]
  },
  {
    id: "great-wall-八达岭水关景区",
    name: "八达岭水关长城景区",
    category: "历史文化/军事防御",
    district: "延庆区",
    latitude: 40.336502,
    longitude: 116.039227,
    zoomThreshold: 11,
    priority: 2,
    summary: "万里长城的重要组成部分，是中国古代军事防御工程的杰出代表。",
    tags: [
      "延庆区",
      "4A景区",
      "历史文化",
      "军事防御"
    ],
    cover: "https://example.com/images/great-wall-八达岭水关景区.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "万里长城的重要组成部分，是中国古代军事防御工程的杰出代表。",
    sources: [
      {
        title: "维基百科 · 八达岭水关长城景区",
        url: "https://zh.wikipedia.org/wiki/八达岭水关长城景区"
      }
    ]
  },
  {
    id: "great-wall-北京密云司马台景区",
    name: "北京密云司马台长城景区",
    category: "历史文化/军事防御",
    district: "密云区",
    latitude: 40.658241,
    longitude: 117.287475,
    zoomThreshold: 11,
    priority: 2,
    summary: "万里长城的重要组成部分，是中国古代军事防御工程的杰出代表。",
    tags: [
      "密云区",
      "4A景区",
      "历史文化",
      "军事防御"
    ],
    cover: "https://example.com/images/great-wall-北京密云司马台景区.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "万里长城的重要组成部分，是中国古代军事防御工程的杰出代表。",
    sources: [
      {
        title: "维基百科 · 北京密云司马台长城景区",
        url: "https://zh.wikipedia.org/wiki/北京密云司马台长城景区"
      }
    ]
  },
  {
    id: "yanqing区龙庆峡tourism区",
    name: "延庆区龙庆峡旅游区",
    category: "待分类",
    district: "延庆区",
    latitude: 40.545649,
    longitude: 116.010673,
    zoomThreshold: 11,
    priority: 2,
    summary: "以自然风光和人文景观为主要特色的旅游景区。",
    tags: [
      "延庆区",
      "4A景区"
    ],
    cover: "https://example.com/images/yanqing区龙庆峡tourism区.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "以自然风光和人文景观为主要特色的旅游景区。",
    sources: [
      {
        title: "维基百科 · 延庆区龙庆峡旅游区",
        url: "https://zh.wikipedia.org/wiki/延庆区龙庆峡旅游区"
      }
    ]
  },
  {
    id: "beijing市pinggu区丫髻山scenic-area",
    name: "北京市平谷区丫髻山景区",
    category: "待分类",
    district: "平谷区",
    latitude: 40.260844,
    longitude: 116.987658,
    zoomThreshold: 11,
    priority: 2,
    summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
    tags: [
      "4A景区",
      "平谷区"
    ],
    cover: "https://example.com/images/beijing市pinggu区丫髻山scenic-area.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "北京市著名旅游景区，具有独特的文化和自然景观。",
    sources: [
      {
        title: "维基百科 · 北京市平谷区丫髻山景区",
        url: "https://zh.wikipedia.org/wiki/北京市平谷区丫髻山景区"
      }
    ]
  },
  {
    id: "中国人民抗日战争纪念馆scenic-area",
    name: "中国人民抗日战争纪念馆景区",
    category: "待分类",
    district: "丰台区",
    latitude: 39.851796,
    longitude: 116.225921,
    zoomThreshold: 11,
    priority: 2,
    summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
    tags: [
      "丰台区",
      "4A景区"
    ],
    cover: "https://example.com/images/中国人民抗日战争纪念馆scenic-area.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "北京市著名旅游景区，具有独特的文化和自然景观。",
    sources: [
      {
        title: "维基百科 · 中国人民抗日战争纪念馆景区",
        url: "https://zh.wikipedia.org/wiki/中国人民抗日战争纪念馆景区"
      }
    ]
  },
  {
    id: "明城墙遗址-park",
    name: "明城墙遗址公园",
    category: "城市公园/休闲",
    district: "东城区",
    latitude: 39.901264,
    longitude: 116.427901,
    zoomThreshold: 11,
    priority: 2,
    summary: "以园林艺术和自然风光为主要特色的旅游景区。",
    tags: [
      "休闲",
      "城市公园",
      "4A景区",
      "东城区"
    ],
    cover: "https://example.com/images/明城墙遗址-park.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "以园林艺术和自然风光为主要特色的旅游景区。",
    sources: [
      {
        title: "维基百科 · 明城墙遗址公园",
        url: "https://zh.wikipedia.org/wiki/明城墙遗址公园"
      }
    ]
  },
  {
    id: "beijing市fangshan区周口店ruinsscenic-area",
    name: "北京市房山区周口店遗址景区",
    category: "历史文化/遗址",
    district: "房山区",
    latitude: 39.689989,
    longitude: 115.932959,
    zoomThreshold: 11,
    priority: 2,
    summary: "古代文明或历史事件的遗迹，具有重要的考古价值。",
    tags: [
      "房山区",
      "遗址",
      "4A景区",
      "历史文化"
    ],
    cover: "https://example.com/images/beijing市fangshan区周口店ruinsscenic-area.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "古代文明或历史事件的遗迹，具有重要的考古价值。",
    sources: [
      {
        title: "维基百科 · 北京市房山区周口店遗址景区",
        url: "https://zh.wikipedia.org/wiki/北京市房山区周口店遗址景区"
      }
    ]
  },
  {
    id: "beijing市fangshan区石花洞scenic-area",
    name: "北京市房山区石花洞景区",
    category: "待分类",
    district: "房山区",
    latitude: 39.797508,
    longitude: 115.943366,
    zoomThreshold: 11,
    priority: 2,
    summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
    tags: [
      "房山区",
      "4A景区"
    ],
    cover: "https://example.com/images/beijing市fangshan区石花洞scenic-area.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "北京市著名旅游景区，具有独特的文化和自然景观。",
    sources: [
      {
        title: "维基百科 · 北京市房山区石花洞景区",
        url: "https://zh.wikipedia.org/wiki/北京市房山区石花洞景区"
      }
    ]
  },
  {
    id: "beijing韩美林艺术馆culturescenic-area",
    name: "北京韩美林艺术馆文化景区",
    category: "待分类",
    district: "通州区",
    latitude: 39.876143,
    longitude: 116.676423,
    zoomThreshold: 11,
    priority: 2,
    summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
    tags: [
      "4A景区",
      "通州区"
    ],
    cover: "https://example.com/images/beijing韩美林艺术馆culturescenic-area.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "北京市著名旅游景区，具有独特的文化和自然景观。",
    sources: [
      {
        title: "维基百科 · 北京韩美林艺术馆文化景区",
        url: "https://zh.wikipedia.org/wiki/北京韩美林艺术馆文化景区"
      }
    ]
  },
  {
    id: "beijing海洋馆",
    name: "北京海洋馆",
    category: "待分类",
    district: "西城区",
    latitude: 39.944676,
    longitude: 116.340971,
    zoomThreshold: 11,
    priority: 2,
    summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
    tags: [
      "4A景区",
      "西城区"
    ],
    cover: "https://example.com/images/beijing海洋馆.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "北京市著名旅游景区，具有独特的文化和自然景观。",
    sources: [
      {
        title: "维基百科 · 北京海洋馆",
        url: "https://zh.wikipedia.org/wiki/北京海洋馆"
      }
    ]
  },
  {
    id: "金海湖风scenic-area",
    name: "金海湖风景区",
    category: "自然风光",
    district: "平谷区",
    latitude: 40.173475,
    longitude: 117.302495,
    zoomThreshold: 11,
    priority: 2,
    summary: "以自然风光和人文景观为主要特色的旅游景区。",
    tags: [
      "自然风光",
      "4A景区",
      "平谷区"
    ],
    cover: "https://example.com/images/金海湖风scenic-area.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "以自然风光和人文景观为主要特色的旅游景区。",
    sources: [
      {
        title: "维基百科 · 金海湖风景区",
        url: "https://zh.wikipedia.org/wiki/金海湖风景区"
      }
    ]
  },
  {
    id: "北京市玉渊潭景区-park",
    name: "北京市玉渊潭公园景区",
    category: "城市公园/休闲",
    district: "海淀区",
    latitude: 39.91662,
    longitude: 116.319932,
    zoomThreshold: 11,
    priority: 2,
    summary: "以园林艺术和自然风光为主要特色的旅游景区。",
    tags: [
      "休闲",
      "城市公园",
      "4A景区",
      "海淀区"
    ],
    cover: "https://example.com/images/北京市玉渊潭景区-park.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "以园林艺术和自然风光为主要特色的旅游景区。",
    sources: [
      {
        title: "维基百科 · 北京市玉渊潭公园景区",
        url: "https://zh.wikipedia.org/wiki/北京市玉渊潭公园景区"
      }
    ]
  },
  {
    id: "great-wall-北京黄花城水旅游区",
    name: "北京黄花城水长城旅游区",
    category: "历史文化/军事防御",
    district: "怀柔区",
    latitude: 40.413026,
    longitude: 116.303862,
    zoomThreshold: 11,
    priority: 2,
    summary: "万里长城的重要组成部分，是中国古代军事防御工程的杰出代表。",
    tags: [
      "4A景区",
      "历史文化",
      "军事防御",
      "怀柔区"
    ],
    cover: "https://example.com/images/great-wall-北京黄花城水旅游区.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "万里长城的重要组成部分，是中国古代军事防御工程的杰出代表。",
    sources: [
      {
        title: "维基百科 · 北京黄花城水长城旅游区",
        url: "https://zh.wikipedia.org/wiki/北京黄花城水长城旅游区"
      }
    ]
  },
  {
    id: "beijing市mentougou区戒台寺scenic-area",
    name: "北京市门头沟区戒台寺景区",
    category: "待分类",
    district: "门头沟区",
    latitude: 39.87053,
    longitude: 116.086534,
    zoomThreshold: 11,
    priority: 2,
    summary: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
    tags: [
      "门头沟区",
      "4A景区"
    ],
    cover: "https://example.com/images/beijing市mentougou区戒台寺scenic-area.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
    sources: [
      {
        title: "维基百科 · 北京市门头沟区戒台寺景区",
        url: "https://zh.wikipedia.org/wiki/北京市门头沟区戒台寺景区"
      }
    ]
  },
  {
    id: "东城区龙潭景区-park",
    name: "东城区龙潭公园景区",
    category: "城市公园/休闲",
    district: "东城区",
    latitude: 39.9042,
    longitude: 116.4074,
    zoomThreshold: 11,
    priority: 2,
    summary: "以园林艺术和自然风光为主要特色的旅游景区。",
    tags: [
      "休闲",
      "城市公园",
      "4A景区",
      "东城区"
    ],
    cover: "https://example.com/images/东城区龙潭景区-park.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "以园林艺术和自然风光为主要特色的旅游景区。",
    sources: [
      {
        title: "维基百科 · 东城区龙潭公园景区",
        url: "https://zh.wikipedia.org/wiki/东城区龙潭公园景区"
      }
    ]
  },
  {
    id: "beijing龙脉温泉scenic-area",
    name: "北京龙脉温泉景区",
    category: "待分类",
    district: "昌平区",
    latitude: 40.179153,
    longitude: 116.399493,
    zoomThreshold: 11,
    priority: 2,
    summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
    tags: [
      "4A景区",
      "昌平区"
    ],
    cover: "https://example.com/images/beijing龙脉温泉scenic-area.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "北京市著名旅游景区，具有独特的文化和自然景观。",
    sources: [
      {
        title: "维基百科 · 北京龙脉温泉景区",
        url: "https://zh.wikipedia.org/wiki/北京龙脉温泉景区"
      }
    ]
  },
  {
    id: "北京市景山景区-park",
    name: "北京市景山公园景区",
    category: "城市公园/休闲",
    district: "西城区",
    latitude: 39.925875,
    longitude: 116.396551,
    zoomThreshold: 11,
    priority: 2,
    summary: "以园林艺术和自然风光为主要特色的旅游景区。",
    tags: [
      "休闲",
      "城市公园",
      "4A景区",
      "西城区"
    ],
    cover: "https://example.com/images/北京市景山景区-park.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "以园林艺术和自然风光为主要特色的旅游景区。",
    sources: [
      {
        title: "维基百科 · 北京市景山公园景区",
        url: "https://zh.wikipedia.org/wiki/北京市景山公园景区"
      }
    ]
  },
  {
    id: "huairou青龙峡tourism区",
    name: "怀柔青龙峡旅游区",
    category: "待分类",
    district: "怀柔区",
    latitude: 40.472902,
    longitude: 116.66447,
    zoomThreshold: 11,
    priority: 2,
    summary: "以自然风光和人文景观为主要特色的旅游景区。",
    tags: [
      "4A景区",
      "怀柔区"
    ],
    cover: "https://example.com/images/huairou青龙峡tourism区.jpg",
    dynasty: "待查询",
    builtYear: null,
    description: "以自然风光和人文景观为主要特色的旅游景区。",
    sources: [
      {
        title: "维基百科 · 怀柔青龙峡旅游区",
        url: "https://zh.wikipedia.org/wiki/怀柔青龙峡旅游区"
      }
    ]
  },
  {
  id: "beijing十渡风scenic-area",
  name: "北京十渡风景区",
  category: "自然风光",
  district: "房山区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 11,
  priority: 2,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "房山区",
    "自然风光",
    "4A景区"
  ],
  cover: "https://example.com/images/beijing十渡风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京十渡风景区",
      url: "https://zh.wikipedia.org/wiki/北京十渡风景区"
    }
  ]
},
{
  id: "朝阳景区-park",
  name: "朝阳公园景区",
  category: "城市公园/休闲",
  district: "朝阳区",
  latitude: 39.944093,
  longitude: 116.482276,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "4A景区",
    "朝阳区"
  ],
  cover: "https://example.com/images/朝阳景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 朝阳公园景区",
      url: "https://zh.wikipedia.org/wiki/朝阳公园景区"
    }
  ]
},
{
  id: "世界花卉大观园scenic-area",
  name: "世界花卉大观园景区",
  category: "待分类",
  district: "丰台区",
  latitude: 39.835332,
  longitude: 116.353217,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "丰台区",
    "4A景区"
  ],
  cover: "https://example.com/images/世界花卉大观园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 世界花卉大观园景区",
      url: "https://zh.wikipedia.org/wiki/世界花卉大观园景区"
    }
  ]
},
{
  id: "北京市石景山区八大处景区-park",
  name: "北京市石景山区八大处公园景区",
  category: "城市公园/休闲",
  district: "石景山区",
  latitude: 39.962679,
  longitude: 116.184358,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "4A景区",
    "石景山区"
  ],
  cover: "https://example.com/images/北京市石景山区八大处景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市石景山区八大处公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市石景山区八大处公园景区"
    }
  ]
},
{
  id: "八奇洞scenic-area",
  name: "八奇洞景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 39.892944,
  longitude: 116.026874,
  zoomThreshold: 11,
  priority: 2,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "4A景区"
  ],
  cover: "https://example.com/images/八奇洞scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 八奇洞景区",
      url: "https://zh.wikipedia.org/wiki/八奇洞景区"
    }
  ]
},
{
  id: "银山塔林风scenic-area",
  name: "银山塔林风景区",
  category: "自然风光",
  district: "昌平区",
  latitude: 40.319932,
  longitude: 116.32785,
  zoomThreshold: 11,
  priority: 2,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "自然风光",
    "4A景区",
    "昌平区"
  ],
  cover: "https://example.com/images/银山塔林风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 银山塔林风景区",
      url: "https://zh.wikipedia.org/wiki/银山塔林风景区"
    }
  ]
},
{
  id: "beijing圣莲山tourism风scenic-area",
  name: "北京圣莲山旅游风景区",
  category: "自然风光",
  district: "房山区",
  latitude: 39.762034,
  longitude: 116.437254,
  zoomThreshold: 11,
  priority: 2,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "房山区",
    "自然风光",
    "4A景区"
  ],
  cover: "https://example.com/images/beijing圣莲山tourism风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京圣莲山旅游风景区",
      url: "https://zh.wikipedia.org/wiki/北京圣莲山旅游风景区"
    }
  ]
},
{
  id: "beijing渔阳国际滑雪场scenic-area",
  name: "北京渔阳国际滑雪场景区",
  category: "待分类",
  district: "平谷区",
  latitude: 40.077197,
  longitude: 117.147716,
  zoomThreshold: 11,
  priority: 2,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "4A景区",
    "平谷区"
  ],
  cover: "https://example.com/images/beijing渔阳国际滑雪场scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京渔阳国际滑雪场景区",
      url: "https://zh.wikipedia.org/wiki/北京渔阳国际滑雪场景区"
    }
  ]
},
{
  id: "great-wall-居庸关景区",
  name: "居庸关长城景区",
  category: "历史文化/军事防御",
  district: "昌平区",
  latitude: 40.291161,
  longitude: 116.073088,
  zoomThreshold: 11,
  priority: 2,
  summary: "万里长城的重要组成部分，是中国古代军事防御工程的杰出代表。",
  tags: [
    "昌平区",
    "4A景区",
    "历史文化",
    "军事防御"
  ],
  cover: "https://example.com/images/great-wall-居庸关景区.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "万里长城的重要组成部分，是中国古代军事防御工程的杰出代表。",
  sources: [
    {
      title: "维基百科 · 居庸关长城景区",
      url: "https://zh.wikipedia.org/wiki/居庸关长城景区"
    }
  ]
},
{
  id: "beijing市fangshan区云居寺scenic-area",
  name: "北京市房山区云居寺景区",
  category: "待分类",
  district: "房山区",
  latitude: 39.609037,
  longitude: 115.774477,
  zoomThreshold: 11,
  priority: 2,
  summary: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
  tags: [
    "房山区",
    "4A景区"
  ],
  cover: "https://example.com/images/beijing市fangshan区云居寺scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
  sources: [
    {
      title: "维基百科 · 北京市房山区云居寺景区",
      url: "https://zh.wikipedia.org/wiki/北京市房山区云居寺景区"
    }
  ]
},
{
  id: "中央电视塔scenic-area",
  name: "中央电视塔景区",
  category: "待分类",
  district: "海淀区",
  latitude: 39.918852,
  longitude: 116.307016,
  zoomThreshold: 11,
  priority: 2,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "海淀区",
    "4A景区"
  ],
  cover: "https://example.com/images/中央电视塔scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 中央电视塔景区",
      url: "https://zh.wikipedia.org/wiki/中央电视塔景区"
    }
  ]
},
{
  id: "beijing市huairou区红螺寺scenic-area",
  name: "北京市怀柔区红螺寺景区",
  category: "待分类",
  district: "怀柔区",
  latitude: 40.374909,
  longitude: 116.622231,
  zoomThreshold: 11,
  priority: 2,
  summary: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
  tags: [
    "4A景区",
    "怀柔区"
  ],
  cover: "https://example.com/images/beijing市huairou区红螺寺scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
  sources: [
    {
      title: "维基百科 · 北京市怀柔区红螺寺景区",
      url: "https://zh.wikipedia.org/wiki/北京市怀柔区红螺寺景区"
    }
  ]
},
{
  id: "南宫tourismscenic-area",
  name: "南宫旅游景区",
  category: "待分类",
  district: "丰台区",
  latitude: 39.794553,
  longitude: 116.152121,
  zoomThreshold: 11,
  priority: 2,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "丰台区",
    "4A景区"
  ],
  cover: "https://example.com/images/南宫tourismscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 南宫旅游景区",
      url: "https://zh.wikipedia.org/wiki/南宫旅游景区"
    }
  ]
},
{
  id: "北京市中山景区-park",
  name: "北京市中山公园景区",
  category: "城市公园/休闲",
  district: "东城区",
  latitude: 39.910707,
  longitude: 116.394407,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "4A景区",
    "东城区"
  ],
  cover: "https://example.com/images/北京市中山景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市中山公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市中山公园景区"
    }
  ]
},
{
  id: "北京市香山景区-park",
  name: "北京市香山公园景区",
  category: "城市公园/休闲",
  district: "海淀区",
  latitude: 39.990107,
  longitude: 116.188746,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "4A景区",
    "海淀区"
  ],
  cover: "https://example.com/images/北京市香山景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市香山公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市香山公园景区"
    }
  ]
},
{
  id: "中国航空museumtourism区",
  name: "中国航空博物馆旅游区",
  category: "文化/博物馆",
  district: "昌平区",
  latitude: 40.172109,
  longitude: 116.35638,
  zoomThreshold: 11,
  priority: 2,
  summary: "收藏、展示和研究各类文物的文化机构。",
  tags: [
    "博物馆",
    "4A景区",
    "昌平区",
    "文化"
  ],
  cover: "https://example.com/images/中国航空museumtourism区.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "收藏、展示和研究各类文物的文化机构。",
  sources: [
    {
      title: "维基百科 · 中国航空博物馆旅游区",
      url: "https://zh.wikipedia.org/wiki/中国航空博物馆旅游区"
    }
  ]
},
{
  id: "pinggu京东大峡谷tourism区",
  name: "平谷京东大峡谷旅游区",
  category: "待分类",
  district: "平谷区",
  latitude: 40.247057,
  longitude: 117.156631,
  zoomThreshold: 11,
  priority: 2,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "4A景区",
    "平谷区"
  ],
  cover: "https://example.com/images/pinggu京东大峡谷tourism区.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 平谷京东大峡谷旅游区",
      url: "https://zh.wikipedia.org/wiki/平谷京东大峡谷旅游区"
    }
  ]
},
{
  id: "北京市北海旅游区-park",
  name: "北京市北海公园旅游区",
  category: "城市公园/休闲",
  district: "西城区",
  latitude: 39.928775,
  longitude: 116.391802,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "4A景区",
    "西城区"
  ],
  cover: "https://example.com/images/北京市北海旅游区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市北海公园旅游区",
      url: "https://zh.wikipedia.org/wiki/北京市北海公园旅游区"
    }
  ]
},
{
  id: "潭柘寺scenic-area",
  name: "潭柘寺景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 39.903428,
  longitude: 116.0306,
  zoomThreshold: 11,
  priority: 2,
  summary: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
  tags: [
    "门头沟区",
    "4A景区"
  ],
  cover: "https://example.com/images/潭柘寺scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
  sources: [
    {
      title: "维基百科 · 潭柘寺景区",
      url: "https://zh.wikipedia.org/wiki/潭柘寺景区"
    }
  ]
},
{
  id: "beijing市欢乐谷scenic-area",
  name: "北京市欢乐谷景区",
  category: "待分类",
  district: "朝阳区",
  latitude: 39.866565,
  longitude: 116.499173,
  zoomThreshold: 11,
  priority: 2,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "4A景区",
    "朝阳区"
  ],
  cover: "https://example.com/images/beijing市欢乐谷scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京市欢乐谷景区",
      url: "https://zh.wikipedia.org/wiki/北京市欢乐谷景区"
    }
  ]
},
{
  id: "国家botanical园scenic-area",
  name: "国家植物园景区",
  category: "植物/生态",
  district: "海淀区",
  latitude: 39.993626,
  longitude: 116.21463,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "植物",
    "4A景区",
    "海淀区",
    "生态"
  ],
  cover: "https://example.com/images/国家botanical园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 国家植物园景区",
      url: "https://zh.wikipedia.org/wiki/国家植物园景区"
    }
  ]
},
{
  id: "beijing汽车museumscenic-area",
  name: "北京汽车博物馆景区",
  category: "文化/博物馆",
  district: "丰台区",
  latitude: 39.829668,
  longitude: 116.301306,
  zoomThreshold: 11,
  priority: 2,
  summary: "收藏、展示和研究各类文物的文化机构。",
  tags: [
    "博物馆",
    "4A景区",
    "丰台区",
    "文化"
  ],
  cover: "https://example.com/images/beijing汽车museumscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "收藏、展示和研究各类文物的文化机构。",
  sources: [
    {
      title: "维基百科 · 北京汽车博物馆景区",
      url: "https://zh.wikipedia.org/wiki/北京汽车博物馆景区"
    }
  ]
},
{
  id: "beijingyanqing百里山水画廊scenic-area",
  name: "北京延庆百里山水画廊景区",
  category: "待分类",
  district: "延庆区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 11,
  priority: 2,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "延庆区",
    "4A景区"
  ],
  cover: "https://example.com/images/beijingyanqing百里山水画廊scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京延庆百里山水画廊景区",
      url: "https://zh.wikipedia.org/wiki/北京延庆百里山水画廊景区"
    }
  ]
},
{
  id: "丰台区北宫森林景区-park",
  name: "丰台区北宫森林公园景区",
  category: "城市公园/休闲",
  district: "丰台区",
  latitude: 39.883113,
  longitude: 116.154774,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "4A景区",
    "丰台区"
  ],
  cover: "https://example.com/images/丰台区北宫森林景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 丰台区北宫森林公园景区",
      url: "https://zh.wikipedia.org/wiki/丰台区北宫森林公园景区"
    }
  ]
},
{
  id: "紫竹院景区-park",
  name: "紫竹院公园景区",
  category: "城市公园/休闲",
  district: "海淀区",
  latitude: 39.942352,
  longitude: 116.319079,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "4A景区",
    "海淀区"
  ],
  cover: "https://example.com/images/紫竹院景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 紫竹院公园景区",
      url: "https://zh.wikipedia.org/wiki/紫竹院公园景区"
    }
  ]
},
{
  id: "首都museum",
  name: "首都博物馆",
  category: "文化/博物馆",
  district: "西城区",
  latitude: 39.906412,
  longitude: 116.342067,
  zoomThreshold: 11,
  priority: 2,
  summary: "收藏、展示和研究各类文物的文化机构。",
  tags: [
    "博物馆",
    "西城区",
    "4A景区",
    "文化"
  ],
  cover: "https://example.com/images/首都museum.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "收藏、展示和研究各类文物的文化机构。",
  sources: [
    {
      title: "维基百科 · 首都博物馆",
      url: "https://zh.wikipedia.org/wiki/首都博物馆"
    }
  ]
},
{
  id: "北京市顺义区奥林匹克水上景区-park",
  name: "北京市顺义区奥林匹克水上公园景区",
  category: "城市公园/休闲",
  district: "顺义区",
  latitude: 40.171245,
  longitude: 116.686673,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "4A景区",
    "顺义区"
  ],
  cover: "https://example.com/images/北京市顺义区奥林匹克水上景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市顺义区奥林匹克水上公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市顺义区奥林匹克水上公园景区"
    }
  ]
},
{
  id: "beijingshijingshan游乐园scenic-area",
  name: "北京石景山游乐园景区",
  category: "待分类",
  district: "石景山区",
  latitude: 39.911986,
  longitude: 116.208645,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "石景山区",
    "4A景区"
  ],
  cover: "https://example.com/images/beijingshijingshan游乐园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京石景山游乐园景区",
      url: "https://zh.wikipedia.org/wiki/北京石景山游乐园景区"
    }
  ]
},
{
  id: "北京市陶然亭景区-park",
  name: "北京市陶然亭公园景区",
  category: "城市公园/休闲",
  district: "西城区",
  latitude: 39.874496,
  longitude: 116.381921,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "4A景区",
    "西城区"
  ],
  cover: "https://example.com/images/北京市陶然亭景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市陶然亭公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市陶然亭公园景区"
    }
  ]
},
{
  id: "beijing张裕爱斐堡国际酒庄tourismscenic-area",
  name: "北京张裕爱斐堡国际酒庄旅游景区",
  category: "待分类",
  district: "密云区",
  latitude: 40.378169,
  longitude: 116.900269,
  zoomThreshold: 11,
  priority: 2,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "密云区",
    "4A景区"
  ],
  cover: "https://example.com/images/beijing张裕爱斐堡国际酒庄tourismscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京张裕爱斐堡国际酒庄旅游景区",
      url: "https://zh.wikipedia.org/wiki/北京张裕爱斐堡国际酒庄旅游景区"
    }
  ]
},
{
  id: "beijing天文馆scenic-area",
  name: "北京天文馆景区",
  category: "待分类",
  district: "西城区",
  latitude: 39.937306,
  longitude: 116.336833,
  zoomThreshold: 11,
  priority: 2,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "4A景区",
    "西城区"
  ],
  cover: "https://example.com/images/beijing天文馆scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京天文馆景区",
      url: "https://zh.wikipedia.org/wiki/北京天文馆景区"
    }
  ]
},
{
  id: "孔庙和国子监museumscenic-area",
  name: "孔庙和国子监博物馆景区",
  category: "文化/博物馆",
  district: "东城区",
  latitude: 39.946631,
  longitude: 116.413879,
  zoomThreshold: 11,
  priority: 2,
  summary: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
  tags: [
    "博物馆",
    "4A景区",
    "东城区",
    "文化"
  ],
  cover: "https://example.com/images/孔庙和国子监museumscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
  sources: [
    {
      title: "维基百科 · 孔庙和国子监博物馆景区",
      url: "https://zh.wikipedia.org/wiki/孔庙和国子监博物馆景区"
    }
  ]
},
{
  id: "野鸭湖scenic-area",
  name: "野鸭湖景区",
  category: "待分类",
  district: "延庆区",
  latitude: 40.408931,
  longitude: 115.857721,
  zoomThreshold: 11,
  priority: 2,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "延庆区",
    "4A景区"
  ],
  cover: "https://example.com/images/野鸭湖scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 野鸭湖景区",
      url: "https://zh.wikipedia.org/wiki/野鸭湖景区"
    }
  ]
},
{
  id: "beijing动物园scenic-area",
  name: "北京动物园景区",
  category: "野生动物/生态",
  district: "西城区",
  latitude: 39.942105,
  longitude: 116.336701,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "野生动物",
    "西城区",
    "4A景区",
    "生态"
  ],
  cover: "https://example.com/images/beijing动物园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京动物园景区",
      url: "https://zh.wikipedia.org/wiki/北京动物园景区"
    }
  ]
},
{
  id: "beijing园博园scenic-area",
  name: "北京园博园景区",
  category: "待分类",
  district: "丰台区",
  latitude: 39.876665,
  longitude: 116.190595,
  zoomThreshold: 11,
  priority: 2,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "丰台区",
    "4A景区"
  ],
  cover: "https://example.com/images/beijing园博园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京园博园景区",
      url: "https://zh.wikipedia.org/wiki/北京园博园景区"
    }
  ]
},
{
  id: "谷山村scenic-area",
  name: "谷山村景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 39.993207,
  longitude: 116.057159,
  zoomThreshold: 11,
  priority: 2,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "4A景区"
  ],
  cover: "https://example.com/images/谷山村scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 谷山村景区",
      url: "https://zh.wikipedia.org/wiki/谷山村景区"
    }
  ]
},
{
  id: "beijing首创奥莱休闲驿站scenic-area",
  name: "北京首创奥莱休闲驿站景区",
  category: "待分类",
  district: "房山区",
  latitude: 39.763662,
  longitude: 116.186973,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "房山区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing首创奥莱休闲驿站scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京首创奥莱休闲驿站景区",
      url: "https://zh.wikipedia.org/wiki/北京首创奥莱休闲驿站景区"
    }
  ]
},
{
  id: "beijing京西古道scenic-area",
  name: "北京京西古道景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 39.966803,
  longitude: 116.048993,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing京西古道scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京京西古道景区",
      url: "https://zh.wikipedia.org/wiki/北京京西古道景区"
    }
  ]
},
{
  id: "乐谷银滩风scenic-area",
  name: "乐谷银滩风景区",
  category: "自然风光",
  district: "房山区",
  latitude: 39.61902,
  longitude: 115.666216,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "房山区",
    "自然风光",
    "3A景区"
  ],
  cover: "https://example.com/images/乐谷银滩风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 乐谷银滩风景区",
      url: "https://zh.wikipedia.org/wiki/乐谷银滩风景区"
    }
  ]
},
{
  id: "beijing草莓博览园scenic-area",
  name: "北京草莓博览园景区",
  category: "待分类",
  district: "昌平区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "昌平区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing草莓博览园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京草莓博览园景区",
      url: "https://zh.wikipedia.org/wiki/北京草莓博览园景区"
    }
  ]
},
{
  id: "神泉峡scenic-area",
  name: "神泉峡景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 40.048017,
  longitude: 115.974434,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/神泉峡scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 神泉峡景区",
      url: "https://zh.wikipedia.org/wiki/神泉峡景区"
    }
  ]
},
{
  id: "蓝调庄园scenic-area",
  name: "蓝调庄园景区",
  category: "待分类",
  district: "朝阳区",
  latitude: 39.965633,
  longitude: 116.607927,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/蓝调庄园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 蓝调庄园景区",
      url: "https://zh.wikipedia.org/wiki/蓝调庄园景区"
    }
  ]
},
{
  id: "北京市朝阳区红领巾景区-park",
  name: "北京市朝阳区红领巾公园景区",
  category: "城市公园/休闲",
  district: "朝阳区",
  latitude: 39.927301,
  longitude: 116.491796,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/北京市朝阳区红领巾景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市朝阳区红领巾公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市朝阳区红领巾公园景区"
    }
  ]
},
{
  id: "beijing雾灵西峰scenic-area",
  name: "北京雾灵西峰景区",
  category: "待分类",
  district: "密云区",
  latitude: 40.634225,
  longitude: 117.361722,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "密云区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing雾灵西峰scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京雾灵西峰景区",
      url: "https://zh.wikipedia.org/wiki/北京雾灵西峰景区"
    }
  ]
},
{
  id: "龙门ecological园scenic-area",
  name: "龙门生态园景区",
  category: "待分类",
  district: "房山区",
  latitude: 39.721024,
  longitude: 116.102942,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "房山区",
    "3A景区"
  ],
  cover: "https://example.com/images/龙门ecological园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 龙门生态园景区",
      url: "https://zh.wikipedia.org/wiki/龙门生态园景区"
    }
  ]
},
{
  id: "北京西山国家森林(昌华景区)-park",
  name: "北京西山国家森林公园(昌华景区)",
  category: "城市公园/休闲",
  district: "海淀区",
  latitude: 39.975185,
  longitude: 116.193063,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "海淀区",
    "3A景区"
  ],
  cover: "https://example.com/images/北京西山国家森林(昌华景区)-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京西山国家森林公园(昌华景区)",
      url: "https://zh.wikipedia.org/wiki/北京西山国家森林公园(昌华景区)"
    }
  ]
},
{
  id: "坡峰岭风scenic-area",
  name: "坡峰岭风景区",
  category: "自然风光",
  district: "房山区",
  latitude: 39.694485,
  longitude: 115.853844,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "房山区",
    "自然风光",
    "3A景区"
  ],
  cover: "https://example.com/images/坡峰岭风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 坡峰岭风景区",
      url: "https://zh.wikipedia.org/wiki/坡峰岭风景区"
    }
  ]
},
{
  id: "yanqing区八达岭野生动物世界scenic-area",
  name: "延庆区八达岭野生动物世界景区",
  category: "待分类",
  district: "延庆区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "延庆区",
    "3A景区"
  ],
  cover: "https://example.com/images/yanqing区八达岭野生动物世界scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 延庆区八达岭野生动物世界景区",
      url: "https://zh.wikipedia.org/wiki/延庆区八达岭野生动物世界景区"
    }
  ]
},
{
  id: "beijing太平洋海底世界博览馆scenic-area",
  name: "北京太平洋海底世界博览馆景区",
  category: "待分类",
  district: "海淀区",
  latitude: 39.919097,
  longitude: 116.306264,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "海淀区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing太平洋海底世界博览馆scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京太平洋海底世界博览馆景区",
      url: "https://zh.wikipedia.org/wiki/北京太平洋海底世界博览馆景区"
    }
  ]
},
{
  id: "中国印刷museumscenic-area",
  name: "中国印刷博物馆景区",
  category: "文化/博物馆",
  district: "大兴区",
  latitude: 39.743478,
  longitude: 116.33147,
  zoomThreshold: 12,
  priority: 3,
  summary: "收藏、展示和研究各类文物的文化机构。",
  tags: [
    "博物馆",
    "3A景区",
    "大兴区",
    "文化"
  ],
  cover: "https://example.com/images/中国印刷museumscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "收藏、展示和研究各类文物的文化机构。",
  sources: [
    {
      title: "维基百科 · 中国印刷博物馆景区",
      url: "https://zh.wikipedia.org/wiki/中国印刷博物馆景区"
    }
  ]
},
{
  id: "北京市朝阳区白鹿景区-park",
  name: "北京市朝阳区白鹿公园景区",
  category: "城市公园/休闲",
  district: "朝阳区",
  latitude: 39.8783,
  longitude: 116.554324,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/北京市朝阳区白鹿景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市朝阳区白鹿公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市朝阳区白鹿公园景区"
    }
  ]
},
{
  id: "beijing市留民营ecologicaltourismscenic-area",
  name: "北京市留民营生态旅游景区",
  category: "待分类",
  district: "大兴区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "3A景区",
    "大兴区"
  ],
  cover: "https://example.com/images/beijing市留民营ecologicaltourismscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京市留民营生态旅游景区",
      url: "https://zh.wikipedia.org/wiki/北京市留民营生态旅游景区"
    }
  ]
},
{
  id: "beijing大觉寺scenic-area",
  name: "北京大觉寺景区",
  category: "待分类",
  district: "海淀区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 12,
  priority: 3,
  summary: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
  tags: [
    "海淀区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing大觉寺scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
  sources: [
    {
      title: "维基百科 · 北京大觉寺景区",
      url: "https://zh.wikipedia.org/wiki/北京大觉寺景区"
    }
  ]
},
{
  id: "云梦仙境scenic-area",
  name: "云梦仙境景区",
  category: "待分类",
  district: "怀柔区",
  latitude: 40.615605,
  longitude: 116.694355,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "3A景区",
    "怀柔区"
  ],
  cover: "https://example.com/images/云梦仙境scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 云梦仙境景区",
      url: "https://zh.wikipedia.org/wiki/云梦仙境景区"
    }
  ]
},
{
  id: "上方山scenic-area",
  name: "上方山景区",
  category: "待分类",
  district: "房山区",
  latitude: 39.6822,
  longitude: 115.81683,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "房山区",
    "3A景区"
  ],
  cover: "https://example.com/images/上方山scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 上方山景区",
      url: "https://zh.wikipedia.org/wiki/上方山景区"
    }
  ]
},
{
  id: "beijing白草畔自然风scenic-area",
  name: "北京白草畔自然风景区",
  category: "自然风光",
  district: "房山区",
  latitude: 39.807628,
  longitude: 115.603611,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "房山区",
    "自然风光",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing白草畔自然风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京白草畔自然风景区",
      url: "https://zh.wikipedia.org/wiki/北京白草畔自然风景区"
    }
  ]
},
{
  id: "great-wall-北京响水湖旅游区",
  name: "北京响水湖长城旅游区",
  category: "历史文化/军事防御",
  district: "怀柔区",
  latitude: 40.451447,
  longitude: 116.452995,
  zoomThreshold: 12,
  priority: 3,
  summary: "万里长城的重要组成部分，是中国古代军事防御工程的杰出代表。",
  tags: [
    "3A景区",
    "历史文化",
    "军事防御",
    "怀柔区"
  ],
  cover: "https://example.com/images/great-wall-北京响水湖旅游区.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "万里长城的重要组成部分，是中国古代军事防御工程的杰出代表。",
  sources: [
    {
      title: "维基百科 · 北京响水湖长城旅游区",
      url: "https://zh.wikipedia.org/wiki/北京响水湖长城旅游区"
    }
  ]
},
{
  id: "北京青龙湖景区-park",
  name: "北京青龙湖公园景区",
  category: "城市公园/休闲",
  district: "丰台区",
  latitude: 39.796848,
  longitude: 116.088804,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "3A景区",
    "丰台区"
  ],
  cover: "https://example.com/images/北京青龙湖景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京青龙湖公园景区",
      url: "https://zh.wikipedia.org/wiki/北京青龙湖公园景区"
    }
  ]
},
{
  id: "beijing市宣武艺园scenic-area",
  name: "北京市宣武艺园景区",
  category: "待分类",
  district: "西城区",
  latitude: 39.895139,
  longitude: 116.359246,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "3A景区",
    "西城区"
  ],
  cover: "https://example.com/images/beijing市宣武艺园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市宣武艺园景区",
      url: "https://zh.wikipedia.org/wiki/北京市宣武艺园景区"
    }
  ]
},
{
  id: "beijing老舍茶馆scenic-area",
  name: "北京老舍茶馆景区",
  category: "待分类",
  district: "西城区",
  latitude: 39.904179,
  longitude: 116.407387,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "3A景区",
    "西城区"
  ],
  cover: "https://example.com/images/beijing老舍茶馆scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京老舍茶馆景区",
      url: "https://zh.wikipedia.org/wiki/北京老舍茶馆景区"
    }
  ]
},
{
  id: "beijing市fangshan区韩村河scenic-area",
  name: "北京市房山区韩村河景区",
  category: "待分类",
  district: "房山区",
  latitude: 39.603441,
  longitude: 115.957093,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "房山区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing市fangshan区韩村河scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京市房山区韩村河景区",
      url: "https://zh.wikipedia.org/wiki/北京市房山区韩村河景区"
    }
  ]
},
{
  id: "beijing市京西十八潭scenic-area",
  name: "北京市京西十八潭景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 40.003303,
  longitude: 115.908906,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing市京西十八潭scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京市京西十八潭景区",
      url: "https://zh.wikipedia.org/wiki/北京市京西十八潭景区"
    }
  ]
},
{
  id: "中国民兵武器装备陈列馆",
  name: "中国民兵武器装备陈列馆",
  category: "待分类",
  district: "通州区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "通州区",
    "3A景区"
  ],
  cover: "https://example.com/images/中国民兵武器装备陈列馆.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 中国民兵武器装备陈列馆",
      url: "https://zh.wikipedia.org/wiki/中国民兵武器装备陈列馆"
    }
  ]
},
{
  id: "妙峰山风scenic-area",
  name: "妙峰山风景区",
  category: "自然风光",
  district: "门头沟区",
  latitude: 40.073623,
  longitude: 116.020215,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "自然风光",
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/妙峰山风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 妙峰山风景区",
      url: "https://zh.wikipedia.org/wiki/妙峰山风景区"
    }
  ]
},
{
  id: "捧河湾自然风scenic-area",
  name: "捧河湾自然风景区",
  category: "自然风光",
  district: "密云区",
  latitude: 40.614608,
  longitude: 116.813353,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "自然风光",
    "密云区",
    "3A景区"
  ],
  cover: "https://example.com/images/捧河湾自然风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 捧河湾自然风景区",
      url: "https://zh.wikipedia.org/wiki/捧河湾自然风景区"
    }
  ]
},
{
  id: "百花山自然风scenic-area",
  name: "百花山自然风景区",
  category: "自然风光",
  district: "门头沟区",
  latitude: 39.85743,
  longitude: 115.616563,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "自然风光",
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/百花山自然风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 百花山自然风景区",
      url: "https://zh.wikipedia.org/wiki/百花山自然风景区"
    }
  ]
},
{
  id: "beijing云峰山scenic-area",
  name: "北京云峰山景区",
  category: "待分类",
  district: "密云区",
  latitude: 39.904179,
  longitude: 116.407387,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "密云区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing云峰山scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京云峰山景区",
      url: "https://zh.wikipedia.org/wiki/北京云峰山景区"
    }
  ]
},
{
  id: "仙栖洞scenic-area",
  name: "仙栖洞景区",
  category: "待分类",
  district: "房山区",
  latitude: 39.659453,
  longitude: 115.74916,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "房山区",
    "3A景区"
  ],
  cover: "https://example.com/images/仙栖洞scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 仙栖洞景区",
      url: "https://zh.wikipedia.org/wiki/仙栖洞景区"
    }
  ]
},
{
  id: "great-wall-八达岭古景区",
  name: "八达岭古长城景区",
  category: "历史文化/军事防御",
  district: "延庆区",
  latitude: 40.344315,
  longitude: 115.987651,
  zoomThreshold: 12,
  priority: 3,
  summary: "万里长城的重要组成部分，是中国古代军事防御工程的杰出代表。",
  tags: [
    "延庆区",
    "3A景区",
    "历史文化",
    "军事防御"
  ],
  cover: "https://example.com/images/great-wall-八达岭古景区.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "万里长城的重要组成部分，是中国古代军事防御工程的杰出代表。",
  sources: [
    {
      title: "维基百科 · 八达岭古长城景区",
      url: "https://zh.wikipedia.org/wiki/八达岭古长城景区"
    }
  ]
},
{
  id: "中国地质museumscenic-area",
  name: "中国地质博物馆景区",
  category: "文化/博物馆",
  district: "西城区",
  latitude: 39.923387,
  longitude: 116.371739,
  zoomThreshold: 12,
  priority: 3,
  summary: "收藏、展示和研究各类文物的文化机构。",
  tags: [
    "博物馆",
    "西城区",
    "3A景区",
    "文化"
  ],
  cover: "https://example.com/images/中国地质museumscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "收藏、展示和研究各类文物的文化机构。",
  sources: [
    {
      title: "维基百科 · 中国地质博物馆景区",
      url: "https://zh.wikipedia.org/wiki/中国地质博物馆景区"
    }
  ]
},
{
  id: "miyun云龙涧scenic-area",
  name: "密云云龙涧景区",
  category: "待分类",
  district: "密云区",
  latitude: 40.485827,
  longitude: 116.793556,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "密云区",
    "3A景区"
  ],
  cover: "https://example.com/images/miyun云龙涧scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 密云云龙涧景区",
      url: "https://zh.wikipedia.org/wiki/密云云龙涧景区"
    }
  ]
},
{
  id: "beijing圣泉山tourism风scenic-area",
  name: "北京圣泉山旅游风景区",
  category: "自然风光",
  district: "怀柔区",
  latitude: 40.37344,
  longitude: 116.575841,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "自然风光",
    "3A景区",
    "怀柔区"
  ],
  cover: "https://example.com/images/beijing圣泉山tourism风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京圣泉山旅游风景区",
      url: "https://zh.wikipedia.org/wiki/北京圣泉山旅游风景区"
    }
  ]
},
{
  id: "beijing幽谷神潭自然风scenic-area",
  name: "北京幽谷神潭自然风景区",
  category: "自然风光",
  district: "怀柔区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "自然风光",
    "3A景区",
    "怀柔区"
  ],
  cover: "https://example.com/images/beijing幽谷神潭自然风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京幽谷神潭自然风景区",
      url: "https://zh.wikipedia.org/wiki/北京幽谷神潭自然风景区"
    }
  ]
},
{
  id: "beijing市劳动人民culture宫scenic-area",
  name: "北京市劳动人民文化宫景区",
  category: "待分类",
  district: "东城区",
  latitude: 39.9107,
  longitude: 116.400005,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "3A景区",
    "东城区"
  ],
  cover: "https://example.com/images/beijing市劳动人民culture宫scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京市劳动人民文化宫景区",
      url: "https://zh.wikipedia.org/wiki/北京市劳动人民文化宫景区"
    }
  ]
},
{
  id: "长寿山scenic-area",
  name: "长寿山景区",
  category: "待分类",
  district: "平谷区",
  latitude: 40.260234,
  longitude: 117.10862,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "3A景区",
    "平谷区"
  ],
  cover: "https://example.com/images/长寿山scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 长寿山景区",
      url: "https://zh.wikipedia.org/wiki/长寿山景区"
    }
  ]
},
{
  id: "beijing市huairou区生存岛新概念tourism基地scenic-area",
  name: "北京市怀柔区生存岛新概念旅游基地景区",
  category: "待分类",
  district: "怀柔区",
  latitude: 40.363442,
  longitude: 116.640655,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "3A景区",
    "怀柔区"
  ],
  cover: "https://example.com/images/beijing市huairou区生存岛新概念旅游基地scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京市怀柔区生存岛新概念旅游基地景区",
      url: "https://zh.wikipedia.org/wiki/北京市怀柔区生存岛新概念旅游基地景区"
    }
  ]
},
{
  id: "北京蟒山森林景区-park",
  name: "北京蟒山森林公园景区",
  category: "城市公园/休闲",
  district: "昌平区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "3A景区",
    "昌平区"
  ],
  cover: "https://example.com/images/北京蟒山森林景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京蟒山森林公园景区",
      url: "https://zh.wikipedia.org/wiki/北京蟒山森林公园景区"
    }
  ]
},
{
  id: "beijing河北村民俗culturescenic-area",
  name: "北京河北村民俗文化景区",
  category: "待分类",
  district: "顺义区",
  latitude: 39.972469,
  longitude: 116.464686,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "3A景区",
    "顺义区"
  ],
  cover: "https://example.com/images/beijing河北村民俗culturescenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京河北村民俗文化景区",
      url: "https://zh.wikipedia.org/wiki/北京河北村民俗文化景区"
    }
  ]
},
{
  id: "beijing古崖居原始部落tourism区",
  name: "北京古崖居原始部落旅游区",
  category: "待分类",
  district: "延庆区",
  latitude: 39.904179,
  longitude: 116.407387,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "延庆区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing古崖居原始部落tourism区.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京古崖居原始部落旅游区",
      url: "https://zh.wikipedia.org/wiki/北京古崖居原始部落旅游区"
    }
  ]
},
{
  id: "beijing力维斯白龙潭scenic-area",
  name: "北京力维斯白龙潭景区",
  category: "待分类",
  district: "密云区",
  latitude: 40.488806,
  longitude: 117.078309,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "密云区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing力维斯白龙潭scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京力维斯白龙潭景区",
      url: "https://zh.wikipedia.org/wiki/北京力维斯白龙潭景区"
    }
  ]
},
{
  id: "万科石京龙滑雪场scenic-area",
  name: "万科石京龙滑雪场景区",
  category: "待分类",
  district: "延庆区",
  latitude: 40.52208,
  longitude: 115.969029,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "延庆区",
    "3A景区"
  ],
  cover: "https://example.com/images/万科石京龙滑雪场scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 万科石京龙滑雪场景区",
      url: "https://zh.wikipedia.org/wiki/万科石京龙滑雪场景区"
    }
  ]
},
{
  id: "beijing百花山tourismscenic-area",
  name: "北京百花山旅游景区",
  category: "待分类",
  district: "房山区",
  latitude: 39.85743,
  longitude: 115.616563,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "房山区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing百花山tourismscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京百花山旅游景区",
      url: "https://zh.wikipedia.org/wiki/北京百花山旅游景区"
    }
  ]
},
{
  id: "beijingmiyun桃源仙谷风scenic-area",
  name: "北京密云桃源仙谷风景区",
  category: "自然风光",
  district: "密云区",
  latitude: 40.543015,
  longitude: 116.808898,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "自然风光",
    "密云区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijingmiyun桃源仙谷风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京密云桃源仙谷风景区",
      url: "https://zh.wikipedia.org/wiki/北京密云桃源仙谷风景区"
    }
  ]
},
{
  id: "beijingfangshan区张坊宋辽古城scenic-area",
  name: "北京房山区张坊宋辽古城景区",
  category: "待分类",
  district: "房山区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "房山区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijingfangshan区张坊宋辽古城scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京房山区张坊宋辽古城景区",
      url: "https://zh.wikipedia.org/wiki/北京房山区张坊宋辽古城景区"
    }
  ]
},
{
  id: "beijing双龙峡自然风scenic-area",
  name: "北京双龙峡自然风景区",
  category: "自然风光",
  district: "门头沟区",
  latitude: 39.954638,
  longitude: 115.719701,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "自然风光",
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing双龙峡自然风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京双龙峡自然风景区",
      url: "https://zh.wikipedia.org/wiki/北京双龙峡自然风景区"
    }
  ]
},
{
  id: "南苑森林湿地-park",
  name: "南苑森林湿地公园",
  category: "城市公园/休闲",
  district: "丰台区",
  latitude: 39.827385,
  longitude: 116.382882,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "3A景区",
    "丰台区"
  ],
  cover: "https://example.com/images/南苑森林湿地-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 南苑森林湿地公园",
      url: "https://zh.wikipedia.org/wiki/南苑森林湿地公园"
    }
  ]
},
{
  id: "爨柏scenic-area",
  name: "爨柏景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 39.972357,
  longitude: 115.666673,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/爨柏scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 爨柏景区",
      url: "https://zh.wikipedia.org/wiki/爨柏景区"
    }
  ]
},
{
  id: "首钢工业culturetourism区",
  name: "首钢工业文化旅游区",
  category: "待分类",
  district: "石景山区",
  latitude: 39.86327,
  longitude: 116.64724,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "石景山区",
    "3A景区"
  ],
  cover: "https://example.com/images/首钢工业culturetourism区.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 首钢工业文化旅游区",
      url: "https://zh.wikipedia.org/wiki/首钢工业文化旅游区"
    }
  ]
},
{
  id: "beijing大观园",
  name: "北京大观园",
  category: "待分类",
  district: "西城区",
  latitude: 39.871365,
  longitude: 116.355972,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "3A景区",
    "西城区"
  ],
  cover: "https://example.com/images/beijing大观园.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京大观园",
      url: "https://zh.wikipedia.org/wiki/北京大观园"
    }
  ]
},
{
  id: "北京鹫峰森林景区-park",
  name: "北京鹫峰森林公园景区",
  category: "城市公园/休闲",
  district: "海淀区",
  latitude: 40.053806,
  longitude: 116.090003,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "海淀区",
    "3A景区"
  ],
  cover: "https://example.com/images/北京鹫峰森林景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京鹫峰森林公园景区",
      url: "https://zh.wikipedia.org/wiki/北京鹫峰森林公园景区"
    }
  ]
},
{
  id: "beijing湖广会馆大戏楼scenic-area",
  name: "北京湖广会馆大戏楼景区",
  category: "待分类",
  district: "西城区",
  latitude: 39.8889,
  longitude: 116.384032,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "3A景区",
    "西城区"
  ],
  cover: "https://example.com/images/beijing湖广会馆大戏楼scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京湖广会馆大戏楼景区",
      url: "https://zh.wikipedia.org/wiki/北京湖广会馆大戏楼景区"
    }
  ]
},
{
  id: "黄芩仙谷scenic-area",
  name: "黄芩仙谷景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 40.541541,
  longitude: 116.794133,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/黄芩仙谷scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 黄芩仙谷景区",
      url: "https://zh.wikipedia.org/wiki/黄芩仙谷景区"
    }
  ]
},
{
  id: "beijing市huairou区九谷口自然风scenic-area",
  name: "北京市怀柔区九谷口自然风景区",
  category: "自然风光",
  district: "怀柔区",
  latitude: 40.451801,
  longitude: 116.648543,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "自然风光",
    "3A景区",
    "怀柔区"
  ],
  cover: "https://example.com/images/beijing市huairou区九谷口自然风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市怀柔区九谷口自然风景区",
      url: "https://zh.wikipedia.org/wiki/北京市怀柔区九谷口自然风景区"
    }
  ]
},
{
  id: "北京月坛-park",
  name: "北京月坛公园",
  category: "城市公园/休闲",
  district: "西城区",
  latitude: 39.916424,
  longitude: 116.352221,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "3A景区",
    "西城区"
  ],
  cover: "https://example.com/images/北京月坛-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京月坛公园",
      url: "https://zh.wikipedia.org/wiki/北京月坛公园"
    }
  ]
},
{
  id: "宋庆龄故居scenic-area",
  name: "宋庆龄故居景区",
  category: "历史文化/名人故居",
  district: "西城区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 12,
  priority: 3,
  summary: "历史名人的居住地，具有重要的历史文化价值。",
  tags: [
    "名人故居",
    "3A景区",
    "历史文化",
    "西城区"
  ],
  cover: "https://example.com/images/宋庆龄故居scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "历史名人的居住地，具有重要的历史文化价值。",
  sources: [
    {
      title: "维基百科 · 宋庆龄故居景区",
      url: "https://zh.wikipedia.org/wiki/宋庆龄故居景区"
    }
  ]
},
{
  id: "beijing焦庄户地道战ruins纪念馆scenic-area",
  name: "北京焦庄户地道战遗址纪念馆景区",
  category: "历史文化/遗址",
  district: "顺义区",
  latitude: 40.233738,
  longitude: 116.869801,
  zoomThreshold: 12,
  priority: 3,
  summary: "古代文明或历史事件的遗迹，具有重要的考古价值。",
  tags: [
    "遗址",
    "3A景区",
    "历史文化",
    "顺义区"
  ],
  cover: "https://example.com/images/beijing焦庄户地道战ruins纪念馆scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "古代文明或历史事件的遗迹，具有重要的考古价值。",
  sources: [
    {
      title: "维基百科 · 北京焦庄户地道战遗址纪念馆景区",
      url: "https://zh.wikipedia.org/wiki/北京焦庄户地道战遗址纪念馆景区"
    }
  ]
},
{
  id: "beijing市宣南culturemuseumscenic-area",
  name: "北京市宣南文化博物馆景区",
  category: "文化/博物馆",
  district: "西城区",
  latitude: 39.892823,
  longitude: 116.365004,
  zoomThreshold: 12,
  priority: 3,
  summary: "收藏、展示和研究各类文物的文化机构。",
  tags: [
    "博物馆",
    "西城区",
    "3A景区",
    "文化"
  ],
  cover: "https://example.com/images/beijing市宣南culturemuseumscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "收藏、展示和研究各类文物的文化机构。",
  sources: [
    {
      title: "维基百科 · 北京市宣南文化博物馆景区",
      url: "https://zh.wikipedia.org/wiki/北京市宣南文化博物馆景区"
    }
  ]
},
{
  id: "beijingshunyi汉石桥湿地scenic-area",
  name: "北京顺义汉石桥湿地景区",
  category: "待分类",
  district: "顺义区",
  latitude: 40.117529,
  longitude: 116.814842,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "3A景区",
    "顺义区"
  ],
  cover: "https://example.com/images/beijingshunyi汉石桥湿地scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京顺义汉石桥湿地景区",
      url: "https://zh.wikipedia.org/wiki/北京顺义汉石桥湿地景区"
    }
  ]
},
{
  id: "beijing二锅头酒museumscenic-area",
  name: "北京二锅头酒博物馆景区",
  category: "文化/博物馆",
  district: "怀柔区",
  latitude: 40.326314,
  longitude: 116.665212,
  zoomThreshold: 12,
  priority: 3,
  summary: "收藏、展示和研究各类文物的文化机构。",
  tags: [
    "博物馆",
    "怀柔区",
    "3A景区",
    "文化"
  ],
  cover: "https://example.com/images/beijing二锅头酒museumscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "收藏、展示和研究各类文物的文化机构。",
  sources: [
    {
      title: "维基百科 · 北京二锅头酒博物馆景区",
      url: "https://zh.wikipedia.org/wiki/北京二锅头酒博物馆景区"
    }
  ]
},
{
  id: "beijing市changping区南口镇艺麓园scenic-area",
  name: "北京市昌平区南口镇艺麓园景区",
  category: "待分类",
  district: "昌平区",
  latitude: 40.242956,
  longitude: 116.150859,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "昌平区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing市changping区南口镇艺麓园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市昌平区南口镇艺麓园景区",
      url: "https://zh.wikipedia.org/wiki/北京市昌平区南口镇艺麓园景区"
    }
  ]
},
{
  id: "北京市朝阳区古塔景区-park",
  name: "北京市朝阳区古塔公园景区",
  category: "城市公园/休闲",
  district: "朝阳区",
  latitude: 39.878349,
  longitude: 116.535351,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/北京市朝阳区古塔景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市朝阳区古塔公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市朝阳区古塔公园景区"
    }
  ]
},
{
  id: "beijing呀路古热带botanical园scenic-area",
  name: "北京呀路古热带植物园景区",
  category: "植物/生态",
  district: "大兴区",
  latitude: 39.659096,
  longitude: 116.59389,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "植物",
    "3A景区",
    "大兴区",
    "生态"
  ],
  cover: "https://example.com/images/beijing呀路古热带botanical园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京呀路古热带植物园景区",
      url: "https://zh.wikipedia.org/wiki/北京呀路古热带植物园景区"
    }
  ]
},
{
  id: "阳台山自然风scenic-area",
  name: "阳台山自然风景区",
  category: "自然风光",
  district: "海淀区",
  latitude: 40.068588,
  longitude: 116.104067,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "海淀区",
    "自然风光",
    "3A景区"
  ],
  cover: "https://example.com/images/阳台山自然风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 阳台山自然风景区",
      url: "https://zh.wikipedia.org/wiki/阳台山自然风景区"
    }
  ]
},
{
  id: "将府旅游景区-park",
  name: "将府公园旅游景区",
  category: "城市公园/休闲",
  district: "朝阳区",
  latitude: 39.976547,
  longitude: 116.513514,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/将府旅游景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 将府公园旅游景区",
      url: "https://zh.wikipedia.org/wiki/将府公园旅游景区"
    }
  ]
},
{
  id: "金中都景区-park",
  name: "金中都公园景区",
  category: "城市公园/休闲",
  district: "西城区",
  latitude: 39.871429,
  longitude: 116.349747,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "3A景区",
    "西城区"
  ],
  cover: "https://example.com/images/金中都景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 金中都公园景区",
      url: "https://zh.wikipedia.org/wiki/金中都公园景区"
    }
  ]
},
{
  id: "北京市房山世界地质博物馆景区-park",
  name: "北京市房山世界地质公园博物馆景区",
  category: "文化/博物馆",
  district: "房山区",
  latitude: 39.647447,
  longitude: 115.578307,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "博物馆",
    "房山区",
    "3A景区",
    "文化"
  ],
  cover: "https://example.com/images/北京市房山世界地质博物馆景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市房山世界地质公园博物馆景区",
      url: "https://zh.wikipedia.org/wiki/北京市房山世界地质公园博物馆景区"
    }
  ]
},
{
  id: "定都阁scenic-area",
  name: "定都阁景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 39.906618,
  longitude: 116.055738,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/定都阁scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 定都阁景区",
      url: "https://zh.wikipedia.org/wiki/定都阁景区"
    }
  ]
},
{
  id: "beijing蓝色港湾scenic-area",
  name: "北京蓝色港湾景区",
  category: "待分类",
  district: "朝阳区",
  latitude: 39.949382,
  longitude: 116.475922,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing蓝色港湾scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京蓝色港湾景区",
      url: "https://zh.wikipedia.org/wiki/北京蓝色港湾景区"
    }
  ]
},
{
  id: "前门大街scenic-area",
  name: "前门大街景区",
  category: "待分类",
  district: "东城区",
  latitude: 39.896086,
  longitude: 116.397832,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "3A景区",
    "东城区"
  ],
  cover: "https://example.com/images/前门大街scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 前门大街景区",
      url: "https://zh.wikipedia.org/wiki/前门大街景区"
    }
  ]
},
{
  id: "北京市朝阳区团结湖景区-park",
  name: "北京市朝阳区团结湖公园景区",
  category: "城市公园/休闲",
  district: "朝阳区",
  latitude: 39.925741,
  longitude: 116.464372,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/北京市朝阳区团结湖景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市朝阳区团结湖公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市朝阳区团结湖公园景区"
    }
  ]
},
{
  id: "清凉谷tourism风scenic-area",
  name: "清凉谷旅游风景区",
  category: "自然风光",
  district: "密云区",
  latitude: 40.633766,
  longitude: 116.754146,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "自然风光",
    "密云区",
    "3A景区"
  ],
  cover: "https://example.com/images/清凉谷tourism风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 清凉谷旅游风景区",
      url: "https://zh.wikipedia.org/wiki/清凉谷旅游风景区"
    }
  ]
},
{
  id: "北京市朝阳区日坛景区-park",
  name: "北京市朝阳区日坛公园景区",
  category: "城市公园/休闲",
  district: "朝阳区",
  latitude: 39.915538,
  longitude: 116.443795,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/北京市朝阳区日坛景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市朝阳区日坛公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市朝阳区日坛公园景区"
    }
  ]
},
{
  id: "imperial菜museum",
  name: "皇家菜博物馆",
  category: "文化/博物馆",
  district: "海淀区",
  latitude: 39.813741,
  longitude: 116.414657,
  zoomThreshold: 12,
  priority: 3,
  summary: "收藏、展示和研究各类文物的文化机构。",
  tags: [
    "博物馆",
    "海淀区",
    "3A景区",
    "文化"
  ],
  cover: "https://example.com/images/imperial菜museum.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "收藏、展示和研究各类文物的文化机构。",
  sources: [
    {
      title: "维基百科 · 皇家菜博物馆",
      url: "https://zh.wikipedia.org/wiki/皇家菜博物馆"
    }
  ]
},
{
  id: "北京市朝阳区四得景区-park",
  name: "北京市朝阳区四得公园景区",
  category: "城市公园/休闲",
  district: "朝阳区",
  latitude: 39.972342,
  longitude: 116.474488,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/北京市朝阳区四得景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市朝阳区四得公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市朝阳区四得公园景区"
    }
  ]
},
{
  id: "北小河景区-park",
  name: "北小河公园景区",
  category: "城市公园/休闲",
  district: "朝阳区",
  latitude: 40.005054,
  longitude: 116.455245,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/北小河景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北小河公园景区",
      url: "https://zh.wikipedia.org/wiki/北小河公园景区"
    }
  ]
},
{
  id: "beijing冶仙塔tourism风scenic-area",
  name: "北京冶仙塔旅游风景区",
  category: "自然风光",
  district: "密云区",
  latitude: 40.401437,
  longitude: 116.866923,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "自然风光",
    "密云区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing冶仙塔tourism风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京冶仙塔旅游风景区",
      url: "https://zh.wikipedia.org/wiki/北京冶仙塔旅游风景区"
    }
  ]
},
{
  id: "石门山scenic-area",
  name: "石门山景区",
  category: "待分类",
  district: "怀柔区",
  latitude: 40.485373,
  longitude: 116.66286,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "3A景区",
    "怀柔区"
  ],
  cover: "https://example.com/images/石门山scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 石门山景区",
      url: "https://zh.wikipedia.org/wiki/石门山景区"
    }
  ]
},
{
  id: "beijing南海子麋鹿苑museumscenic-area",
  name: "北京南海子麋鹿苑博物馆景区",
  category: "文化/博物馆",
  district: "大兴区",
  latitude: 39.777428,
  longitude: 116.458508,
  zoomThreshold: 12,
  priority: 3,
  summary: "收藏、展示和研究各类文物的文化机构。",
  tags: [
    "博物馆",
    "3A景区",
    "大兴区",
    "文化"
  ],
  cover: "https://example.com/images/beijing南海子麋鹿苑museumscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "收藏、展示和研究各类文物的文化机构。",
  sources: [
    {
      title: "维基百科 · 北京南海子麋鹿苑博物馆景区",
      url: "https://zh.wikipedia.org/wiki/北京南海子麋鹿苑博物馆景区"
    }
  ]
},
{
  id: "beijing陶瓷艺术馆scenic-area",
  name: "北京陶瓷艺术馆景区",
  category: "待分类",
  district: "朝阳区",
  latitude: 39.855741,
  longitude: 116.47602,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing陶瓷艺术馆scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京陶瓷艺术馆景区",
      url: "https://zh.wikipedia.org/wiki/北京陶瓷艺术馆景区"
    }
  ]
},
{
  id: "北京市朝阳区大望京景区-park",
  name: "北京市朝阳区大望京公园景区",
  category: "城市公园/休闲",
  district: "朝阳区",
  latitude: 39.996867,
  longitude: 116.494578,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/北京市朝阳区大望京景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市朝阳区大望京公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市朝阳区大望京公园景区"
    }
  ]
},
{
  id: "北京市海淀百望山森林景区-park",
  name: "北京市海淀百望山森林公园景区",
  category: "城市公园/休闲",
  district: "海淀区",
  latitude: 40.029982,
  longitude: 116.255631,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "海淀区",
    "3A景区"
  ],
  cover: "https://example.com/images/北京市海淀百望山森林景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市海淀百望山森林公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市海淀百望山森林公园景区"
    }
  ]
},
{
  id: "琉璃渠scenic-area",
  name: "琉璃渠景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 39.971455,
  longitude: 116.086871,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/琉璃渠scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 琉璃渠景区",
      url: "https://zh.wikipedia.org/wiki/琉璃渠景区"
    }
  ]
},
{
  id: "南石洋大峡谷scenic-area",
  name: "南石洋大峡谷景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 40.1463,
  longitude: 115.793399,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/南石洋大峡谷scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 南石洋大峡谷景区",
      url: "https://zh.wikipedia.org/wiki/南石洋大峡谷景区"
    }
  ]
},
{
  id: "北京喇叭沟原始森林景区-park",
  name: "北京喇叭沟原始森林公园景区",
  category: "城市公园/休闲",
  district: "怀柔区",
  latitude: 40.94893,
  longitude: 116.516017,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "3A景区",
    "怀柔区"
  ],
  cover: "https://example.com/images/北京喇叭沟原始森林景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京喇叭沟原始森林公园景区",
      url: "https://zh.wikipedia.org/wiki/北京喇叭沟原始森林公园景区"
    }
  ]
},
{
  id: "静之湖度假区scenic-area",
  name: "静之湖度假区景区",
  category: "待分类",
  district: "昌平区",
  latitude: 40.246633,
  longitude: 116.438785,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "昌平区",
    "3A景区"
  ],
  cover: "https://example.com/images/静之湖度假区scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 静之湖度假区景区",
      url: "https://zh.wikipedia.org/wiki/静之湖度假区景区"
    }
  ]
},
{
  id: "碓臼石scenic-area",
  name: "碓臼石景区",
  category: "待分类",
  district: "延庆区",
  latitude: 40.369407,
  longitude: 116.102219,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "延庆区",
    "3A景区"
  ],
  cover: "https://example.com/images/碓臼石scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 碓臼石景区",
      url: "https://zh.wikipedia.org/wiki/碓臼石景区"
    }
  ]
},
{
  id: "miyun玫瑰情园scenic-area",
  name: "密云玫瑰情园景区",
  category: "待分类",
  district: "密云区",
  latitude: 40.350629,
  longitude: 116.905282,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "密云区",
    "3A景区"
  ],
  cover: "https://example.com/images/miyun玫瑰情园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 密云玫瑰情园景区",
      url: "https://zh.wikipedia.org/wiki/密云玫瑰情园景区"
    }
  ]
},
{
  id: "北京市东城区青年湖景区-park",
  name: "北京市东城区青年湖公园景区",
  category: "城市公园/休闲",
  district: "东城区",
  latitude: 39.954128,
  longitude: 116.405967,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "3A景区",
    "东城区"
  ],
  cover: "https://example.com/images/北京市东城区青年湖景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市东城区青年湖公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市东城区青年湖公园景区"
    }
  ]
},
{
  id: "beijing市mentougou区灵水scenic-area",
  name: "北京市门头沟区灵水景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 40.004294,
  longitude: 115.73606,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing市mentougou区灵水scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京市门头沟区灵水景区",
      url: "https://zh.wikipedia.org/wiki/北京市门头沟区灵水景区"
    }
  ]
},
{
  id: "斯普瑞斯奧特萊斯tourism区",
  name: "斯普瑞斯奧特萊斯旅游区",
  category: "待分类",
  district: "朝阳区",
  latitude: 40.012136,
  longitude: 116.595126,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/斯普瑞斯奧特萊斯tourism区.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 斯普瑞斯奧特萊斯旅游区",
      url: "https://zh.wikipedia.org/wiki/斯普瑞斯奧特萊斯旅游区"
    }
  ]
},
{
  id: "北京市朝阳区庆丰景区-park",
  name: "北京市朝阳区庆丰公园景区",
  category: "城市公园/休闲",
  district: "朝阳区",
  latitude: 39.903411,
  longitude: 116.463961,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/北京市朝阳区庆丰景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市朝阳区庆丰公园景区",
      url: "https://zh.wikipedia.org/wiki/北京市朝阳区庆丰公园景区"
    }
  ]
},
{
  id: "beijing莱恩堡国际酒庄scenic-area",
  name: "北京莱恩堡国际酒庄景区",
  category: "待分类",
  district: "房山区",
  latitude: 39.788925,
  longitude: 116.214175,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "房山区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing莱恩堡国际酒庄scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京莱恩堡国际酒庄景区",
      url: "https://zh.wikipedia.org/wiki/北京莱恩堡国际酒庄景区"
    }
  ]
},
{
  id: "beijing古御道ecologicaltourismscenic-area",
  name: "北京古御道生态旅游景区",
  category: "待分类",
  district: "密云区",
  latitude: 40.680984,
  longitude: 117.161966,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "密云区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing古御道ecologicaltourismscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京古御道生态旅游景区",
      url: "https://zh.wikipedia.org/wiki/北京古御道生态旅游景区"
    }
  ]
},
{
  id: "beijing百瑞谷scenic-area",
  name: "北京百瑞谷景区",
  category: "待分类",
  district: "房山区",
  latitude: 39.852138,
  longitude: 115.655201,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "房山区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing百瑞谷scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京百瑞谷景区",
      url: "https://zh.wikipedia.org/wiki/北京百瑞谷景区"
    }
  ]
},
{
  id: "beijing市chaoyang区京城梨园scenic-area",
  name: "北京市朝阳区京城梨园景区",
  category: "待分类",
  district: "朝阳区",
  latitude: 39.933839,
  longitude: 116.55077,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "朝阳区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing市chaoyang区京城梨园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市朝阳区京城梨园景区",
      url: "https://zh.wikipedia.org/wiki/北京市朝阳区京城梨园景区"
    }
  ]
},
{
  id: "beijing邑仕庄园国际酒庄scenic-area",
  name: "北京邑仕庄园国际酒庄景区",
  category: "待分类",
  district: "密云区",
  latitude: 40.378169,
  longitude: 116.900269,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "密云区",
    "3A景区"
  ],
  cover: "https://example.com/images/beijing邑仕庄园国际酒庄scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京邑仕庄园国际酒庄景区",
      url: "https://zh.wikipedia.org/wiki/北京邑仕庄园国际酒庄景区"
    }
  ]
},
{
  id: "聚灵峡灵山古道scenic-area",
  name: "聚灵峡（灵山古道）景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 39.993745,
  longitude: 115.483083,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/聚灵峡灵山古道scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 聚灵峡（灵山古道）景区",
      url: "https://zh.wikipedia.org/wiki/聚灵峡（灵山古道）景区"
    }
  ]
},
{
  id: "西藏culturemuseumscenic-area",
  name: "西藏文化博物馆景区",
  category: "文化/博物馆",
  district: "朝阳区",
  latitude: 39.9893,
  longitude: 116.414704,
  zoomThreshold: 12,
  priority: 3,
  summary: "收藏、展示和研究各类文物的文化机构。",
  tags: [
    "博物馆",
    "朝阳区",
    "3A景区",
    "文化"
  ],
  cover: "https://example.com/images/西藏culturemuseumscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "收藏、展示和研究各类文物的文化机构。",
  sources: [
    {
      title: "维基百科 · 西藏文化博物馆景区",
      url: "https://zh.wikipedia.org/wiki/西藏文化博物馆景区"
    }
  ]
},
{
  id: "抗日战争雕塑园",
  name: "抗日战争雕塑园",
  category: "待分类",
  district: "丰台区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "丰台区",
    "3A景区"
  ],
  cover: "https://example.com/images/抗日战争雕塑园.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 抗日战争雕塑园",
      url: "https://zh.wikipedia.org/wiki/抗日战争雕塑园"
    }
  ]
},
{
  id: "马栏tourismscenic-area",
  name: "马栏旅游景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 39.762034,
  longitude: 116.437254,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "门头沟区",
    "3A景区"
  ],
  cover: "https://example.com/images/马栏tourismscenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 马栏旅游景区",
      url: "https://zh.wikipedia.org/wiki/马栏旅游景区"
    }
  ]
},
{
  id: "scenic-area中粮祥云·小镇tourism区",
  name: "景区中粮祥云·小镇旅游区",
  category: "待分类",
  district: "顺义区",
  latitude: 40.092118,
  longitude: 116.534912,
  zoomThreshold: 12,
  priority: 3,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "3A景区",
    "顺义区"
  ],
  cover: "https://example.com/images/scenic-area中粮祥云·小镇tourism区.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 景区中粮祥云·小镇旅游区",
      url: "https://zh.wikipedia.org/wiki/景区中粮祥云·小镇旅游区"
    }
  ]
},
{
  id: "蜜蜂大世界scenic-area",
  name: "蜜蜂大世界景区",
  category: "待分类",
  district: "密云区",
  latitude: 40.498267,
  longitude: 117.066172,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "密云区",
    "3A景区"
  ],
  cover: "https://example.com/images/蜜蜂大世界scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 蜜蜂大世界景区",
      url: "https://zh.wikipedia.org/wiki/蜜蜂大世界景区"
    }
  ]
},
{
  id: "金水湖scenic-area",
  name: "金水湖景区",
  category: "待分类",
  district: "房山区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 12,
  priority: 3,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "房山区",
    "3A景区"
  ],
  cover: "https://example.com/images/金水湖scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 金水湖景区",
      url: "https://zh.wikipedia.org/wiki/金水湖景区"
    }
  ]
},
{
  id: "东江-park",
  name: "东江公园",
  category: "城市公园/休闲",
  district: "顺义区",
  latitude: 40.164804,
  longitude: 116.785246,
  zoomThreshold: 12,
  priority: 3,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "3A景区",
    "顺义区"
  ],
  cover: "https://example.com/images/东江-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 东江公园",
      url: "https://zh.wikipedia.org/wiki/东江公园"
    }
  ]
},
{
  id: "beijing市fengtai区fengtai花园scenic-area",
  name: "北京市丰台区丰台花园景区",
  category: "待分类",
  district: "丰台区",
  latitude: 39.864526,
  longitude: 116.287817,
  zoomThreshold: 13,
  priority: 4,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "2A景区",
    "丰台区"
  ],
  cover: "https://example.com/images/beijing市fengtai区fengtai花园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京市丰台区丰台花园景区",
      url: "https://zh.wikipedia.org/wiki/北京市丰台区丰台花园景区"
    }
  ]
},
{
  id: "beijing丛海逸园scenic-area",
  name: "北京丛海逸园景区",
  category: "待分类",
  district: "平谷区",
  latitude: 40.257893,
  longitude: 117.025902,
  zoomThreshold: 13,
  priority: 4,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "2A景区",
    "平谷区"
  ],
  cover: "https://example.com/images/beijing丛海逸园scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京丛海逸园景区",
      url: "https://zh.wikipedia.org/wiki/北京丛海逸园景区"
    }
  ]
},
{
  id: "beijingyanqing玉渡山风scenic-area",
  name: "北京延庆玉渡山风景区",
  category: "自然风光",
  district: "延庆区",
  latitude: 40.531641,
  longitude: 115.899049,
  zoomThreshold: 13,
  priority: 4,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "2A景区",
    "自然风光",
    "延庆区"
  ],
  cover: "https://example.com/images/beijingyanqing玉渡山风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 北京延庆玉渡山风景区",
      url: "https://zh.wikipedia.org/wiki/北京延庆玉渡山风景区"
    }
  ]
},
{
  id: "beijing市fangshan区没有共产党就没有新中国革命歌曲纪念馆",
  name: "北京市房山区没有共产党就没有新中国革命歌曲纪念馆",
  category: "待分类",
  district: "房山区",
  latitude: 39.781029,
  longitude: 115.584662,
  zoomThreshold: 13,
  priority: 4,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "2A景区",
    "房山区"
  ],
  cover: "https://example.com/images/beijing市fangshan区没有共产党就没有新中国革命歌曲纪念馆.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京市房山区没有共产党就没有新中国革命歌曲纪念馆",
      url: "https://zh.wikipedia.org/wiki/北京市房山区没有共产党就没有新中国革命歌曲纪念馆"
    }
  ]
},
{
  id: "莲花池景区-park",
  name: "莲花池公园景区",
  category: "城市公园/休闲",
  district: "丰台区",
  latitude: 39.893297,
  longitude: 116.315327,
  zoomThreshold: 13,
  priority: 4,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "丰台区",
    "2A景区"
  ],
  cover: "https://example.com/images/莲花池景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 莲花池公园景区",
      url: "https://zh.wikipedia.org/wiki/莲花池公园景区"
    }
  ]
},
{
  id: "beijing瓜草地scenic-area",
  name: "北京瓜草地景区",
  category: "待分类",
  district: "门头沟区",
  latitude: 39.952293,
  longitude: 115.980753,
  zoomThreshold: 13,
  priority: 4,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "2A景区",
    "门头沟区"
  ],
  cover: "https://example.com/images/beijing瓜草地scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 北京瓜草地景区",
      url: "https://zh.wikipedia.org/wiki/北京瓜草地景区"
    }
  ]
},
{
  id: "丰台区万芳亭景区-park",
  name: "丰台区万芳亭公园景区",
  category: "城市公园/休闲",
  district: "丰台区",
  latitude: 39.858593,
  longitude: 116.375705,
  zoomThreshold: 13,
  priority: 4,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "丰台区",
    "2A景区"
  ],
  cover: "https://example.com/images/丰台区万芳亭景区-park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 丰台区万芳亭公园景区",
      url: "https://zh.wikipedia.org/wiki/丰台区万芳亭公园景区"
    }
  ]
},
{
  id: "神堂峪自然风scenic-area",
  name: "神堂峪自然风景区",
  category: "自然风光",
  district: "怀柔区",
  latitude: 40.438858,
  longitude: 116.61179,
  zoomThreshold: 13,
  priority: 4,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "2A景区",
    "自然风光",
    "怀柔区"
  ],
  cover: "https://example.com/images/神堂峪自然风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 神堂峪自然风景区",
      url: "https://zh.wikipedia.org/wiki/神堂峪自然风景区"
    }
  ]
},
{
  id: "百泉山风scenic-area",
  name: "百泉山风景区",
  category: "自然风光",
  district: "怀柔区",
  latitude: 40.485794,
  longitude: 116.636663,
  zoomThreshold: 13,
  priority: 4,
  summary: "以自然风光和人文景观为主要特色的旅游景区。",
  tags: [
    "2A景区",
    "自然风光",
    "怀柔区"
  ],
  cover: "https://example.com/images/百泉山风scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以自然风光和人文景观为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 百泉山风景区",
      url: "https://zh.wikipedia.org/wiki/百泉山风景区"
    }
  ]
},
{
  id: "京都第一瀑scenic-area",
  name: "京都第一瀑景区",
  category: "待分类",
  district: "密云区",
  latitude: 40.612439,
  longitude: 116.77028,
  zoomThreshold: 13,
  priority: 4,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "2A景区",
    "密云区"
  ],
  cover: "https://example.com/images/京都第一瀑scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 京都第一瀑景区",
      url: "https://zh.wikipedia.org/wiki/京都第一瀑景区"
    }
  ]
},
{
  id: "银狐洞scenic-area",
  name: "银狐洞景区",
  category: "待分类",
  district: "房山区",
  latitude: 39.79869,
  longitude: 115.903983,
  zoomThreshold: 13,
  priority: 4,
  summary: "北京市著名旅游景区，具有独特的文化和自然景观。",
  tags: [
    "2A景区",
    "房山区"
  ],
  cover: "https://example.com/images/银狐洞scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "北京市著名旅游景区，具有独特的文化和自然景观。",
  sources: [
    {
      title: "维基百科 · 银狐洞景区",
      url: "https://zh.wikipedia.org/wiki/银狐洞景区"
    }
  ]
},
{
  id: "beijing历代帝王庙scenic-area",
  name: "北京历代帝王庙景区",
  category: "待分类",
  district: "西城区",
  latitude: 39.9042,
  longitude: 116.4074,
  zoomThreshold: 13,
  priority: 4,
  summary: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
  tags: [
    "2A景区",
    "西城区"
  ],
  cover: "https://example.com/images/beijing历代帝王庙scenic-area.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "具有悠久历史的宗教建筑，是佛教/道教文化的重要载体。",
  sources: [
    {
      title: "维基百科 · 北京历代帝王庙景区",
      url: "https://zh.wikipedia.org/wiki/北京历代帝王庙景区"
    }
  ]
},
{
  id: "双秀park",
  name: "双秀公园",
  category: "城市公园/休闲",
  district: "西城区",
  latitude: 39.961961,
  longitude: 116.364004,
  zoomThreshold: 13,
  priority: 4,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "2A景区",
    "西城区"
  ],
  cover: "https://example.com/images/双秀park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 双秀公园",
      url: "https://zh.wikipedia.org/wiki/双秀公园"
    }
  ]
},
{
  id: "人定湖park",
  name: "人定湖公园",
  category: "城市公园/休闲",
  district: "西城区",
  latitude: 39.950108,
  longitude: 116.384032,
  zoomThreshold: 13,
  priority: 4,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "2A景区",
    "西城区"
  ],
  cover: "https://example.com/images/人定湖park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 人定湖公园",
      url: "https://zh.wikipedia.org/wiki/人定湖公园"
    }
  ]
},
{
  id: "会城门park",
  name: "会城门公园",
  category: "城市公园/休闲",
  district: "海淀区",
  latitude: 39.909998,
  longitude: 116.310116,
  zoomThreshold: 13,
  priority: 4,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "2A景区",
    "海淀区"
  ],
  cover: "https://example.com/images/会城门park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 会城门公园",
      url: "https://zh.wikipedia.org/wiki/会城门公园"
    }
  ]
},
{
  id: "东城区柳荫park",
  name: "东城区柳荫公园",
  category: "城市公园/休闲",
  district: "东城区",
  latitude: 39.958889,
  longitude: 116.391111,
  zoomThreshold: 13,
  priority: 4,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "2A景区",
    "东城区"
  ],
  cover: "https://example.com/images/东城区柳荫park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 东城区柳荫公园",
      url: "https://zh.wikipedia.org/wiki/东城区柳荫公园"
    }
  ]
},
{
  id: "东城区菖蒲河park",
  name: "东城区菖蒲河公园",
  category: "城市公园/休闲",
  district: "东城区",
  latitude: 39.913056,
  longitude: 116.401667,
  zoomThreshold: 13,
  priority: 4,
  summary: "以园林艺术和自然风光为主要特色的旅游景区。",
  tags: [
    "休闲",
    "城市公园",
    "2A景区",
    "东城区"
  ],
  cover: "https://example.com/images/东城区菖蒲河park.jpg",
  dynasty: "待查询",
  builtYear: null,
  description: "以园林艺术和自然风光为主要特色的旅游景区。",
  sources: [
    {
      title: "维基百科 · 东城区菖蒲河公园",
      url: "https://zh.wikipedia.org/wiki/东城区菖蒲河公园"
    }
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