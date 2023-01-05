import cn from "classnames";
import { useFormik } from "formik";
import { useState } from "react";
import styles from "./TransactionForm.module.scss";
import * as Yup from "yup";
import { Transaction } from "../../../types/transactions";

interface TransactionFormProps {
  className?: string;
  onAdd: (transactionData: Transaction) => void;
}

const createValidationSchema = () =>
  Yup.object().shape({
    amount: Yup.number()
      .required("Required")
      .positive("Number must be positive"),
    account: Yup.number().required("Required"),
    address: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

const TransactionForm = ({ className, onAdd }: TransactionFormProps) => {
  const [successMsg, setSuccessMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      amount: "",
      account: "",
      address: "",
      description: "",
    },
    validateOnChange: false,
    validationSchema: createValidationSchema(),
    onSubmit: () => {
      setSuccessMsg("Form submitted with success");
      formik.resetForm();

      // id field should be added from backend, and there should be check if generated id doesn't already exist
      // I could check this on frontend side but since I don't always fetch complete data because of infinite scroll i can't
      // beneficiary field is missing from the task description

      const dataWithCorrectTypes: Omit<Transaction, "amount"> & {
        amount: number;
      } = {
        id: Math.floor(Math.random() * 100) + 100,
        beneficiary: "Test beneficiary",
        date: new Date().toISOString().split(".")[0],
        ...formik.values,
        amount: Number(formik.values.amount),
      };

      onAdd(dataWithCorrectTypes);
    },
  });

  return (
    <form
      className={cn(className, styles.formContainer)}
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          name="amount"
          placeholder="Amount"
          type={"number"}
          value={formik.values.amount}
          onChange={formik.handleChange}
        />
        {formik.errors.amount && (
          <p className={styles.errorField}>{formik.errors.amount}</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          name="account"
          placeholder="Account number"
          type={"number"}
          value={formik.values.account}
          onChange={formik.handleChange}
          onFocus={() => setSuccessMsg("")}
        />
        {formik.errors.account && (
          <p data-testid="account_error" className={styles.errorField}>
            {formik.errors.account}
          </p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          name="address"
          placeholder="Address"
          type={"string"}
          value={formik.values.address}
          onChange={formik.handleChange}
          onFocus={() => setSuccessMsg("")}
        />
        {formik.errors.address && (
          <p className={styles.errorField}>{formik.errors.address}</p>
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          name="description"
          placeholder="Description"
          type={"string"}
          value={formik.values.description}
          onChange={formik.handleChange}
          onFocus={() => setSuccessMsg("")}
        />
        {formik.errors.description && (
          <p className={styles.errorField}>{formik.errors.description}</p>
        )}
      </div>

      <div className={styles.infoField}>{successMsg}</div>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default TransactionForm;
