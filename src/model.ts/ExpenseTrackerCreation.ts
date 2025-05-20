import { type IFormExpenseTracker } from "../components/ExpenseTracker";


export const ExpenceIncomeType ={
  Income: "INCOME",
  Expense: "EXPENSE",
  }

  export type ExpenceIncomeType = (typeof ExpenceIncomeType)[keyof typeof ExpenceIncomeType];

export const defaultExpenseTrackerFormValues:IFormExpenseTracker = {
    amount : 0,
    description: 'store',
    type: 'Expense'
}