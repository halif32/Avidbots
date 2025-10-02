/**
 * Represents a chat message.
 * @interface ChatMessage
 */
export interface ChatMessage {
  /**
   * The text content of the message.
   * @type {string}
   */
  text: string;
  
  /**
   * The sender of the message.
   * @type {Object}
   * @property {string} [name] - The name of the sender.
   * @property {string} [avatarUrl] - The URL of the sender's avatar.
   * @property {number} [loginId] - The sender's Login ID.
   */
  sender?: {
    name?: string;
    avatarUrl?: string;
    loginId: number;
  };
  
  /**
   * The date and time of the message (ISO 8601).
   * @type {string}
   */
  date: string;
  
  /**
   * The robot data associated with the message {id: string, username: string}.
   * @type {any}
   */
  robot: any;
  
  /**
   * Indicates if the message is read.
   * @type {boolean}
   */
  isRead: boolean;
  
  /**
   * Indicates if the message is received instead of sent.
   * @type {boolean}
   */
  isReceived?: boolean;
  
  /**
   * The socket ID of the sender.
   * @type {string}
   */
  senderSocketId?: string;
}