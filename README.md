# 京迹 · 北京古建地图导览

基于 Expo + React Native + TypeScript 的移动端地图应用，专注北京中轴线及古建景点的探索与导航。

## 功能特性

- **地图探索**：18 处北京古建景点，分类展示（宫殿、坛庙、园林等）
- **路线导航**：6 条推荐路线，支持真实道路路径规划
- **导航模拟**：小箭头沿道路行走，地图跟随，沉浸式体验
- **智能搜索**：支持景点名称、类别、朝代搜索
- **收藏打卡**：收藏景点、记录最近浏览

## 技术栈

- Expo SDK ~53.0
- React Native 0.79.6
- TypeScript 5.8.3
- React Navigation 6（Bottom Tabs + Stack）
- Leaflet（Web 端地图）
- 高德地图 API（路径规划）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env` 文件：

```bash
EXPO_PUBLIC_AMAP_WEB_KEY=你的高德Key
EXPO_PUBLIC_AMAP_SECURITY_JS_CODE=你的高德安全密钥
```

> 获取方式：https://lbs.amap.com/ → 控制台 → 创建应用 → Web服务

### 3. 启动开发服务器

```bash
# Web端（推荐，开发最快）
npm run web

# 真机调试
npm run start
# 然后用 Expo Go App 扫码
```

### 4. 访问

- Web: http://localhost:8081
- 手机: 使用 Expo Go 扫描二维码

## 项目结构

```
src/
├── components/          # 公共组件
│   ├── LandmarkCard.tsx      # 景点卡片
│   ├── SearchOverlay.tsx     # 搜索浮层
│   └── SpotBottomSheet.tsx   # 底部详情面板
├── context/
│   └── AppStateContext.tsx   # 全局状态（收藏、最近浏览）
├── data/
│   ├── landmarks.ts          # 18个景点数据
│   └── routes.ts             # 6条推荐路线
├── navigation/
│   ├── AppNavigator.tsx      # 原生端导航
│   └── AppNavigator.web.tsx  # Web端导航
├── screens/
│   ├── MapScreen.native.tsx  # 原生端地图（react-native-maps）
│   ├── MapScreen.web.tsx     # Web端地图（Leaflet + 导航模拟）⭐核心
│   ├── LandmarkDetailScreen.tsx
│   ├── RecognitionScreen.tsx
│   ├── RoutesScreen.tsx
│   ├── RouteDetailScreen.tsx
│   ├── ProfileScreen.tsx
│   └── WelcomeScreen.tsx
└── theme/
    └── colors.ts             # 主题色
```

## 核心功能说明

### 地图主页（MapScreen.web.tsx）

**左侧栏**：
- Logo + 搜索框
- 分类筛选标签（宫殿/坛庙/园林等）
- 推荐路线列表（6条）
- 景点列表（18个）

**地图区**：
- Leaflet 地图，CartoDB 底图
- 彩色圆点 Marker（按类别着色）
- 点击 Marker 展开底部详情

**导航模拟**：
- 点击路线 → "正在规划路线..." → 小箭头出现
- 箭头沿真实道路（或平滑曲线）移动
- 地图锁定跟随，箭头始终在屏幕中央
- 经过重要景点显示提示
- 可随时退出

### 数据层

**landmarks.ts**：
- 18 个景点，包含坐标、类别、年代、简介等
- `priority: 1` 为重要景点（导航时高亮提示）
- `zoomThreshold` 控制缩放级别显示

**routes.ts**：
- 6 条路线，由景点坐标串联
- 实际导航时调用高德 API 获取真实道路坐标

## 环境变量说明

| 变量 | 必填 | 说明 |
|------|------|------|
| EXPO_PUBLIC_AMAP_WEB_KEY | ✅ | 高德 Web 服务 Key |
| EXPO_PUBLIC_AMAP_SECURITY_JS_CODE | ✅ | 高德安全密钥 |

## 已知问题 & 待办

### 当前版本（MVP）

- [x] Web 端地图 + 景点展示
- [x] 搜索 + 分类筛选
- [x] 路线规划 + 导航模拟
- [x] 收藏 + 最近浏览
- [ ] 真机端地图优化（Native 端功能较基础）
- [ ] 景点图片加载（部分使用占位图）
- [ ] 离线地图支持

### 后续优化方向

1. **性能**：Marker 聚类（景点多时优化）
2. **功能**：真实语音导航、AR 识别
3. **内容**：更多路线、用户投稿
4. **多端**：Native 端功能对齐 Web 端

## 演示建议

**Web 端投屏**（推荐）：
```bash
npm run web
# 浏览器打开 http://localhost:8081
# 用浏览器开发者工具切换手机尺寸
```

**真机演示**：
```bash
npm run start
# 同一 WiFi 下用 Expo Go 扫码
```

**演示流程**（3分钟）：
1. 首页地图 → 展示 18 个景点 Marker
2. 搜索"故宫" → 快速定位
3. 点击"皇城中轴线"路线 → 观看导航动画
4. 点击景点 → 查看详情 + 收藏
5. 个人页 → 展示收藏列表

## 团队分工建议

| 人员 | 职责 | 当前状态 |
|------|------|----------|
| 负责人 | 整体把控、答辩 | 框架完成 |
| 开发A | Web端优化、导航精细度 | 基础可用 |
| 开发B | Native端功能补齐 | 待开始 |
| 开发C | 内容补充（图片、文案） | 待开始 |

## 常见问题

**Q: 地图白屏？**
A: 检查 `.env` 是否配置正确，网络是否畅通。

**Q: 导航不走真实道路？**
A: 检查高德 Key 是否有效，网络请求是否成功。失败会自动用平滑曲线兜底。

**Q: Native 端功能少？**
A: 当前重点在 Web 端演示，Native 端需后续补齐。

---

**当前版本**：v0.2.0 MVP  
**最后更新**：2025年3月
