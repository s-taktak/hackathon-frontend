import { useState, useEffect } from "react";
import { SearchService, ItemResponse } from "../../../lib/api_client";

export const useSearchedItems = (keyword: string | null) => {
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchSearchResults = async () => {
      if (!keyword?.trim()) {
        setItems([]);
        return;
      }

      setLoading(true);
      try {
        const data = await SearchService.search(keyword);
        if (isMounted) {
          setItems(data);
        }
      } catch (error) {
        if (isMounted) setItems([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSearchResults();
    return () => {
      isMounted = false;
    };
  }, [keyword]);

  return { items, loading, keyword };
};
