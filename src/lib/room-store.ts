import { create } from 'zustand';
import { RoomState } from './room-manager';

interface RoomStore {
  rooms: Map<string, RoomState>;
  createRoom: (id: string) => void;
  updateRoom: (id: string, state: Partial<RoomState>) => void;
  deleteRoom: (id: string) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  rooms: new Map(),
  
  createRoom: (id: string) => set((state) => {
    const rooms = new Map(state.rooms);
    rooms.set(id, {
      players: new Map(),
      cards: new Map(),
      events: [],
      resources: new Map(),
      environmentalEffects: [],
      lastUpdate: Date.now(),
    });
    return { rooms };
  }),
  
  updateRoom: (id: string, update: Partial<RoomState>) => set((state) => {
    const rooms = new Map(state.rooms);
    const room = rooms.get(id);
    if (room) {
      rooms.set(id, { ...room, ...update, lastUpdate: Date.now() });
    }
    return { rooms };
  }),
  
  deleteRoom: (id: string) => set((state) => {
    const rooms = new Map(state.rooms);
    rooms.delete(id);
    return { rooms };
  }),
}));