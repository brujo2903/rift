export type RoomState = {
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

export class RoomManager {
  private ws: WebSocket | null = null;
  private state: RoomState;
  private listeners: Set<(state: RoomState) => void>;
  private roomId: string;
  private playerId: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: number = 1000;

  constructor(roomId: string, playerId: string) {
    this.roomId = roomId;
    this.playerId = playerId;
    this.listeners = new Set();
    this.state = {
      players: new Map(),
      cards: new Map(),
      events: [],
      resources: new Map(),
      environmentalEffects: [],
      lastUpdate: Date.now(),
    };
  }

  async connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/room/${this.roomId}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.sendMessage({
        type: 'JOIN',
        data: {
          playerId: this.playerId,
          timestamp: Date.now()
        }
      });
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    this.ws.onclose = () => {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connect();
        }, this.reconnectTimeout * Math.pow(2, this.reconnectAttempts));
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private handleMessage(message: any) {
    const { type, data } = message;
    
    switch (type) {
      case 'STATE_UPDATE':
        this.handleStateUpdate(data);
        break;
      case 'PLAYER_JOIN':
      case 'PLAYER_LEAVE':
        this.handlePlayerUpdate(data);
        break;
      case 'CARD_MOVE':
        this.handleCardMove(data);
        break;
      case 'PLAYER_ACTION':
        this.handlePlayerAction(data);
        break;
      case 'RESOURCE_UPDATE':
        this.handleResourceUpdate(data);
        break;
      case 'ENVIRONMENTAL_EFFECT':
        this.handleEnvironmentalEffect(data);
        break;
    }
  }

  private sendMessage(message: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  private handleStateUpdate(data: Partial<RoomState>) {
    this.updateState(data);
  }

  private handlePlayerUpdate(data: { playerId: string; action: 'join' | 'leave' }) {
    const { playerId, action } = data;
    if (action === 'join') {
      this.state.players.set(playerId, {
        id: playerId,
        name: `Player ${playerId.slice(0, 4)}`,
        position: { x: 0, y: 0 },
        score: 0,
        status: 'active',
        lastAction: Date.now()
      });
    } else {
      this.state.players.delete(playerId);
    }
    this.updateState({ players: this.state.players });
  }

  private handleCardMove(data: { cardId: string; position: { x: number; y: number }; rotation: number }) {
    const card = this.state.cards.get(data.cardId);
    if (card) {
      card.position = data.position;
      card.rotation = data.rotation;
      this.updateState({ cards: this.state.cards });
    }
  }

  private handlePlayerAction(data: { playerId: string; action: string; timestamp: number }) {
    const player = this.state.players.get(data.playerId);
    if (player) {
      player.lastAction = data.timestamp;
      this.updateState({ players: this.state.players });
    }
  }

  private handleResourceUpdate(data: { resourceId: string; amount: number }) {
    this.state.resources.set(data.resourceId, data.amount);
    this.updateState({ resources: this.state.resources });
  }

  private handleEnvironmentalEffect(data: EnvironmentalEffect) {
    this.state.environmentalEffects.push(data);
    this.updateState({ environmentalEffects: this.state.environmentalEffects });
  }

  private updateState(partialState: Partial<RoomState>) {
    this.state = { ...this.state, ...partialState, lastUpdate: Date.now() };
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Public API
  subscribe(listener: (state: RoomState) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  moveCard(cardId: string, position: { x: number; y: number }, rotation: number) {
    this.sendMessage({
      type: 'CARD_MOVE',
      data: { cardId, position, rotation }
    });
  }

  updatePlayerAction(action: string) {
    this.sendMessage({
      type: 'PLAYER_ACTION',
      data: { playerId: this.playerId, action, timestamp: Date.now() }
    });
  }

  updateResource(resourceId: string, amount: number) {
    this.sendMessage({
      type: 'RESOURCE_UPDATE',
      data: { resourceId, amount }
    });
  }

  triggerEnvironmentalEffect(effect: Omit<EnvironmentalEffect, 'id'>) {
    const effectWithId = {
      ...effect,
      id: crypto.randomUUID(),
      startTime: Date.now()
    };

    this.sendMessage({
      type: 'ENVIRONMENTAL_EFFECT',
      data: effectWithId
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}