import { useState } from "react";

type CommentData = {
  id: number;
  userId: string;
  username: string;
  text: string;
  postedAt: string;
  isSeller: boolean;
};

const MOCK_COMMENTS: CommentData[] = [
  {
    id: 1,
    userId: "user2",
    username: "購入検討中",
    text: "コメント失礼します。こちらの商品はお値下げ可能でしょうか？",
    postedAt: "2時間前",
    isSeller: false,
  },
  {
    id: 2,
    userId: "user1",
    username: "佐藤天哉",
    text: "コメントありがとうございます。今のところ値下げは考えておりません。よろしくお願いいたします。",
    postedAt: "1時間前",
    isSeller: true,
  },
];

export const useComment = (id: string | undefined) => {
  const [comments, setComments] = useState<CommentData[]>(MOCK_COMMENTS);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newComment: CommentData = {
      id: Date.now(),
      userId: "me",
      username: "自分",
      text: inputText,
      postedAt: "たった今",
      isSeller: false,
    };

    setComments([...comments, newComment]);
    setInputText("");
  };

  return { comments, inputText, setInputText, handleSend };
};
