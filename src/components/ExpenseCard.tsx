import { Button } from '@fluentui/react-components'
import type { Expense, ExpenseCategory } from '../types/expense'

interface ExpenseCardProps {
    expense: Expense
    onEdit: (expense: Expense) => void
    onDelete: (id: string) => void
}

// Category badge styles for clear visual differentiation
const CATEGORY_STYLES: Record<ExpenseCategory, string> = {
    Food: 'bg-amber-50 text-amber-700 border-amber-200',
    Transport: 'bg-blue-50 text-blue-700 border-blue-200',
    Shopping: 'bg-purple-50 text-purple-700 border-purple-200',
    Bills: 'bg-rose-50 text-rose-700 border-rose-200',
    Other: 'bg-slate-100 text-slate-700 border-slate-200',
}

export function ExpenseCard({ expense, onEdit, onDelete }: ExpenseCardProps) {
    const categoryStyle = CATEGORY_STYLES[expense.category] ?? CATEGORY_STYLES.Other

    return (
        <div className="custom-card flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all duration-150 gap-3">
            {/* Title & metadata */}
            <div className="flex flex-col gap-1.5">
                <span className="font-semibold text-slate-800 text-base sm:text-lg tracking-tight">
                    {expense.title}
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span
                        className={`px-2.5 py-0.5 rounded-full font-medium border text-[11px] ${categoryStyle}`}
                    >
                        {expense.category}
                    </span>
                    <span className="text-slate-300">•</span>
                    <time dateTime={expense.date} className="font-medium text-slate-400">
                        {expense.date}
                    </time>
                </div>
            </div>

            {/* Amount & Actions */}
            <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                <span className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    ${expense.amount.toFixed(2)}
                </span>
                <div className="flex items-center gap-1.5">
                    <Button
                        appearance="subtle"
                        size="small"
                        className="hover:bg-slate-100 font-medium"
                        onClick={() => onEdit(expense)}
                    >
                        Edit
                    </Button>
                    <Button
                        appearance="subtle"
                        size="small"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
                        onClick={() => onDelete(expense.id)}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}
