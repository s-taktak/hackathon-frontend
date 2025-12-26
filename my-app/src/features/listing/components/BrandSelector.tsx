import { useState, useEffect, useMemo } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { BrandService, Brand } from "../../../lib/api_client";
import { debounce } from "@mui/material/utils";

interface BrandSelectorProps {
  onSelect: (id: number) => void;
  selectedBrand?: Brand | null;
}

export const BrandSelector = ({ onSelect, selectedBrand }: BrandSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<Brand | null>(null);

  useEffect(() => {
    if (selectedBrand) {
      setValue(selectedBrand);
      setOptions([selectedBrand]);
    }
  }, [selectedBrand]);

  const fetchBrands = useMemo(
    () =>
      debounce(async (request: { input: string }, callback: (results?: Brand[]) => void) => {
        try {
          const response = await BrandService.searchBrands(request.input);
          callback(response);
        } catch (error) {
          console.error("Failed to search brands", error);
          callback([]);
        }
      }, 400),
    [],
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      // Don't clear options if we have a selected value, just keep it or empty?
      // For now, let's keep behaviour simple. 
      // If user types and clears, we might want to clear options but keep value if not changed?
      setOptions(value ? [value] : []);
      return undefined;
    }

    setLoading(true);

    fetchBrands({ input: inputValue }, (results?: Brand[]) => {
      if (active) {
        let newOptions: Brand[] = [];
        if (results) {
          newOptions = results;
        }
        setOptions(newOptions);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetchBrands, value]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(_, newValue) => {
        setValue(newValue);
        if (newValue) {
          onSelect(newValue.id);
        }
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      value={value}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="ブランド（検索可）"
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
