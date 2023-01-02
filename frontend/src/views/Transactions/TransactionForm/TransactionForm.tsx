import React from "react";

interface TransactionFormProps {
  className?: string;
}

const TransactionForm = ({ className }: TransactionFormProps) => {
  return <div className={className}>TransactionForm</div>;
};

export default TransactionForm;
