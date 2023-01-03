import { BASEURL } from "../constant/fetchTransactions";
import { QueryParams, Transaction } from "../types/transactions";

export const fetchTransactions = async ({
  limit,
  page,
}: QueryParams): Promise<Transaction[]> => {
  let returnValue: Transaction[] = [];

  try {
    const response = await fetch(
      BASEURL + `/transactions?_page=${page}&_limit=${limit}`
    );
    const data = await response.json();
    returnValue = data;
  } catch (err) {
    console.error(err);
  }

  return returnValue;
};

export const fetchByBeneficiary = async (beneficiary: string) => {
  let returnValue: Transaction[] = [];

  try {
    const response = await fetch(
      BASEURL + `/transactions?beneficiary_like=${beneficiary}`
    );
    const data = await response.json();
    returnValue = data;
  } catch (err) {
    console.error(err);
  }

  return returnValue;
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
    console.error(err);
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    await fetch(BASEURL + `/transactions/` + id, {
      method: "DELETE",
    });
  } catch (err) {
    console.error(err);
  }
};
