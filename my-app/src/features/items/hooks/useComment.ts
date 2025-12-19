import { useEffect, useState } from "react";
import {
  CommentService,
  CommentCreate,
  CommentResponse,
} from "../../../lib/api_client";

const MOCK_COMMENTS: CommentResponse[] = [
  {
    id: "1",
    item_id: "item_id_1",
    username: "たかや",
    content: "これ、値下げ可能ですか？",
    created_at: "2025-12-19T10:00:00Z",
    isSeller: false,
  },
];

export const useComment = (id: string | undefined) => {
  const [comments, setComments] = useState<CommentResponse[]>(MOCK_COMMENTS);
  const [inputText, setInputText] = useState("");

  const handleSend = async () => {
    if (!id || !inputText.trim()) return;

    const newComment: CommentCreate = {
      content: inputText,
    };

    try {
      const res = await CommentService.postComment(id as string, newComment);

      setComments((prev) => [...prev, res]);
      setInputText("");
    } catch (error) {
      console.error("コメント送信エラー:", error);
    }
  };

  const fetchComments = async () => {
    if (!id) return;
    try {
      const res = await CommentService.getComment(id);
      setComments(res);
    } catch (error) {
      console.error("コメント取得エラー:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  return { comments, inputText, setInputText, handleSend };
};
