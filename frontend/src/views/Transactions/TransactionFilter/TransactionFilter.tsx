import { TextField } from "@mui/material";
import React from "react";
import styles from "./TransactionFilter.module.scss";
import cn from "classnames";
interface TransactionFilterProps {
  className?: string;
  searchByBeneficiary: string;
  onBeneficiarySearch: (searchValue: string) => void;
}

const TransactionFilter = ({
  className,
  searchByBeneficiary,
  onBeneficiarySearch,
}: TransactionFilterProps) => {
  return (
    <div className={cn(styles.container, className)}>
      <TextField
        id="filled-basic"
        label="Filter by beneficiary name"
        variant="filled"
        fullWidth
        value={searchByBeneficiary}
        onChange={(e) => onBeneficiarySearch(e.target.value)}
      />
    </div>
  );
};

export default TransactionFilter;
