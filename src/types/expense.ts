export type ExpenseCategory = 'Food' | 'Transport' | 'Shopping' | 'Bills' | 'Other'


export interface Expense {
    id: string
    title: string
    amount: number
    category: ExpenseCategory
    date: string
}