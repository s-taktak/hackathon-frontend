import { useState, useEffect } from "react";
import { MeService } from "../../../lib/api_client";

export const useUserProfile = () => {
  const [username, setUsername] = useState("ゲストユーザー");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await MeService.getMyProfile();
        setUsername(response.username ?? "ゲスト");
      } catch (error) {
        setUsername("ゲスト");
      }
    };

    fetchUser();
  }, []);

  return { username };
};
