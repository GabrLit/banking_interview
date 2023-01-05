import { fireEvent, render, waitFor } from "@testing-library/react";
import React, { useRef } from "react";
import { vi } from "vitest";
import { Transaction } from "../../../types/transactions";

import TransactionList from "./TransactionList";

const transactions: Transaction[] = [
  {
    id: 0,
    amount: -2008.75,
    beneficiary: "Callie Nieves",
    account: "PL10104092290785174000000000",
    address: "185 Berkeley Place, Brady, West Virginia, 7409",
    date: "2021-12-15T01:05:42",
    description: "Amet amet qui proident sint esse adipisicing amet.",
  },
  {
    id: 1,
    amount: -2038.61,
    beneficiary: "Amie Whitley",
    account: "PL10103486643679406000000000",
    address: "827 Dahl Court, Stagecoach, Louisiana, 3343",
    date: "2019-12-12T06:58:38",
    description: "Occaecat nulla Lorem id ullamco.",
  },
];

describe("TransactionList", () => {
  it("renders list with given data", async () => {
    const mockRef = React.createRef();
    const { findByText } = render(
      <TransactionList
        reference={mockRef}
        transactionsData={transactions}
        hasMore={true}
        loadMore={() => {}}
        onDelete={() => {}}
      />
    );

    const amount = await findByText(transactions[0].amount);
  });

  it("calls onDelete with correct id", async () => {
    const mockRef = React.createRef();
    const onDelete = vi.fn();
    const { findAllByRole } = render(
      <TransactionList
        reference={mockRef}
        transactionsData={transactions}
        hasMore={true}
        loadMore={() => {}}
        onDelete={onDelete}
      />
    );

    const deleteBtn = await findAllByRole("button");
    fireEvent.click(deleteBtn[0]);

    await waitFor(() => expect(onDelete).toHaveBeenCalledWith(0), {
      timeout: 1500,
    });
  });
});
