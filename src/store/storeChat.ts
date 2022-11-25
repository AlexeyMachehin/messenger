import { ChatDto } from "../utils/dto/chat-dto";
import { Store } from "./Store";

export enum StoreChatEvents {
  Updated = "chatUpdated",
  UpdatedMessages = "messagesUpdated",
}

export class StoreChat extends Store {
  setChat(chats: ChatDto[]) {
    this.set("chats", chats);
    this.emit(StoreChatEvents.Updated, this.state.chats);
  }

  setMessages(messages: any[]) {
    const oldMessage = this.getState()?.messages;
    this.set("messages", [...(oldMessage ? oldMessage : []), ...messages]);
    this.emit(StoreChatEvents.UpdatedMessages, this.state.messages);
  }

  getMessages(): any[] {
    return this.getState().messages;
  }
}

export const storeChat = new StoreChat();
