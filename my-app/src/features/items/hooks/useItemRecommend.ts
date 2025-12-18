import { useState, useEffect } from "react";
import { ItemResponse, RecommendService } from "../../../lib/api_client";

export const useItemRecommend = (id: string) => {
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await RecommendService.recommend(id);
        if (isMounted) {
          setItems(response);
        }
      } catch (error) {
        if (isMounted) setItems([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchItems();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return { items, loading };
};
