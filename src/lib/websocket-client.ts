import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import { RoomState } from './store/room-types';

export class WebSocketClient {
  private channel: RealtimeChannel | null = null;
  private listeners: Set<(state: RoomState) => void> = new Set();

  constructor(
    private roomId: string,
    private supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    )
  ) {}

  async connect() {
    // Subscribe to room changes
    this.channel = this.supabase
      .channel(`room:${this.roomId}`)
      .on('presence', { event: 'sync' }, () => {
        this.handlePresenceSync();
      })
      .on('broadcast', { event: 'state_update' }, (payload) => {
        this.handleStateUpdate(payload);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await this.channel?.track({
            user_id: (await this.supabase.auth.getUser()).data.user?.id,
            online_at: new Date().toISOString(),
          });
        }
      });
  }

  private handlePresenceSync() {
    const presence = this.channel?.presenceState() ?? {};
    // Update connected players
  }

  private handleStateUpdate(payload: any) {
    this.listeners.forEach(listener => listener(payload.state));
  }

  subscribe(listener: (state: RoomState) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async disconnect() {
    await this.channel?.unsubscribe();
  }

  async sendAction(type: string, data: any) {
    await this.supabase
      .from('room_actions')
      .insert({
        room_id: this.roomId,
        action_type: type,
        action_data: data,
      });
  }
}