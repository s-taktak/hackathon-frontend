import { useState, useEffect } from "react";
import { ItemResponse, ItemService } from "../../../lib/api_client";

export const useItems = () => {
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchItems = async () => {
      try {
        const response = await ItemService.getItemsList();
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
  }, []);

  return { items, loading };
};
