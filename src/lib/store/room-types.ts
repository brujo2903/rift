export type RoomState = {
  id: string;
  name: string;
  type: string;
  isPrivate: boolean;
  players: Map<string, PlayerState>;
  cards: Map<string, CardState>;
  events: GameEvent[];
  resources: Map<string, number>;
  environmentalEffects: EnvironmentalEffect[];
  lastUpdate: number;
};

export type PlayerState = {
  id: string;
  name: string;
  position: { x: number; y: number };
  score: number;
  status: 'active' | 'idle' | 'away';
  lastAction: number;
};

export type CardState = {
  id: string;
  type: string;
  position: { x: number; y: number };
  rotation: number;
  ownerId: string | null;
  state: 'deck' | 'hand' | 'play' | 'discard';
};

export type GameEvent = {
  id: string;
  type: string;
  data: any;
  timestamp: number;
};

export type EnvironmentalEffect = {
  id: string;
  type: string;
  intensity: number;
  duration: number;
  startTime: number;
};