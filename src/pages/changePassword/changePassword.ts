import {
  ValidationPattern,
  ValidationError,
} from "./../../utils/models/validation";
import GeneralButton from "../../components/generalButton/generalButton";
import GeneralInput from "../../components/generalInput/generalInput";
import GoBackAside from "../../components/goBackAside/goBackAside";
import Input from "../../components/input/input";
import Block from "../../utils/block";
import { onSubmitForm } from "../../utils/form/form";
import { render } from "../../utils/renderDOM";
import { changePasswordTemplate } from "./changePasswordTemplate";

export default class ChangePassword extends Block {
  constructor() {
    super("div", {
      avatarURL:
        "https://avatars.mds.yandex.net/i?id=90a14aacfb5159c04fc902bad5bbd095-5232129-images-thumbs&n=13&exp=1",
      generalInputOldPassword: new GeneralInput({
        input: new Input({
          type: "password",
          attr: {
            name: "old-password",
            required: true,
            pattern: ValidationPattern.Password,
          },
        }),
        label: "Old password",
        errorText: ValidationError.Password,
      }),
      generalInputNewPassword: new GeneralInput({
        input: new Input({
          type: "password",
          attr: {
            name: "password",
            required: true,
            pattern: ValidationPattern.Password,
          },
        }),
        label: "New password",
        errorText: ValidationError.Password,
      }),

      generalButtonSave: new GeneralButton({
        buttonText: "Save",
      }),
      goBackAside: new GoBackAside({}),
      events: {
        submit: (event) => onSubmitForm.apply(this, [event]),
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(changePasswordTemplate, this.props);
  }
}
const changePassword = new ChangePassword();

render(".main", changePassword);