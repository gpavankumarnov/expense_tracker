import { Card, CardContent, TextField, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import RadioButtonWrapper from "../common/Form-wrapper/RadioButtonWrapper";
import TextFieldWrapper from "../common/TextFieldWrapper";
import {
    defaultExpenseTrackerFormValues,
    ExpenceIncomeType,
} from "../model.ts/ExpenseTrackerCreation";

const Button = styled.button`
  background-color: #000000;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5rem;
  width: 100%;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;
const RadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin: auto;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
`;

const StyledCard = styled.li<{ isExpense: boolean }>`
  border: 1px solid black;
  border-right: 4px solid
    ${(props) => (props.isExpense ? red[500] : green[500])};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
`;

const TransactionListWrapper = styled.div``;

export interface IFormExpenseTracker {
  amount: number;
  description: string;
  type: string;
}

export type optionType = {
  value: string;
  label: string;
};

const ExpenseTracker = () => {
  const [values, setValues] = useState<{
    balance: number;
    income: number;
    expense: number;
  }>({
    balance: 10000,
    expense: 0,
    income: 0,
  });
  const [isAddBtn, setIsAddBtn] = useState<boolean>(true);
  const [transactionList, setTransactionList] = useState<IFormExpenseTracker[]>([]);
  const [filteredTransactionsList, setFilteredTransactionsList] = useState<IFormExpenseTracker[]>([]);

  const form = useForm<IFormExpenseTracker>({
    defaultValues: defaultExpenseTrackerFormValues,
    mode: "onChange",
  });

  const { handleSubmit, control } = form;
  const onFormSubmit = (formData: IFormExpenseTracker) => {
    const enumVal = getEnumVal(formData?.type);
    const amountVal = Number(formData.amount);
    if (enumVal) {
      const copiedFormData = { ...formData, type: enumVal, amount: amountVal };
      calculateBalanceLeft(copiedFormData);
    }
  };

  const getEnumVal = (enumKey: string): string | undefined => {
    if (!enumKey) return undefined;
    if (enumKey in ExpenceIncomeType) {
      return ExpenceIncomeType[enumKey as keyof typeof ExpenceIncomeType];
    }
    return undefined;
  };

  const calculateBalanceLeft = (copiedFormData: IFormExpenseTracker) => {
    getBalance(copiedFormData.type, copiedFormData);
    setTransactionList([...transactionList, copiedFormData]);
  };

  const getBalance = (type: string, data: IFormExpenseTracker) => {
    switch (type) {
      case ExpenceIncomeType.Expense: {
        const balanceLeft = values.balance - data.amount;
        const updatedExpense = values.expense + data.amount;
        setValues((prev) => ({
          ...prev,
          balance: balanceLeft,
          expense: updatedExpense,
        }));
        break;
      }
      case ExpenceIncomeType.Income: {
        const updatedIncome = values.income + data.amount;
        console.log("income", updatedIncome);

        const balanceLeft = values.balance + data.amount;
        setValues((prev) => ({
          ...prev,
          income: updatedIncome,
          balance: balanceLeft,
        }));
        break;
      }
    }
  };

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string | number = event.target.value;
    const copiedTransactionList = [...transactionList];
    if (!value) {
      return setTransactionList([...transactionList]);
    }
    const filteredList = copiedTransactionList.filter(
      (field) =>
        field.description === value ||
        field.amount === Number(value) ||
        field.type === value
    );
    setFilteredTransactionsList(filteredList);
  };

  const renderListOnCondition = filteredTransactionsList.length ? filteredTransactionsList : transactionList

  return (
    <Wrapper>
      <Typography variant="h4">Expense Tracker</Typography>
      <Container>
        <Typography variant="h5">Balance: ${values.balance}</Typography>
        <Button onClick={() => setIsAddBtn(!isAddBtn)}>
          {isAddBtn ? "CANCEL" : "ADD"}
        </Button>
      </Container>
      {isAddBtn && (
        <FormWrapper onSubmit={handleSubmit(onFormSubmit)}>
          <TextFieldWrapper
            name="amount"
            label="Amount"
            control={control}
            type="number"
            options={[]}
            fullWidth
          />
          <TextFieldWrapper
            name="description"
            label="Description"
            control={control}
            options={[]}
            fullWidth
          />
          <RadioContainer>
            <RadioButtonWrapper
              name="type"
              control={control}
              options={[
                { value: "Expense", label: "Expense" },
                { value: "Income", label: "Income" },
              ]}
            />
          </RadioContainer>
          <Button type="submit" onClick={handleSubmit(onFormSubmit)}>
            ADD Transaction
          </Button>
        </FormWrapper>
      )}
      <CardWrapper>
        <Card sx={{ width: "150px" }}>
          <CardContent>
            <Typography variant="h6">Expense</Typography>
            <Typography
              sx={{ color: red[500], fontWeight: "700" }}
              variant="h5"
            >
              ${values.expense}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "150px" }}>
          <CardContent>
            <Typography variant="h6">Income</Typography>
            <Typography
              sx={{ color: green[500], fontWeight: "700" }}
              variant="h5"
            >
              ${values.income}
            </Typography>
          </CardContent>
        </Card>
      </CardWrapper>
      <TransactionListWrapper>
        <Typography variant="h4" sx={{ color: "#000000", fontWeight: "600" }}>
          Transactions
        </Typography>
        <TextField
          placeholder="Search"
          onChange={handleOnSearch}
          sx={{
            backgroundColor: "lightgrey",
            borderRadius: "5px",
            width: "350px",
            height: "20%",
          }}
        />
        <ol
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "1rem",
            padding: 0,
          }}
        >
          {renderListOnCondition?.map((transaction: IFormExpenseTracker) => (
            <StyledCard
            key={transaction.description}
              isExpense={transaction.type === ExpenceIncomeType.Expense}
            >
              <span>{transaction?.description}</span>
              <span>${transaction?.amount}</span>
            </StyledCard>
          ))}
        </ol>
      </TransactionListWrapper>
    </Wrapper>
  );
};

export default ExpenseTracker;
