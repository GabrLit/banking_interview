import TransactionBalance from "./TransactionBalance/TransactionBalance";
import TransactionFilter from "./TransactionFilter/TransactionFilter";
import TransactionForm from "./TransactionForm/TransactionForm";
import TransactionList from "./TransactionList/TransactionList";
import styles from "./Transactions.module.scss";
import * as TransactionService from "../../API/TransactionService";
import { useEffect, useState } from "react";
import { Transaction } from "../../types/transactions";
import { FETCH_TRANSACTIONS_ITEM_LIMIT } from "../../constant/fetchTransactions";

const Transactions = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const asyncFn = async () => {
      const fetchedTransactions = await TransactionService.fetchTransactions({
        limit: FETCH_TRANSACTIONS_ITEM_LIMIT,
        page: page,
      });

      if (fetchedTransactions.length === 0) setHasMore(false);
      setTransactions([...transactions, ...fetchedTransactions]);
    };

    asyncFn();
  }, [page]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.grid}>
        <TransactionForm className={styles.transactionForm} />
        <TransactionBalance className={styles.transactionBalance} />
        <TransactionFilter className={styles.transactionFilter} />
        <TransactionList
          hasMore={hasMore}
          loadMore={() => {
            setPage((prev) => prev + 1);
          }}
          className={styles.transactionList}
          transactionsData={transactions}
        />
      </section>
    </div>
  );
};

export default Transactions;
