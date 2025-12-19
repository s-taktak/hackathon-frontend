import { useState, useEffect } from "react";
import { ItemResponse, MeService } from "../../../lib/api_client";

export const useCreatedItems = () => {
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreatedItems = async () => {
      try {
        setLoading(true);
        const data = await MeService.getMyListing();
        setItems(data);
      } catch (err) {
        console.error("出品履歴の取得に失敗しました:", err);
        setError("データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchCreatedItems();
  }, []);

  return { items, loading, error };
};
