# 京迹项目交接文档

## 项目状态总览

- **阶段**：MVP 完成，核心功能可用
- **重点**：Web 端演示就绪，Native 端待完善
- **风险**：真机演示稳定性待验证

---

## 已完成 ✅

### 1. 数据层（src/data/）

**landmarks.ts**：
- 18 个北京古建景点
- 字段完整：id, name, category, district, latitude, longitude, zoomThreshold, priority, summary, tags, cover, dynasty, builtYear
- 坐标已校验（GCJ-02 坐标系）

**routes.ts**：
- 6 条推荐路线
- 皇城中轴线、紫禁城到皇家园林、老北京胡同漫步、坛庙祭祀之旅、皇家园林巡礼、国学文脉探访
- 每条路线包含 stops（途经景点）和自动生成的 coordinates

### 2. Web 端地图（src/screens/MapScreen.web.tsx）

**已实现**：
- Leaflet 地图 + CartoDB 底图
- 自定义 divIcon Marker（彩色圆点 + 标签）
- 搜索 + 分类筛选
- 底部详情面板（Bottom Sheet）
- ⭐ **导航模拟**：
  - 调用高德步行路径规划 API
  - Polyline 解码
  - 小箭头沿道路移动动画
  - 地图锁定跟随
  - 附近景点动态显示
  - 重要景点提示

**技术细节**：
- 使用 `requestAnimationFrame` 实现流畅动画
- 箭头角度实时计算（指向下一个坐标点）
- 高德 API 失败时自动 fallback 到平滑曲线

### 3. 状态管理（src/context/AppStateContext.tsx）

- 收藏列表（AsyncStorage 持久化）
- 最近浏览记录
- 简单的全局状态

### 4. 导航结构

**Web 端**：
- Tab 导航：地图 / 路线 / 识别 / 我的
- Stack 嵌套：详情页、设置页等

**Native 端**：
- 基础 Tab 导航已搭建
- 功能较简单，需对齐 Web 端

### 5. 其他页面

- WelcomeScreen：欢迎页
- LandmarkDetailScreen：景点详情
- RoutesScreen：路线列表
- RouteDetailScreen：路线详情
- RecognitionScreen：识别页（占位）
- ProfileScreen：个人主页

---

## 待完成 ⚠️

### 优先级：高（影响演示）

#### 1. Native 端地图功能补齐
**文件**：`src/screens/MapScreen.native.tsx`

**当前状态**：
- 基础地图（react-native-maps）
- 显示 Marker
- 简单的搜索

**需要做的**：
- [ ] 添加路线功能（与 Web 端对齐）
- [ ] 添加导航模拟（或简化版路线展示）
- [ ] 优化 Bottom Sheet 体验
- [ ] 测试真机性能

**建议**：如果时间紧，Native 端只做静态路线展示，不做动画。

#### 2. 景点图片资源
**当前**：部分使用 `cover` 字段，但可能加载失败

**需要做的**：
- [ ] 准备 18 张景点封面图（可先用 Wikimedia Commons 的公开图片）
- [ ] 处理图片加载失败 fallback（已部分实现，需完善）
- [ ] 图片尺寸统一（建议 400x300）

#### 3. 识别页功能
**文件**：`src/screens/RecognitionScreen.tsx`

**当前状态**：占位页面

**建议方案**：
- 方案A：接入百度/腾讯图像识别 API（通用物体识别）
- 方案B：做成本地图鉴，拍照对比（不需要 AI）
- 方案C：直接隐藏该 Tab，专注地图（最稳妥）

### 优先级：中（体验优化）

#### 4. 导航精细度优化
**文件**：`MapScreen.web.tsx` 中的 `fetchWalkingRoute`

**当前问题**：
- 高德 API 有时返回的路径不够精细（大路段）
- 动画时可能"穿墙"或走直线

**优化方向**：
- [ ] 尝试高德 `driving` 或 `walking` 的不同参数
- [ ] 或者增加中间插值点，让曲线更平滑
- [ ] 预加载路线数据（避免点击后等待）

#### 5. 性能优化
- [ ] Marker 聚类（景点多时避免重叠）
- [ ] 图片懒加载
- [ ] 路由切换动画优化

### 优先级：低（锦上添花）

#### 6. 离线支持
- [ ] 景点数据离线（已完成，JSON 本地）
- [ ] 地图瓦片离线（难度大，可不做）

#### 7. 社交功能
- [ ] 分享路线
- [ ] 用户评论（需要后端）

---

## 关键代码位置

### 导航模拟（核心）

```typescript
// MapScreen.web.tsx

// 高德 API 调用
fetchWalkingRoute(origin, destination, waypoints)

// 解码坐标
decodePolyline(encoded: string)

// 动画循环
animate() {
  // 计算当前位置（插值）
  // 更新箭头位置 + 角度
  // 地图跟随 panTo
  // 显示附近景点
}
```

### 数据修改

```typescript
// 添加/修改景点：src/data/landmarks.ts
// 添加/修改路线：src/data/routes.ts
// 注意：routes.ts 的 coordinates 是自动生成的，不要手动改
```

### 样式调整

```typescript
// 主题色：src/theme/colors.ts
// 地图相关样式：MapScreen.web.tsx 中的 injectCSS()
```

---

## 环境配置检查清单

- [ ] `.env` 文件存在
- [ ] `EXPO_PUBLIC_AMAP_WEB_KEY` 已填写（Web服务Key）
- [ ] `EXPO_PUBLIC_AMAP_SECURITY_JS_CODE` 已填写
- [ ] 高德 Key 的"Web服务"权限已开启
- [ ] 高德 Key 的"步行路径规划"配额充足（每日5000次）

---

## 演示前检查清单

### Web 端演示

```bash
cd D:\map_for_PK\app-contest
npm run web
```

检查项：
- [ ] 地图正常加载
- [ ] 18 个景点 Marker 显示
- [ ] 搜索功能正常
- [ ] 点击"皇城中轴线" → 显示"正在规划路线..."
- [ ] 箭头出现并沿道路移动（有明显转弯）
- [ ] 经过天安门显示提示
- [ ] 可退出导航
- [ ] 收藏功能正常

### 真机演示（如果做）

```bash
npm run start
```

检查项：
- [ ] Expo Go 能正常加载
- [ ] 地图不卡顿
- [ ] 基础功能可用（搜索、详情、收藏）
- [ ] 路线功能至少能显示静态路线

---

## 风险提示

| 风险 | 影响 | 应对方案 |
|------|------|----------|
| 高德 API 限流/失效 | 导航变直线 | 已内置平滑曲线 fallback |
| 真机演示网络差 | 地图加载慢 | 优先 Web 端演示 |
| Native 端功能不齐 | 真机体验差 | 演示时用 Web 端投屏 |
| 图片加载失败 | 详情页空白 | 已有 fallback 显示首字 |

---

## 联系人

- 原负责人：[姓名]
- 开发A：[姓名] - Web端优化
- 开发B：[姓名] - Native端
- 开发C：[姓名] - 内容/设计

---

**交接日期**：2025年3月  
**项目路径**：`D:\map_for_PK\app-contest`
