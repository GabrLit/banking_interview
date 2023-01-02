import React from "react";

interface TransactionBalanceProps {
  className?: string;
}

const TransactionBalance = ({ className }: TransactionBalanceProps) => {
  return <div className={className}>TransactionBalance</div>;
};

export default TransactionBalance;
