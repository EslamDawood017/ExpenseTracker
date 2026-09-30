import type { Expense } from '../types/expense'

interface ExpenseSummaryProps {
    expenses: Expense[]
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
    const totalCount = expenses.length
    const totalAmount = expenses.reduce(
        (accumulator, expense) => accumulator + expense.amount,
        0
    )

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Total Count Card */}
            <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Total Expenses
                </span>
                <span className="text-3xl font-extrabold text-slate-800 mt-2">
                    {totalCount}
                </span>
            </div>

            {/* Total Spent Card */}
            <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Total Spent
                </span>
                <span className="text-3xl font-extrabold text-emerald-600 mt-2">
                    ${totalAmount.toFixed(2)}
                </span>
            </div>
        </div>
    )
}
