import React from "react";
import { Transaction } from "../../types/transactions";
import styles from "./TransactionItem.module.scss";
import cn from "classnames";

interface TransactionItemProps {
  item: Transaction;
}

function TransactionItem({ item }: TransactionItemProps) {
  if (!item) return <></>;

  const colorClass = item.amount > 0 ? styles.amount_green : styles.amount_red;

  return (
    <div className={styles.container}>
      <div className={cn([styles.amount, colorClass])}>{item.amount}</div>
      <div>{item.beneficiary}</div>
      <div>{item.account}</div>
      <div>{item.address}</div>
      <div>{item.date}</div>
      <div>{item.description}</div>
    </div>
  );
}

export default TransactionItem;
