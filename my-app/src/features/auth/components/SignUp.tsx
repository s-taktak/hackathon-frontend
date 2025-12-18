import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppTheme from "../../../components/theme/AppTheme";
import ColorModeSelect from "../../../components/theme/ColorModeSelect";
import { AuthService } from "../../../lib/api_client";
import { Gender } from "../../../lib/api_client/models/Gender";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: { width: "450px" },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { padding: theme.spacing(4) },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validate = (data: FormData) => {
    const newErrors: Record<string, string> = {};
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const name = data.get("name") as string;
    const birthdate = data.get("birthdate") as string;

    if (!name) newErrors.name = "名前を入力してください";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "有効なメールアドレスを入力してください";
    if (!password || password.length < 6)
      newErrors.password = "パスワードは6文字以上で入力してください";
    if (!birthdate) newErrors.birthdate = "生年月日を選択してください";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!validate(data)) return;

    try {
      await AuthService.signUp({
        username: data.get("name") as string,
        email: data.get("email") as string,
        password: data.get("password") as string,
        birth_date: data.get("birthdate") as string,
        gender: data.get("gender") as Gender,
      });

      alert("登録成功！ログインしてください。");
      navigate("/login");
    } catch (error) {
      alert(
        "登録に失敗しました。既に登録されているメールアドレスの可能性があります。"
      );
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            新規会員登録
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">ユーザーネーム</FormLabel>
              <TextField
                id="name"
                name="name"
                placeholder="UTTC太郎"
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">メールアドレス</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="birthdate">生年月日</FormLabel>
              <TextField
                id="birthdate"
                name="birthdate"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.birthdate}
                helperText={errors.birthdate}
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>性別</FormLabel>
              <TextField
                select
                id="gender"
                name="gender"
                defaultValue="undefined"
              >
                <MenuItem value="undefined">未回答</MenuItem>
                <MenuItem value="male">男性</MenuItem>
                <MenuItem value="female">女性</MenuItem>
              </TextField>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
              登録する
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
