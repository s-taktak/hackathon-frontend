// src/lib/api_config.ts
import { OpenAPI } from "./api_client";

// FastAPIのURL (ポート8000)
OpenAPI.BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8080";

// トークンがあればセットする設定（後述のauth.tsで管理してもOK）
if (typeof window !== "undefined") {
  const token = localStorage.getItem("access_token");
  if (token) OpenAPI.TOKEN = token;
}
