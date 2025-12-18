import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface MenuLinkProps {
  label: string;
  onClick?: () => void;
}

export const MenuLink = ({ label, onClick }: MenuLinkProps) => {
  return (
    <Paper
      onClick={onClick}
      sx={{
        p: 2,
        cursor: "pointer",
        transition: "all 0.2s",
        ":hover": {
          backgroundColor: "action.hover",
        },
      }}
      elevation={0}
    >
      <Typography variant="body1">{label}</Typography>
    </Paper>
  );
};
