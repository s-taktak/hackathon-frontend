import { useState, useEffect } from "react";
import {
  Stack,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Category, CategoryService } from "../../../lib/api_client";

interface CategorySelectorProps {
  onSelect: (id: number) => void;
  selectedPath?: Category[];
}

export const CategorySelector = ({ onSelect, selectedPath }: CategorySelectorProps) => {
  const [lv0Options, setLv0Options] = useState<Category[]>([]);
  const [lv1Options, setLv1Options] = useState<Category[]>([]);
  const [lv2Options, setLv2Options] = useState<Category[]>([]);

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

  // AIによる自動入力の監視
  useEffect(() => {
    if (selectedPath && selectedPath.length > 0) {
      // 大分類 (Lv0)
      const lv0 = selectedPath.find(c => c.depth === 0);
      if (lv0) {
         setValue0(lv0);
         // 次のレベルの選択肢をロード
         CategoryService.getCategories(lv0.id).then(children => {
             setLv1Options(children);
             
             // 中分類 (Lv1)
             const lv1 = selectedPath.find(c => c.depth === 1);
             if (lv1) {
                 setValue1(lv1);
                 CategoryService.getCategories(lv1.id).then(grandChildren => {
                     setLv2Options(grandChildren);
                     
                     // 小分類 (Lv2)
                     const lv2 = selectedPath.find(c => c.depth === 2);
                     if (lv2) {
                         setValue2(lv2);
                     }
                 });
             }
         });
      }
    }
  }, [selectedPath]);

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
        const children = await CategoryService.getCategories(newValue.id);
        setLv1Options(children);
      } finally {
        setLoading(false);
      }
    }
  };

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
        isOptionEqualToValue={(option, value) => option.id === value.id}
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
          isOptionEqualToValue={(option, value) => option.id === value.id}
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
          isOptionEqualToValue={(option, value) => option.id === value.id}
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
