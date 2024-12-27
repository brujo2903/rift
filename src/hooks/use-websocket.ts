import { useState, useEffect } from 'react';
import { WebSocketClient } from '@/lib/websocket-client';
import type { RoomState } from '@/lib/store/room-types';

export function useWebSocket(roomId: string) {
  const [client, setClient] = useState<WebSocketClient | null>(null);
  const [state, setState] = useState<RoomState | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const wsClient = new WebSocketClient(roomId);

    wsClient.connect().catch(setError);
    setClient(wsClient);

    const unsubscribe = wsClient.subscribe(setState);

    return () => {
      unsubscribe();
      wsClient.disconnect();
    };
  }, [roomId]);

  const sendAction = async (type: string, data: any) => {
    try {
      await client?.sendAction(type, data);
    } catch (err) {
      setError(err as Error);
    }
  };

  return { state, error, sendAction };
}