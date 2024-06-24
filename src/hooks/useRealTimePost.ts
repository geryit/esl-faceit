import { useCallback, useMemo } from "react";
import isJsonString from "@/utils/isJsonString";
import useWebSocket from "react-use-websocket";

// Creates a mock real-time post feature using WebSocket
export default function useRealTimePost() {
  const { sendMessage, lastMessage } = useWebSocket("wss://echo.websocket.org");

  const realtimePost = useMemo(() => {
    const data = isJsonString(lastMessage?.data)
      ? JSON.parse(lastMessage?.data)
      : undefined;

    if (data?.type === "realtimePost") return data;
  }, [lastMessage?.data]);

  const sendRealTimePost = useCallback(() => {
    sendMessage(
      JSON.stringify({
        type: "realtimePost",
        id: 0,
        title: "Real-Time Post",
        body: "This is a real-time post received via WebSocket.",
        userId: 2,
      })
    );
  }, [sendMessage]);

  return [sendRealTimePost, realtimePost];
}
