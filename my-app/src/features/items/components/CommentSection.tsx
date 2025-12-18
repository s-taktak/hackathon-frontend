import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  TextField,
  Button,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import { useComment } from "../hooks/useComment";

type CommentSectionProps = {
  itemId: string;
  sellerId?: string | number;
};

export const CommentSection = ({ itemId, sellerId }: CommentSectionProps) => {
  const { comments, inputText, setInputText, handleSend } = useComment(itemId);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        コメント ({comments.length})
      </Typography>

      <Stack spacing={3} sx={{ mb: 4 }}>
        {comments.map((comment) => (
          <Box key={comment.id} sx={{ display: "flex", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: comment.isSeller ? "#EA352D" : "grey.400",
                width: 40,
                height: 40,
              }}
            >
              <PersonIcon />
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mr: 1 }}
                >
                  {comment.username}
                </Typography>
                {comment.isSeller && (
                  <Chip
                    label="出品者"
                    size="small"
                    sx={{
                      bgcolor: "grey.200",
                      color: "text.primary",
                      height: 20,
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                    }}
                  />
                )}
              </Box>

              <Paper
                elevation={0}
                sx={{
                  bgcolor: "grey.100",
                  p: 2,
                  borderRadius: 3,
                  borderTopLeftRadius: 0,
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {comment.text}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1, textAlign: "right" }}
                >
                  {comment.postedAt}
                </Typography>
              </Paper>
            </Box>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="コメントを入力..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          sx={{ mb: 2, bgcolor: "grey.50" }}
        />
        <Button
          variant="contained"
          fullWidth
          disabled={!inputText.trim()}
          startIcon={<SendIcon />}
          onClick={handleSend}
          sx={{ fontWeight: "bold", py: 1 }}
        >
          コメントを送信する
        </Button>
      </Box>
    </Box>
  );
};
