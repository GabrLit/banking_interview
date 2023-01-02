import React from "react";

interface TransactionFilterProps {
  className?: string;
}

const TransactionFilter = ({ className }: TransactionFilterProps) => {
  return <div className={className}>TransactionFilter</div>;
};

export default TransactionFilter;
