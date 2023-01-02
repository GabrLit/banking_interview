import React, { useRef } from "react";
import TransactionItem from "../../../components/TransactionItem/TransactionItem";
import { Transaction } from "../../../types/transactions";
import styles from "./TransactionList.module.scss";
import cn from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";

interface TransactionListProps {
  className?: string;
  transactionsData: Transaction[];
  hasMore: boolean;
  loadMore: () => void;
}

const TransactionList = ({
  className,
  transactionsData,
  hasMore,
  loadMore,
}: TransactionListProps) => {
  return (
    <section id="scrollableDiv" className={cn(styles.section, className)}>
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
          <TransactionItem key={transaction.id} item={transaction} />
        ))}
      </InfiniteScroll>
    </section>
  );
};

export default TransactionList;
