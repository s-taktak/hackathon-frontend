import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useItemForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState("");
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

  const handleSubmit = async () => {
    if (!title || !price || !category || imageFiles.length === 0) {
      alert("必須項目を入力し、画像を1枚以上追加してください");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category_id", category);
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
    }
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
    condition,
    setCondition,
    previewUrls,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
  };
};
