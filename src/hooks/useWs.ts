import type { Post } from "@/types/Post";
import isJsonString from "@/utils/isJsonString";
import { useEffect, type Dispatch, type SetStateAction } from "react";

export default function useWs(
  setNewPost: Dispatch<SetStateAction<Post | undefined>>
) {
  useEffect(() => {
    const ws = new WebSocket("wss://echo.websocket.org");

    ws.onopen = () => {
      console.log("WebSocket connection established");

      // Send a test message to the echo server

      setTimeout(() => {
        if (ws.readyState !== ws.OPEN) return;
        const testMessage = JSON.stringify({
          id: 0,
          title: "Real-Time Post",
          body: "This is a real-time post received via WebSocket.",
          userId: 1,
        });

        ws.send(testMessage);
      }, 1000);
    };

    ws.onmessage = (event) => {
      if (isJsonString(event.data)) {
        const newPost = JSON.parse(event.data);
        setNewPost(newPost);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [setNewPost]);
}
