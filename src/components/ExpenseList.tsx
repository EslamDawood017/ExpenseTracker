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
            <div className="text-center py-12 px-4 bg-white rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-xl font-semibold mb-3">
                    $
                </div>
                <p className="text-sm font-semibold text-slate-700">No expenses found</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Try adjusting your search query or category filter, or add an expense using the form above.
                </p>
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
