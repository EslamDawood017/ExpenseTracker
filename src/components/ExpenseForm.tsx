import { useState, type FormEvent } from 'react'
import { Button, Input, Select, Field } from '@fluentui/react-components'
import type { Expense, ExpenseCategory } from '../types/expense'

interface ExpenseFormProps {
    onAddExpense: (expense: Omit<Expense, 'id'>) => void
    editingExpense: Expense | null
    onUpdateExpense: (expense: Expense) => void
    onCancelEdit: () => void
}

const CATEGORIES: ExpenseCategory[] = ['Food', 'Transport', 'Shopping', 'Bills', 'Other']

export function ExpenseForm({
    onAddExpense,
    editingExpense,
    onUpdateExpense,
    onCancelEdit,
}: ExpenseFormProps) {
    // Pre-fill fields if we are editing, otherwise use defaults
    const [title, setTitle] = useState(editingExpense ? editingExpense.title : '')
    const [amount, setAmount] = useState(editingExpense ? editingExpense.amount.toString() : '')
    const [category, setCategory] = useState<ExpenseCategory>(
        editingExpense ? editingExpense.category : 'Food'
    )
    const [date, setDate] = useState(
        editingExpense ? editingExpense.date : new Date().toISOString().split('T')[0]
    )

    const [error, setError] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

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

        if (editingExpense) {
            // Edit mode: update existing expense preserving its id
            onUpdateExpense({
                id: editingExpense.id,
                title: title.trim(),
                amount: parsedAmount,
                category,
                date,
            })
        } else {
            // Add mode: create new expense
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
        }

        setError('')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-sm flex flex-col gap-4"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">
                    {editingExpense ? 'Edit Expense' : 'Add New Expense'}
                </h2>
                {editingExpense && (
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Editing Mode
                    </span>
                )}
            </div>

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

            <div className="flex justify-end gap-2 pt-2">
                {editingExpense && (
                    <Button appearance="secondary" type="button" onClick={onCancelEdit}>
                        Cancel
                    </Button>
                )}
                <Button appearance="primary" type="submit">
                    {editingExpense ? 'Update Expense' : 'Add Expense'}
                </Button>
            </div>
        </form>
    )
}
