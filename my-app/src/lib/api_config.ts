// src/lib/api_config.ts
import { OpenAPI } from "./api_client";

// FastAPIのURL (ポート8000)
OpenAPI.BASE = "https://hackathon-backend-810870880891.us-central1.run.app";

// トークンがあればセットする設定（後述のauth.tsで管理してもOK）
if (typeof window !== "undefined") {
  const token = sessionStorage.getItem("access_token");
  if (token) OpenAPI.TOKEN = token;
}
