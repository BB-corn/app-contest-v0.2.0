import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@jingji_favorites";
const RECENT_KEY = "@jingji_recent";
const MAX_RECENT = 20;

interface AppState {
  favorites: string[];
  recentIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addRecent: (id: string) => void;
}

const AppStateContext = createContext<AppState>({
  favorites: [],
  recentIds: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  addRecent: () => {}
});

export function useAppState() {
  return useContext(AppStateContext);
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // 启动时读取本地存储
  useEffect(() => {
    (async () => {
      try {
        const [favRaw, recRaw] = await Promise.all([
          AsyncStorage.getItem(FAVORITES_KEY),
          AsyncStorage.getItem(RECENT_KEY)
        ]);
        if (favRaw) setFavorites(JSON.parse(favRaw));
        if (recRaw) setRecentIds(JSON.parse(recRaw));
      } catch {
        // 静默失败，使用空默认值
      }
    })();
  }, []);

  const persistFavorites = useCallback(async (next: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const persistRecent = useCallback(async (next: string[]) => {
    try {
      await AsyncStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = prev.includes(id)
          ? prev.filter((f) => f !== id)
          : [id, ...prev];
        persistFavorites(next);
        return next;
      });
    },
    [persistFavorites]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const addRecent = useCallback(
    (id: string) => {
      setRecentIds((prev) => {
        const filtered = prev.filter((r) => r !== id);
        const next = [id, ...filtered].slice(0, MAX_RECENT);
        persistRecent(next);
        return next;
      });
    },
    [persistRecent]
  );

  return (
    <AppStateContext.Provider
      value={{ favorites, recentIds, toggleFavorite, isFavorite, addRecent }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
