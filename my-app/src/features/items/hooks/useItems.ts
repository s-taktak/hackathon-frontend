import { useState, useEffect, useCallback } from "react";
import { ItemResponse, ItemService } from "../../../lib/api_client";

const LIMIT = 20;

export const useItems = () => {
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  const fetchItems = useCallback(async (skip: number, isLoadMore: boolean) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await ItemService.getItemsList(skip, LIMIT);

      if (response.length < LIMIT) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      if (skip === 0) {
        setItems(response);
      } else {
        setItems((prev) => [...prev, ...response]);
      }

      setOffset(skip + LIMIT);
    } catch (error) {
      console.error(error);
      if (skip === 0) setItems([]);
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchItems(0, false);
  }, [fetchItems]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchItems(offset, true);
    }
  };

  return { items, loading, loadingMore, hasMore, loadMore };
};
