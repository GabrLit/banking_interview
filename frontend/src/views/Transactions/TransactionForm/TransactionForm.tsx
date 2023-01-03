import { TextField } from "@mui/material";
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

const TransactionForm = ({ className, onAdd }: TransactionFormProps) => {
  const [successMsg, setSuccessMsg] = useState("");

  const createValidationSchema = () =>
    Yup.object().shape({
      amount: Yup.number()
        .required("Required")
        .positive("Number must be positive"),
      account: Yup.number().required("Required"),
      address: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    });

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

      // id should be added from backend, and there should be check if generated id doesn't already exist
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
      <TextField
        id="filled-basic"
        label="Amount"
        variant="filled"
        size="small"
        fullWidth
        name="amount"
        type={"number"}
        value={formik.values.amount}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.amount)}
        helperText={formik.errors.amount}
        onFocus={() => setSuccessMsg("")}
      />

      <TextField
        id="filled-basic"
        label="Account number"
        variant="filled"
        size="small"
        fullWidth
        name="account"
        type={"number"}
        value={formik.values.account}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.account)}
        helperText={formik.errors.account}
        onFocus={() => setSuccessMsg("")}
      />

      <TextField
        id="filled-basic"
        label="Address"
        variant="filled"
        size="small"
        name={"address"}
        fullWidth
        value={formik.values.address}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.address)}
        helperText={formik.errors.address}
        onFocus={() => setSuccessMsg("")}
      />

      <TextField
        id="filled-basic"
        label="Description"
        variant="filled"
        size="small"
        name={"description"}
        fullWidth
        value={formik.values.description}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.description)}
        helperText={formik.errors.description}
        onFocus={() => setSuccessMsg("")}
      />

      <div className={styles.infoField}>{successMsg}</div>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default TransactionForm;
