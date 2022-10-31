import { chats as mockChats } from "./mockData";
import Avatar from "../../components/avatar/avatar";
import Block from "../../utils/block";
import { render } from "../../utils/renderDOM";
import { chatsTemplate } from "./chatsTemplate";
import GeneralLink from "../../components/generalLink/generalLink";
import Chat from "../../components/chat/chat";
import ChatPageInput from "../../components/chatPageInput/chatPageInput";
import Message from "../../components/message/message";
import MessagesList from "../../components/messagesList/messagesList";
import IconButton from "../../components/iconButton/iconButton";
import Select from "../../components/select/select";
import SelectItem from "../../components/selectItem/selectItem";
import ManageUserModal from "../../components/manageUserModal/manageUserModal";
import GeneralInput from "../../components/generalInput/generalInput";
import GeneralButton from "../../components/generalButton/generalButton";
import ManageChatModal from "../../components/manageChatModal/manageChatModal";
import Input from "../../components/input/input";
import { onSubmitForm } from "../../utils/form/form";

class Chats extends Block {
  constructor() {
    super("div", {
      chatPageInput: new ChatPageInput({
        class: ["input-wrapper"],
        placeholder: "search",
        type: "search",
      }),
      class: ["chats-container"],
      chats: chatsArray,
      generalLink: new GeneralLink({
        text: "Profile",
        class: ["profile-link-container"],
        href: "../../pages/profile/profile.pug",
      }),
      avatarHeader: new Avatar({
        avatarURL: mockChats[0].avatarURL,
        class: ["avatar-container"],
        classImg: "avatar-container_avatar",
      }),
      userName: mockChats[0].display_name,
      messagesList: new MessagesList({
        timeHeader: mockChats[0].time,
        messages: messagesArray,
      }),
      inputFooter: new ChatPageInput({
        class: ["input-wrapper"],
        type: "text",
        placeholder: "message",
        name: "message",
        required: true,
      }),
      messageButton: new IconButton({
        class: ["message-form__button"],
        events: {
          click: (event) => onSubmitForm.apply(this, [event]),
        },
      }),
      manageFileButton: new IconButton({
        class: ["manage-file__button"],
        events: {
          click: (event) => openSelect.apply(this, [event, "selectFooter"]),
        },
      }),
      selectFooter: new Select({
        class: ["select-list-footer"],
        items: [
          new SelectItem({
            text: "Photo or video",
            classIcon: "photo-video-icon",
          }),
          new SelectItem({
            text: "File",
            classIcon: "file-icon",
          }),
          new SelectItem({
            text: "Location",
            classIcon: "location-icon",
          }),
        ],
      }),
      manageUserButton: new IconButton({
        class: ["manage-user__button"],
        events: {
          click: (event) => openSelect.apply(this, [event, "selectHeader"]),
        },
      }),
      selectHeader: new Select({
        class: ["select-list-header"],
        items: [
          new SelectItem({
            text: "Add user",
            classIcon: "add-icon",
            events: {
              click: () => openDialog.apply(this, ["addUserDialog"]),
            },
          }),
          new SelectItem({
            text: "Delete user",
            classIcon: "delete-icon",
            events: {
              click: () => openDialog.apply(this, ["deleteUserDialog"]),
            },
          }),
          new SelectItem({
            text: "Delete chat",
            classIcon: "delete-icon",
            events: {
              click: () => openDialog.apply(this, ["manageChatModal"]),
            },
          }),
        ],
      }),
      deleteUserDialog: new ManageUserModal({
        class: ["deleteUserModal"],
        title: "Delete user",
        generalInput: new GeneralInput({
          label: "login",
          input: new Input({
            attr: {
              type: "login",
              name: "login",
              required: true,
            },
          }),
          errorText: "",
        }),
        generalButton: new GeneralButton({
          buttonText: "Delete user",
        }),
      }),
      addUserDialog: new ManageUserModal({
        class: ["addUserModal"],
        title: "Add user",
        generalInput: new GeneralInput({
          label: "login",
          input: new Input({
            attr: {
              type: "login",
              name: "login",
              maxLength: 20,
              minLength: 3,
              required: true,
            },
          }),
          errorText: "Invalid login",
        }),
        generalButton: new GeneralButton({
          buttonText: "Add user",
        }),
      }),
      manageChatModal: new ManageChatModal({
        class: ["deleteChatModal"],
        title: "Are you sure you want to delete the chat?",
        generalButton: new GeneralButton({
          buttonText: "Delete",
        }),
      }),
    });
  }

  render(): DocumentFragment {
    return this.compile(chatsTemplate, this.props);
  }
}

const messagesArray =
  mockChats[0].messages?.map((message, index) => {
    if (index % 2 === 0) {
      return new Message({
        message,
        time: mockChats[0].time,
        name: mockChats[0].display_name,
        className: "my-message",
        avatar: new Avatar({
          avatarURL: mockChats[0].avatarURL,
          class: ["avatar-container"],
          classImg: "avatar-container_avatar",
        }),
      });
    }
    return new Message({
      message,
      time: mockChats[0].time,
      name: mockChats[0].display_name,
      className: "user-message",
      avatar: new Avatar({
        avatarURL: mockChats[0].avatarURL,
        class: ["avatar-container"],
        classImg: "avatar-container_avatar",
      }),
    });
  }) ?? [];

const chatsArray = mockChats.map(
  (chat) =>
    new Chat({
      class: ["user"],
      name: chat.display_name,
      message: chat.message,
      time: chat.time,
      count: chat.countMessages ?? 0,
      avatar: new Avatar({
        avatarURL: chat.avatarURL,
        class: ["avatar-container"],
        classImg: "avatar-container_avatar",
      }),
    })
);

const chats = new Chats();

render(".main", chats);

function openSelect() {
  this.children[arguments[1]].service.open();
  (arguments[0] as PointerEvent).stopPropagation();
}

function openDialog() {
  this.children[arguments[0]].service.openDialog();
}