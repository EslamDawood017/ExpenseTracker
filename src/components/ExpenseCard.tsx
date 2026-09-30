import { Button } from '@fluentui/react-components'
import type { Expense } from '../types/expense'

interface ExpenseCardProps {
    expense: Expense
    onDelete: (id: string) => void
}

export function ExpenseCard({ expense, onDelete }: ExpenseCardProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow transition-shadow">
            <div className="flex flex-col gap-1">
                <span className="font-semibold text-slate-800 text-lg">
                    {expense.title}
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                        {expense.category}
                    </span>
                    <span>•</span>
                    <span>{expense.date}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-slate-900">
                    ${expense.amount.toFixed(2)}
                </span>
                <Button
                    appearance="subtle"
                    size="small"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(expense.id)}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}
