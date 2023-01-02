import React from "react";

interface TransactionListProps {
  className?: string;
}

const TransactionList = ({ className }: TransactionListProps) => {
  return <div className={className}>TransactionList</div>;
};

export default TransactionList;
