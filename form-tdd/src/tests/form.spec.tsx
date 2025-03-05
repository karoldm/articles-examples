import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  logRoles,
  render,
  waitFor,
} from "@testing-library/react";
import { Form } from "../components/Form";

const handleSubmitForm = jest.fn();

describe("Form with react hook form", () => {
  it("should render forms", () => {
    const view = render(<Form submitForm={handleSubmitForm} />);

    logRoles(view.container);

    const inputEmail = view.getByRole("textbox", { name: "email" });
    const inputPassword = view.getByRole("textbox", { name: "password" });
    const buttonSubmit = view.getByRole("button", { name: "send" });

    // toBeVisible garante que o elemento está vísivel para o usuário, uma vez que
    // o elemento pode estar na DOM (na qual checamos com toBeInTheDocument) mas
    // pode não estar sendo exibido
    expect(inputEmail).toBeVisible();
    expect(inputPassword).toBeVisible();
    expect(buttonSubmit).toBeVisible();
  });

  it("sould show error message when submit form empty", async () => {
    const view = render(<Form submitForm={handleSubmitForm} />);
    const buttonSubmit = view.getByRole("button", { name: "send" });

    act(() => {
      fireEvent.click(buttonSubmit);
    });

    await waitFor(() => {
      expect(view.getByText("Informe um email válido")).toBeVisible();
      expect(
        view.getByText("A senha deve possuir pelo menos 8 caracteres")
      ).toBeVisible();
    });
  });

  it("sould show error message when email is invalid", async () => {
    const view = render(<Form submitForm={handleSubmitForm} />);

    const inputEmail = view.getByRole("textbox", { name: "email" });
    const buttonSubmit = view.getByRole("button", { name: "send" });

    act(() => {
      fireEvent.change(inputEmail, { target: { value: "email-invalid.com" } });
      buttonSubmit.click();
    });

    await waitFor(() => {
      expect(view.getByText("Informe um email válido")).toBeInTheDocument();
    });
  });

  it("sould show error message when password is smaller than eight", async () => {
    const view = render(<Form submitForm={handleSubmitForm} />);

    const inputPassword = view.getByRole("textbox", { name: "password" });
    const buttonSubmit = view.getByRole("button", { name: "send" });

    act(() => {
      fireEvent.change(inputPassword, { target: { value: "123456" } });
      buttonSubmit.click();
    });

    await waitFor(() => {
      expect(
        view.getByText("A senha deve possuir pelo menos 8 caracteres")
      ).toBeInTheDocument();
    });
  });

  it("sould submit when values is valid", async () => {
    const view = render(<Form submitForm={handleSubmitForm} />);

    const mockEmail = "email@teste.com";
    const mockPass = "12345678";

    const inputEmail = view.getByRole("textbox", {
      name: "email",
    }) as HTMLInputElement;
    const inputPassword = view.getByRole("textbox", {
      name: "password",
    }) as HTMLInputElement;
    const buttonSubmit = view.getByRole("button", { name: "send" });

    act(() => {
      fireEvent.change(inputPassword, { target: { value: mockPass } });
      fireEvent.change(inputEmail, { target: { value: mockEmail } });
      buttonSubmit.click();
    });

    await waitFor(() => {
      // mensagens de erro não devem aparecer
      expect(
        view.queryByText("Informe um email válido")
      ).not.toBeInTheDocument();
      expect(
        view.queryByText("A senha deve possuir pelo menos 8 caracteres")
      ).not.toBeInTheDocument();

      // os campos devem ser limpos após o submit
      expect(inputEmail.value).toBe("");
      expect(inputPassword.value).toBe("");

      // a função de submit deve ser chamada com os argumentos corretos
      expect(handleSubmitForm).toHaveBeenCalledTimes(1);
      expect(handleSubmitForm).toHaveBeenCalledWith({
        email: mockEmail,
        password: mockPass,
      });
    });
  });
});
