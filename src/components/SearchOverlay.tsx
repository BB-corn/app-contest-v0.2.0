import { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  getAllCategories,
  Landmark,
  LandmarkCategory,
  searchLandmarks
} from "../data/landmarks";
import { colors } from "../theme/colors";

interface Props {
  onSelect: (landmark: Landmark) => void;
}

const categories = getAllCategories();

export function SearchOverlay({ onSelect }: Props) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<LandmarkCategory | undefined>(undefined);
  const [focused, setFocused] = useState(false);

  const results = searchLandmarks(query, selectedCategory);
  const showResults = focused && (query.length > 0 || !!selectedCategory);

  const handleSelect = useCallback(
    (item: Landmark) => {
      setFocused(false);
      setQuery("");
      setSelectedCategory(undefined);
      onSelect(item);
    },
    [onSelect]
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 4 }]} pointerEvents="box-none">
      {/* 搜索框 */}
      <View style={styles.searchRow}>
        <View style={styles.inputWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder="搜索景点名称、类别、朝代…"
            placeholderTextColor={colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            onFocus={() => setFocused(true)}
            returnKeyType="search"
          />
          {(query.length > 0 || selectedCategory) && (
            <Pressable
              onPress={() => {
                setQuery("");
                setSelectedCategory(undefined);
              }}
              hitSlop={8}
            >
              <Text style={styles.clearBtn}>✕</Text>
            </Pressable>
          )}
        </View>
        {focused && (
          <Pressable
            onPress={() => {
              setFocused(false);
              setQuery("");
              setSelectedCategory(undefined);
            }}
            style={styles.cancelBtn}
          >
            <Text style={styles.cancelText}>取消</Text>
          </Pressable>
        )}
      </View>

      {/* 分类标签 */}
      {focused && (
        <View style={styles.tagsRow}>
          <Pressable
            style={[
              styles.tag,
              !selectedCategory && styles.tagActive
            ]}
            onPress={() => setSelectedCategory(undefined)}
          >
            <Text
              style={[
                styles.tagText,
                !selectedCategory && styles.tagTextActive
              ]}
            >
              全部
            </Text>
          </Pressable>
          {categories.map((cat) => (
            <Pressable
              key={cat}
              style={[
                styles.tag,
                selectedCategory === cat && styles.tagActive
              ]}
              onPress={() =>
                setSelectedCategory(
                  selectedCategory === cat ? undefined : cat
                )
              }
            >
              <Text
                style={[
                  styles.tagText,
                  selectedCategory === cat && styles.tagTextActive
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* 搜索结果 */}
      {showResults && (
        <View style={styles.resultsList}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                style={styles.resultItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultMeta}>
                  {item.category} · {item.district}
                </Text>
              </Pressable>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>未找到匹配的景点</Text>
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 8
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    height: 42,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3
  },
  searchIcon: {
    fontSize: 15,
    marginRight: 6
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    paddingVertical: 0
  },
  clearBtn: {
    fontSize: 15,
    color: colors.textSecondary,
    paddingLeft: 6
  },
  cancelBtn: {
    paddingHorizontal: 4
  },
  cancelText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600"
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 6
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  tagActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  tagText: {
    fontSize: 13,
    color: colors.textSecondary
  },
  tagTextActive: {
    color: "#fff"
  },
  resultsList: {
    marginHorizontal: 12,
    marginTop: 6,
    maxHeight: 280,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4
  },
  resultItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border
  },
  resultName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary
  },
  resultMeta: {
    marginTop: 2,
    fontSize: 12,
    color: colors.textSecondary
  },
  emptyText: {
    padding: 20,
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 14
  }
});
