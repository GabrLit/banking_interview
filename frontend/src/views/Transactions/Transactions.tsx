import TransactionBalance from "./TransactionBalance/TransactionBalance";
import TransactionFilter from "./TransactionFilter/TransactionFilter";
import TransactionForm from "./TransactionForm/TransactionForm";
import TransactionList from "./TransactionList/TransactionList";
import styles from "./Transactions.module.scss";
import { scrollToRef } from "../../utils/scrollToTop";
import useTransaction from "../../hooks/useTransaction";

const Transactions = () => {
  const {
    error,
    scrollableRef,
    hasMore,
    transactions,
    searchByBeneficiary,
    setPage,
    handleAddTransaction,
    handleBeneficiarySearch,
    handleDelete,
  } = useTransaction();

  return (
    <>
      {error && <div className={styles.errorBar}>{error.message}</div>}
      <main className={styles.wrapper}>
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
              setPage((prev: number) => prev + 1);
            }}
            className={styles.transactionList}
            transactionsData={transactions}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </>
  );
};

export default Transactions;
