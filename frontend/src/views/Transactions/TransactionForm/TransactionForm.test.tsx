import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import TransactionForm from "./TransactionForm";

interface InputObject {
  amount: number;
  account: number;
  address: string;
  description: string;
}

const inputObject = {
  amount: 250,
  account: 12345,
  address: "Address",
  description: "Description",
};

const inputAndSubmit = (mockedAdd: () => void, inputObject: InputObject) => {
  const { getByPlaceholderText, getByRole } = render(
    <TransactionForm onAdd={mockedAdd} />
  );

  const amount = getByPlaceholderText("Amount");
  const account = getByPlaceholderText("Account number");
  const address = getByPlaceholderText("Address");
  const description = getByPlaceholderText("Description");

  const submitBtn = getByRole("button");

  fireEvent.change(amount, { target: { value: inputObject.amount } });
  fireEvent.change(account, { target: { value: inputObject.account } });
  fireEvent.change(address, { target: { value: inputObject.address } });
  fireEvent.change(description, { target: { value: inputObject.description } });
  fireEvent.click(submitBtn);
};

describe("TransactionForm", async () => {
  test("if amount field throws an error when amount is negative", async () => {
    const { getByPlaceholderText, getByRole } = render(
      <TransactionForm onAdd={() => {}} />
    );

    const amountInput = getByPlaceholderText("Amount");
    const submitBtn = getByRole("button");

    fireEvent.change(amountInput, { target: { value: "-250" } });
    fireEvent.click(submitBtn);

    await screen.findByText("Number must be positive");
  });

  test("if account number field throws an error when is empty", async () => {
    const { getByPlaceholderText, findByTestId, getByRole } = render(
      <TransactionForm onAdd={() => {}} />
    );

    const accountInput = getByPlaceholderText("Account number");
    const submitBtn = getByRole("button");

    fireEvent.change(accountInput, { target: { value: "" } });
    fireEvent.click(submitBtn);

    const accountError = await findByTestId("account_error");
    expect(accountError).toHaveTextContent("Required");
  });

  it("displays success message when successfully submitted", async () => {
    const mockedAdd = vi.fn();

    inputAndSubmit(mockedAdd, inputObject);
    await screen.findByText("Form submitted with success");
  });

  it("calls onAdd function with correct data when successfully submitted", async () => {
    const mockedAdd = vi.fn();

    inputAndSubmit(mockedAdd, inputObject);

    await waitFor(() =>
      expect(mockedAdd).toHaveBeenCalledWith({
        account: inputObject.account,
        address: inputObject.address,
        amount: inputObject.amount,
        description: inputObject.description,
        id: expect.any(Number),
        beneficiary: expect.any(String),
        date: expect.any(String),
      })
    );
  });
});
