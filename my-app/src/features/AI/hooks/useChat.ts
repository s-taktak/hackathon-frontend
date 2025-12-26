import { useState, useEffect } from "react";
import {
  DefaultService,
  AiSearchRequest,
  AiSearchResponse, // これを使う
  ChatMessage,
  ItemResponse,
} from "../../../lib/api_client";

type DisplayMessage = ChatMessage & {
  items?: ItemResponse[] | null;
};

export const useChat = () => {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: DisplayMessage = { role: "user", content: text };
    const updatedHistory = [...messages, userMsg];

    setMessages(updatedHistory);
    setIsTyping(true);

    try {
      const request: AiSearchRequest = {
        message: text,
        history: messages as ChatMessage[],
      };

      const data: AiSearchResponse =
        await DefaultService.aiSearchEndpointAiSearchPost(request);

      const assistantMsg: DisplayMessage = {
        role: "assistant",
        content: data.reply,
        items: data.items,
      };

      setMessages([...updatedHistory, assistantMsg]);
    } catch (error) {
      console.error("AI Search Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, sendMessage, isTyping };
};
