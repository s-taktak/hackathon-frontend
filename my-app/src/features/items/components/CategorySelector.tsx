import { useState, useEffect } from "react";
import {
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { Category, CategoryService } from "../../../lib/api_client";

interface CategorySelectorProps {
  onSelect: (id: number) => void;
}

export const CategorySelector = ({ onSelect }: CategorySelectorProps) => {
  const [lv0List, setLv0List] = useState<Category[]>([]);
  const [lv1List, setLv1List] = useState<Category[]>([]);
  const [lv2List, setLv2List] = useState<Category[]>([]);

  const [selected0, setSelected0] = useState<string>("");
  const [selected1, setSelected1] = useState<string>("");
  const [selected2, setSelected2] = useState<string>("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    CategoryService.getCategories()
      .then(setLv0List)
      .catch((err) => console.error("大分類ロード失敗:", err));
  }, []);

  const handleLv0Change = async (event: SelectChangeEvent) => {
    const val = event.target.value;

    setSelected0(val);
    setSelected1("");
    setSelected2("");
    setLv1List([]);
    setLv2List([]);

    if (val) {
      setLoading(true);
      try {
        const idNum = Number(val);
        const children = await CategoryService.getCategories(idNum);
        setLv1List(children);
      } catch (e) {
        console.error("中分類ロード失敗:", e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLv1Change = async (event: SelectChangeEvent) => {
    const val = event.target.value;
    setSelected1(val);
    setSelected2("");
    setLv2List([]);

    if (val) {
      setLoading(true);
      try {
        const children = await CategoryService.getCategories(Number(val));
        setLv2List(children);
      } catch (e) {
        console.error("小分類ロード失敗:", e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLv2Change = (event: SelectChangeEvent) => {
    const val = event.target.value;
    setSelected2(val);
    if (val) {
      onSelect(Number(val));
    }
  };

  return (
    <Stack spacing={2}>
      <FormControl fullWidth size="small">
        <InputLabel>大カテゴリー</InputLabel>
        <Select
          value={selected0}
          label="大カテゴリー"
          onChange={handleLv0Change}
        >
          <MenuItem value="">選択してください</MenuItem>
          {lv0List.map((c) => (
            <MenuItem key={c.id} value={c.id.toString()}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selected0 !== "" && (
        <FormControl
          fullWidth
          size="small"
          disabled={loading || lv1List.length === 0}
        >
          <InputLabel>中カテゴリー</InputLabel>
          <Select
            value={selected1}
            label="中カテゴリー"
            onChange={handleLv1Change}
          >
            <MenuItem value="">選択してください</MenuItem>
            {lv1List.map((c) => (
              <MenuItem key={c.id} value={c.id.toString()}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
          {selected0 && lv1List.length === 0 && !loading && (
            <FormHelperText error>
              子カテゴリーが見つかりません(ID:{selected0})
            </FormHelperText>
          )}
        </FormControl>
      )}

      {selected1 !== "" && (
        <FormControl
          fullWidth
          size="small"
          disabled={loading || lv2List.length === 0}
        >
          <InputLabel>小カテゴリー</InputLabel>
          <Select
            value={selected2}
            label="小カテゴリー"
            onChange={handleLv2Change}
          >
            <MenuItem value="">選択してください</MenuItem>
            {lv2List.map((c) => (
              <MenuItem key={c.id} value={c.id.toString()}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {loading && <CircularProgress size={20} sx={{ alignSelf: "center" }} />}
    </Stack>
  );
};
