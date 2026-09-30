import type { Expense } from '../types/expense'
import { ExpenseCard } from './ExpenseCard'

interface ExpenseListProps {
    expenses: Expense[]
    onEditExpense: (expense: Expense) => void
    onDeleteExpense: (id: string) => void
}

export function ExpenseList({
    expenses,
    onEditExpense,
    onDeleteExpense,
}: ExpenseListProps) {
    if (expenses.length === 0) {
        return (
            <div className="text-center py-8 text-slate-500 bg-white rounded-lg border border-slate-200">
                No expenses found.
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {expenses.map((expense) => (
                <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onEdit={onEditExpense}
                    onDelete={onDeleteExpense}
                />
            ))}
        </div>
    )
}
