import { useState, type FormEvent } from 'react'
import { Button, Input, Select, Field } from '@fluentui/react-components'
import type { Expense, ExpenseCategory } from '../types/expense'

interface ExpenseFormProps {
    onAddExpense: (expense: Omit<Expense, 'id'>) => void
}

const CATEGORIES: ExpenseCategory[] = ['Food', 'Transport', 'Shopping', 'Bills', 'Other']

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
    // 1. Controlled State for form fields
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState<ExpenseCategory>('Food')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])

    // Simple validation error message state
    const [error, setError] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        // Basic validation
        if (!title.trim()) {
            setError('Please enter a title.')
            return
        }

        const parsedAmount = parseFloat(amount)
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError('Please enter a valid amount greater than 0.')
            return
        }

        if (!date) {
            setError('Please select a date.')
            return
        }

        // Call parent callback with form data
        onAddExpense({
            title: title.trim(),
            amount: parsedAmount,
            category,
            date,
        })

        // Reset form fields
        setTitle('')
        setAmount('')
        setCategory('Food')
        setDate(new Date().toISOString().split('T')[0])
        setError('')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col gap-4"
        >
            <h2 className="text-lg font-semibold text-slate-800">Add New Expense</h2>

            {error && (
                <div className="p-2.5 text-xs text-red-700 bg-red-50 border border-red-200 rounded">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title">
                    <Input
                        value={title}
                        onChange={(_, data) => setTitle(data.value)}
                        placeholder="e.g. Lunch with team"
                    />
                </Field>

                <Field label="Amount ($)">
                    <Input
                        type="number"
                        value={amount}
                        onChange={(_, data) => setAmount(data.value)}
                        placeholder="0.00"
                    />
                </Field>

                <Field label="Category">
                    <Select
                        value={category}
                        onChange={(_, data) => setCategory(data.value as ExpenseCategory)}
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </Select>
                </Field>

                <Field label="Date">
                    <Input
                        type="date"
                        value={date}
                        onChange={(_, data) => setDate(data.value)}
                    />
                </Field>
            </div>

            <div className="flex justify-end pt-2">
                <Button appearance="primary" type="submit">
                    Add Expense
                </Button>
            </div>
        </form>
    )
}
