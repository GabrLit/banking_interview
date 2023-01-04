import React, { useState } from "react";
import { Transaction } from "../../types/transactions";
import styles from "./TransactionItem.module.scss";
import cn from "classnames";

interface TransactionItemProps {
  item: Transaction;
  onDelete: (id: number) => void;
}

function TransactionItem({ item, onDelete }: TransactionItemProps) {
  const [fade, setFade] = useState(false);

  const colorClass = item.amount > 0 ? styles.amount_green : styles.amount_red;

  return (
    <div className={cn(styles.container, fade && styles.fade)}>
      <button
        className={styles.delete}
        onClick={() => {
          setFade(true);
          setTimeout(() => {
            onDelete(item.id);
          }, 1000);
        }}
      >
        Delete
      </button>
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
