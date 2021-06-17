export namespace NotificationNS {
  export interface Notification {
    id: string;
    user_id: string;
    source_id: string;
    sourceType: string;
    read?: boolean;
    trash?: boolean;
    ctime?: number;
    mtime?: number;
  }

  export interface CreateNotificationParams {
    user_id: string;
    source_id: string;
    sourceType: string;
    read?: boolean;
    trash?: boolean;
  }

  export interface UpdateNotificationParams {
    read?: boolean;
    trash?: boolean;
    mtime?: number;
  }

  export interface BLL {
    ListNotification(): Promise<Notification[]>;
    ListNotificationByUserId(user_id: string): Promise<Notification[]>;
    GetNotification(id: string): Promise<Notification>;
    CreateNotification(params: CreateNotificationParams): Promise<Notification>;
    UpdateNotification(id: string, params: UpdateNotificationParams): Promise<void>;
    DeleteNotification(id: string): Promise<Notification>;
  }

  export interface DAL {
    ListNotification(): Promise<Notification[]>;
    ListNotificationByUserId(user_id: string):  Promise<Notification[]>;
    GetNotification(id: string): Promise<Notification>;
    CreateNotification(Notification: Notification): Promise<void>;
    UpdateNotification(Notification: Notification): Promise<void>;
    DeleteNotification(id: string): Promise<void>;
  }

  export const Errors = {
    ErrNotificationNotFound: new Error("Notification not found"),
  };
}
