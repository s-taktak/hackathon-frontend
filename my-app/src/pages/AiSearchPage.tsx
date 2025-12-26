import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Paper,
  IconButton,
  InputAdornment,
  Grid,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ItemCard } from "../features/items/components/ItemCard";
import { useChat } from "../features/ai/hooks/useChat";

export const AiSearchPage = () => {
  // 1. フックから状態と関数を取得
  const { messages, sendMessage, isTyping } = useChat();
  const [inputText, setInputText] = useState("");

  // 自動スクロール用の参照
  const scrollRef = useRef<HTMLDivElement>(null);

  // メッセージが増えたら一番下までスクロール
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // 送信処理
  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText(""); // 入力欄をクリア
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        bgcolor: "grey.50",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* ヘッダー */}
      <Box
        sx={{
          p: 2,
          bgcolor: "white",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          AI サーチ
        </Typography>
      </Box>

      {/* メッセージ表示エリア */}
      <Box
        ref={scrollRef} // スクロール対象
        sx={{ flex: 1, overflowY: "auto", p: 2 }}
      >
        <Stack spacing={3}>
          {messages.map((msg, index) => {
            // role が "user" なら自分の発言（右側）
            const isMe = msg.role === "user";

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMe ? "flex-end" : "flex-start",
                }}
              >
                {/* メッセージバブル */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMe ? "row-reverse" : "row",
                    alignItems: "flex-end",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      maxWidth: "280px",
                      borderRadius: 3,
                      bgcolor: isMe ? "primary.main" : "white",
                      color: isMe ? "white" : "text.primary",
                      border: isMe ? "none" : "1px solid",
                      borderColor: "divider",
                      borderBottomRightRadius: isMe ? 0 : 3,
                      borderBottomLeftRadius: isMe ? 3 : 0,
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                      {msg.content}
                    </Typography>
                  </Paper>
                </Box>

                {/* おすすめ商品の表示 */}
                {!isMe && msg.items && msg.items.length > 0 && (
                  <Box sx={{ width: "100%", mt: 1, mb: 2 }}>
                    <Grid container spacing={1}>
                      {msg.items.map((item) => (
                        <Grid
                          size={{ xs: 12, sm: 6, md: 4 }}
                          key={item.id}
                        >
                          <Box
                            sx={{
                              height: "260px",
                              "& .MuiCard-root": { height: "100%" },
                            }}
                          >
                            <ItemCard item={item} />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Box>
            );
          })}

          {/* AIが考え中の時のアニメーション */}
          {isTyping && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <CircularProgress size={16} />
              <Typography variant="caption" color="text.secondary">
                AIが商品を探しています...
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>

      {/* 入力エリア */}
      <Box
        sx={{
          p: 2,
          bgcolor: "white",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <TextField
          fullWidth
          placeholder={isTyping ? "AIが回答中..." : "メッセージを入力..."}
          variant="outlined"
          size="small"
          value={inputText}
          disabled={isTyping} // 考え中は入力不可
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  onClick={handleSend}
                  disabled={!inputText.trim() || isTyping}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};
