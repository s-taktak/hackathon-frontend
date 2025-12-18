import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";

interface UserProfileCardProps {
  username: string;
}

export const UserProfileCard = ({ username }: UserProfileCardProps) => {
  return (
    <Paper
      sx={{ p: 3, mb: 4, display: "flex", alignItems: "center", gap: 2 }}
      elevation={1}
    >
      <Avatar sx={{ width: 60, height: 60, bgcolor: "grey.300" }}>
        <PersonIcon sx={{ fontSize: 40, color: "common.white" }} />
      </Avatar>
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          本人確認前
        </Typography>
      </Box>
    </Paper>
  );
};
