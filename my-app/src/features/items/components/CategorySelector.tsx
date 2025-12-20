import { useState, useEffect } from "react";
import {
  Stack,
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import { Category, CategoryService } from "../../../lib/api_client";

interface CategorySelectorProps {
  onSelect: (id: number) => void;
}

export const CategorySelector = ({ onSelect }: CategorySelectorProps) => {
  // リストデータ
  const [lv0Options, setLv0Options] = useState<Category[]>([]);
  const [lv1Options, setLv1Options] = useState<Category[]>([]);
  const [lv2Options, setLv2Options] = useState<Category[]>([]);

  // 選択されたオブジェクト（AutocompleteはID単体よりオブジェクトで持つ方が安定します）
  const [value0, setValue0] = useState<Category | null>(null);
  const [value1, setValue1] = useState<Category | null>(null);
  const [value2, setValue2] = useState<Category | null>(null);

  const [loading, setLoading] = useState(false);

  // 1. 最初は大分類をロード
  useEffect(() => {
    CategoryService.getCategories()
      .then(setLv0Options)
      .catch((err) => console.error("大分類ロード失敗:", err));
  }, []);

  // 2. 大分類が変わった時
  const handleLv0Change = async (newValue: Category | null) => {
    setValue0(newValue);
    setValue1(null);
    setValue2(null);
    setLv1Options([]);
    setLv2Options([]);

    if (newValue) {
      setLoading(true);
      try {
        // newValue.id が 8125 などの場合、DBの parent_id もそれに対応している必要があります
        const children = await CategoryService.getCategories(newValue.id);
        setLv1Options(children);
      } finally {
        setLoading(false);
      }
    }
  };

  // 3. 中分類が変わった時
  const handleLv1Change = async (newValue: Category | null) => {
    setValue1(newValue);
    setValue2(null);
    setLv2Options([]);

    if (newValue) {
      setLoading(true);
      try {
        const children = await CategoryService.getCategories(newValue.id);
        setLv2Options(children);
      } finally {
        setLoading(false);
      }
    }
  };

  // 4. 小分類が変わった時
  const handleLv2Change = (newValue: Category | null) => {
    setValue2(newValue);
    if (newValue) {
      onSelect(newValue.id);
    }
  };

  return (
    <Stack spacing={3}>
      {/* --- 大分類 --- */}
      <Autocomplete
        options={lv0Options}
        getOptionLabel={(option) => option.name}
        value={value0}
        onChange={(_, newValue) => handleLv0Change(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="大カテゴリー（検索可）" size="small" />
        )}
      />

      {/* --- 中分類（大分類が選択されたら表示） --- */}
      {(value0 || lv1Options.length > 0) && (
        <Autocomplete
          options={lv1Options}
          getOptionLabel={(option) => option.name}
          value={value1}
          disabled={lv1Options.length === 0}
          onChange={(_, newValue) => handleLv1Change(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="中カテゴリー（検索可）"
              size="small"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}

      {/* --- 小分類（中分類が選択されたら表示） --- */}
      {(value1 || lv2Options.length > 0) && (
        <Autocomplete
          options={lv2Options}
          getOptionLabel={(option) => option.name}
          value={value2}
          disabled={lv2Options.length === 0}
          onChange={(_, newValue) => handleLv2Change(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="小カテゴリー（検索可）"
              size="small"
            />
          )}
        />
      )}
    </Stack>
  );
};
