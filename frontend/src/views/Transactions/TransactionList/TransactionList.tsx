import React, { useRef } from "react";
import TransactionItem from "../../../components/TransactionItem/TransactionItem";
import { Transaction } from "../../../types/transactions";
import styles from "./TransactionList.module.scss";
import cn from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";

interface TransactionListProps {
  className?: string;
  reference: any;
  transactionsData: Transaction[];
  hasMore: boolean;
  loadMore: () => void;
  onDelete: (id: number) => void;
}

const TransactionList = ({
  reference,
  className,
  transactionsData,
  hasMore,
  loadMore,
  onDelete,
}: TransactionListProps) => {
  return (
    <section
      id="scrollableDiv"
      ref={reference}
      className={cn(styles.section, className)}
    >
      <InfiniteScroll
        className={cn([styles.container])}
        dataLength={transactionsData.length}
        next={loadMore}
        hasMore={hasMore}
        scrollThreshold={0.8}
        scrollableTarget={"scrollableDiv"}
        loader={
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        }
      >
        {transactionsData.map((transaction: Transaction) => (
          <TransactionItem
            key={transaction.id}
            item={transaction}
            onDelete={onDelete}
          />
        ))}
      </InfiniteScroll>
    </section>
  );
};

export default TransactionList;
