import { useState, useEffect } from "react";
import { ItemResponse, ItemService, ItemStatus } from "../../../lib/api_client";

export const useItemDetail = (id: string | undefined) => {
  const [item, setItem] = useState<ItemResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const data = await ItemService.getItemDetail(id);
        setItem(data);
      } catch (error) {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const purchase = async () => {
    if (!id || !item) return;

    try {
      await ItemService.purchaseItem(id);
      alert("購入しました！");
      setItem((prev) =>
        prev ? { ...prev, status: ItemStatus.SOLD_OUT } : null
      );
      return true;
    } catch (error) {
      alert("購入に失敗しました。既に売り切れている可能性があります。");
      return false;
    }
  };

  const isSoldOut = item?.status === ItemStatus.SOLD_OUT;

  return {
    item,
    loading,
    purchase,
    isSoldOut,
  };
};
