import { useState, useEffect } from "react";
import { ItemResponse, MeService } from "../../../lib/api_client";

export const usePurchasedItems = () => {
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchasedItems = async () => {
      try {
        setLoading(true);
        // バックエンドで作成した「購入済み商品取得API」を呼び出す
        // メソッド名は OpenAPI の定義（operationId）に合わせて調整してください
        const data = await MeService.getPurchasedItems();
        setItems(data);
      } catch (err) {
        console.error("購入履歴の取得に失敗しました:", err);
        setError("データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedItems();
  }, []);

  return { items, loading, error };
};
