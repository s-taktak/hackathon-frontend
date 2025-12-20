// src/lib/api_config.ts
import { OpenAPI } from "./api_client";

// FastAPIのURL (ポート8000)
OpenAPI.BASE = process.env.REACT_APP_API_BASE_URL;

// トークンがあればセットする設定（後述のauth.tsで管理してもOK）
if (typeof window !== "undefined") {
  const token = sessionStorage.getItem("access_token");
  if (token) OpenAPI.TOKEN = token;
}
