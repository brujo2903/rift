import { useState, useEffect, useCallback } from 'react';
import { RoomManager, RoomState } from '@/lib/room-manager';

export function useRoom(roomId: string, playerId: string) {
  const [roomManager, setRoomManager] = useState<RoomManager | null>(null);
  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const manager = new RoomManager(roomId, playerId);

    manager.connect().catch(setError);
    setRoomManager(manager);

    const unsubscribe = manager.subscribe(setRoomState);

    return () => {
      unsubscribe();
      manager.disconnect();
    };
  }, [roomId, playerId]);

  const moveCard = useCallback((cardId: string, position: { x: number; y: number }, rotation: number) => {
    roomManager?.moveCard(cardId, position, rotation);
  }, [roomManager]);

  const updatePlayerAction = useCallback((action: string) => {
    roomManager?.updatePlayerAction(action);
  }, [roomManager]);

  const updateResource = useCallback((resourceId: string, amount: number) => {
    roomManager?.updateResource(resourceId, amount);
  }, [roomManager]);

  const triggerEnvironmentalEffect = useCallback((effect: any) => {
    roomManager?.triggerEnvironmentalEffect(effect);
  }, [roomManager]);

  return {
    roomState,
    error,
    actions: {
      moveCard,
      updatePlayerAction,
      updateResource,
      triggerEnvironmentalEffect
    }
  };
}