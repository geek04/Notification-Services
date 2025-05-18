export interface Notification {
  userId: string;
  channel: 'email' | 'sms' | 'in-app';
  status: 'pending' | 'sent' | 'failed';
  payload: Record<string, any>;
  retries?: number;
  createdAt?: Date;
  trackingId?: string;
}
