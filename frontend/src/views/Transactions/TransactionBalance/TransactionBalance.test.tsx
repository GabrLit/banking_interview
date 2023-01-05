import { render } from "@testing-library/react";
import { Transaction } from "../../../types/transactions";
import TransactionBalance from "./TransactionBalance";

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

describe("TransactionBalance", () => {
  it("displays correct balance", async () => {
    const { findByText } = render(
      <TransactionBalance transactionData={transactions} />
    );

    await findByText(
      (transactions[0].amount + transactions[1].amount).toFixed(2)
    );
  });
});
