import React, { useEffect, useRef, useState } from "react";
import { Transaction } from "../types/transactions";
import * as TransactionService from "../API/TransactionService";
import { FETCH_TRANSACTIONS_ITEM_LIMIT } from "../constant/fetchTransactions";

const useTransaction = () => {
  const [error, setError] = useState<Error>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchByBeneficiary, setSearchByBeneficiary] = useState("");

  const scrollableRef = useRef();

  const handleBeneficiarySearch = async (searchValue: string) => {
    setSearchByBeneficiary(searchValue);

    try {
      const fetchedTransactionsByBeneficiary =
        await TransactionService.fetchByBeneficiary(searchValue);

      if (fetchedTransactionsByBeneficiary.length === 0) setHasMore(false);
      setTransactions(fetchedTransactionsByBeneficiary);
    } catch (err) {
      setError(err as Error);
    }
  };

  const handleAddTransaction = async (transaction: Transaction) => {
    try {
      await TransactionService.addTransaction(transaction);
      setTransactions([transaction, ...transactions]);
    } catch (err) {
      setError(err as Error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await TransactionService.deleteTransaction(id);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    // don't fetch any additional data when searched by beneficiary
    if (searchByBeneficiary !== "") return setHasMore(false);

    const asyncFn = async () => {
      try {
        const fetchedTransactions = await TransactionService.fetchTransactions({
          limit: FETCH_TRANSACTIONS_ITEM_LIMIT,
          page: page,
        });

        if (fetchedTransactions.length < FETCH_TRANSACTIONS_ITEM_LIMIT)
          setHasMore(false);

        setTransactions([...transactions, ...fetchedTransactions]);
      } catch (err) {
        setError(err as Error);
      }
    };

    asyncFn();
  }, [page]);

  return {
    scrollableRef,
    hasMore,
    transactions,
    searchByBeneficiary,
    error,
    setPage,
    handleAddTransaction,
    handleBeneficiarySearch,
    handleDelete,
  };
};

export default useTransaction;
