import type { Expense } from '../types/expense'

interface ExpenseSummaryProps {
    expenses: Expense[]
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
    // 1. Derived Data: Total count
    const totalCount = expenses.length

    // 2. Derived Data: Total amount spent calculated via reduce()
    const totalAmount = expenses.reduce(
        (accumulator, expense) => accumulator + expense.amount,
        0
    )

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Total Count Card */}
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total Expenses
                </span>
                <span className="text-2xl font-bold text-slate-900 mt-1">
                    {totalCount}
                </span>
            </div>

            {/* Total Spent Card */}
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total Spent
                </span>
                <span className="text-2xl font-bold text-emerald-600 mt-1">
                    ${totalAmount.toFixed(2)}
                </span>
            </div>
        </div>
    )
}
