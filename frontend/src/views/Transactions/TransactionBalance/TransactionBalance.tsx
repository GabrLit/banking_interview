import React from "react";
import { Transaction } from "../../../types/transactions";

interface TransactionBalanceProps {
  className?: string;
  transactionData: Transaction[];
}

const TransactionBalance = ({
  className,
  transactionData,
}: TransactionBalanceProps) => {
  const totalBalanceOfCurrentlyFetched = transactionData.reduce(
    (accumulator, { amount }) => {
      return accumulator + amount;
    },
    0
  );

  return (
    //Transaction balance would have to be calculated on specific endpoint,
    //since the list is infinite scrolled and does not always contain complete
    //data.

    <div className={className}>{totalBalanceOfCurrentlyFetched.toFixed(2)}</div>
  );
};

export default TransactionBalance;
