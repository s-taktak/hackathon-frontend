import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiService, Category, Brand } from "../../../lib/api_client";

export const useItemForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...newFiles]);

      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const [selectedPath, setSelectedPath] = useState<Category[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [suggesting, setSuggesting] = useState(false);

  const handleAiSuggest = async () => {
    if (!title) {
      alert("商品名を入力してください");
      return;
    }
    setSuggesting(true);
    try {
      const response = await AiService.predictAttributes({ title, description });

      if (response.category_id) setCategory(response.category_id.toString());
      if (response.brand_id) setBrand(response.brand_id.toString());
      
      if (response.category_path) setSelectedPath(response.category_path);
      if (response.brand) setSelectedBrand(response.brand);
      
      alert("AIによる補完が完了しました！");
    } catch (error) {
      console.error(error);
      alert("AI提案に失敗しました");
    } finally {
      setSuggesting(false);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title || !price || !category || !condition || imageFiles.length === 0) {
      alert("必須項目を入力し、画像を1枚以上追加してください");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category_id", category);
      if (brand) {
        formData.append("brand_id", brand);
      }
      formData.append("condition_id", condition);
      formData.append("status", "on_sale");

      imageFiles.forEach((file) => {
        formData.append("files", file);
      });

      const token = sessionStorage.getItem("access_token");
      const response = await fetch(
        "https://hackathon-backend-810870880891.us-central1.run.app/item",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error();

      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      alert("出品が完了しました！");
      navigate("/");
    } catch (error) {
      alert("出品に失敗しました");
      setIsSubmitting(false); // Only submit failure should reset. Success navigates away (or we can reset too, but navigate unmounts).
    }
    // We don't necessarily need finally here if we navigate away on success.
    // If navigation is delayed or we want to be safe, we can add finally.
    // But since we navigate, setting state on unmounted component is a warning.
    // Let's keep it simple: reset on error.
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    category,
    setCategory,
    brand,
    setBrand,
    condition,
    setCondition,
    previewUrls,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
    handleAiSuggest,
    suggesting,
    selectedPath,
    selectedBrand,
    isSubmitting,
  };
};
