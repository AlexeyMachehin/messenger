import { MessageDto } from "../utils/dto/message";
import { ChatDto } from "../utils/dto/chat";
import { Store } from "./Store";

export enum StoreChatEvents {
  Updated = "chatUpdated",
  UpdatedMessages = "messagesUpdated",
  UpdatedSelectedChatId = "selectedChatIdUpdated",
}

export class StoreChat extends Store {
  setChats(chats: ChatDto[]) {
    this.set("chats", chats);
    this.emit(StoreChatEvents.Updated, this.state.chats);
  }

  setMessages(chatId: number, messages: MessageDto[] | null) {
    if (messages) {
      this.set(`chatMessages.${chatId}`, messages);
    }
    this.emit(
      StoreChatEvents.UpdatedMessages,
      this.state.chatMessages ? this.state.chatMessages[chatId] : []
    );
  }

  setSelectedChat(chat: ChatDto) {
    this.set("selectedChat", chat);
  }

  setSelectedChatId(chat: number) {
    this.set("selectedChatId", chat);
    this.emit(StoreChatEvents.UpdatedSelectedChatId, this.state.selectedChatId);
  }

  getChats(): ChatDto[] | null {
    return this.getState().chats;
  }

  getSelectedChat(): ChatDto | null {
    return this.getState().selectedChat;
  }

  getSelectedChatId(): number | null {
    return this.getState().selectedChatId;
  }

  getMessages(chatId: number): MessageDto[] | null {
    const chatMessages = this.getState().chatMessages;
    return chatMessages ? chatMessages[chatId] : null;
  }
}

export const storeChat = new StoreChat();
