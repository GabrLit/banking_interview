import { BASEURL } from "../constant/fetchTransactions";
import { QueryParams, Transaction } from "../types/transactions";

export const fetchTransactions = async ({
  limit,
  page,
}: QueryParams): Promise<Transaction[]> => {
  try {
    const response = await fetch(
      BASEURL + `/transactions?_page=${page}&_limit=${limit}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Error fetching transactions");
  }
};

export const fetchByBeneficiary = async (beneficiary: string) => {
  try {
    const response = await fetch(
      BASEURL + `/transactions?beneficiary_like=${beneficiary}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Error fetching by beneficiary field");
  }
};

export const addTransaction = async (transaction: Transaction) => {
  try {
    await fetch(BASEURL + `/transactions`, {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    throw new Error("Error adding new transaction");
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    await fetch(BASEURL + `/transactions/` + id, {
      method: "DELETE",
    });
  } catch (err) {
    throw new Error("Error deleting transaction");
  }
};
