import TransactionBalance from "./TransactionBalance/TransactionBalance";
import TransactionFilter from "./TransactionFilter/TransactionFilter";
import TransactionForm from "./TransactionForm/TransactionForm";
import TransactionList from "./TransactionList/TransactionList";
import styles from "./Transactions.module.scss";
import * as TransactionService from "../../API/TransactionService";
import { useEffect, useRef, useState } from "react";
import { Transaction } from "../../types/transactions";
import { FETCH_TRANSACTIONS_ITEM_LIMIT } from "../../constant/fetchTransactions";
import { scrollToRef } from "../../utils/scrollToTop";

const Transactions = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchByBeneficiary, setSearchByBeneficiary] = useState("");

  const scrollableRef = useRef();

  const handleBeneficiarySearch = async (searchValue: string) => {
    setSearchByBeneficiary(searchValue);

    const fetchedTransactionsByBeneficiary =
      await TransactionService.fetchByBeneficiary(searchValue);

    if (fetchedTransactionsByBeneficiary.length === 0) setHasMore(false);
    setTransactions(fetchedTransactionsByBeneficiary);
  };

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
    TransactionService.addTransaction(transaction);
  };

  useEffect(() => {
    // don't fetch any additional data when searched by beneficiary
    if (searchByBeneficiary !== "") return setHasMore(false);

    const asyncFn = async () => {
      const fetchedTransactions = await TransactionService.fetchTransactions({
        limit: FETCH_TRANSACTIONS_ITEM_LIMIT,
        page: page,
      });

      if (fetchedTransactions.length < FETCH_TRANSACTIONS_ITEM_LIMIT)
        setHasMore(false);

      console.log(fetchedTransactions);

      setTransactions([...transactions, ...fetchedTransactions]);
    };

    asyncFn();
  }, [page]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.grid}>
        <TransactionForm
          className={styles.transactionForm}
          onAdd={handleAddTransaction}
        />
        <TransactionBalance
          className={styles.transactionBalance}
          transactionData={transactions}
        />
        <TransactionFilter
          className={styles.transactionFilter}
          searchByBeneficiary={searchByBeneficiary}
          scrollToTop={() => scrollToRef(scrollableRef)}
          onBeneficiarySearch={handleBeneficiarySearch}
        />
        <TransactionList
          reference={scrollableRef}
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
