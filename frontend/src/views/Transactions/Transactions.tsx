import TransactionBalance from "./TransactionBalance/TransactionBalance";
import TransactionFilter from "./TransactionFilter/TransactionFilter";
import TransactionForm from "./TransactionForm/TransactionForm";
import TransactionList from "./TransactionList/TransactionList";
import styles from "./Transactions.module.scss";

const Transactions = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.grid}>
        <TransactionForm className={styles.transactionForm} />
        <TransactionBalance className={styles.transactionBalance} />
        <TransactionFilter className={styles.transactionFilter} />
        <TransactionList className={styles.transactionList} />
      </section>
    </div>
  );
};

export default Transactions;
