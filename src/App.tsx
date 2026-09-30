import { useState } from 'react'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import type { Expense } from './types/expense'
import { ExpenseList } from './components/ExpenseList'
import { ExpenseForm } from './components/ExpenseForm'

const INITIAL_EXPENSES: Expense[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 45.5,
    category: 'Food',
    date: '2025-05-10',
  },
  {
    id: '2',
    title: 'Bus Pass',
    amount: 20.0,
    category: 'Transport',
    date: '2025-05-11',
  },
  {
    id: '3',
    title: 'Internet Bill',
    amount: 60.0,
    category: 'Bills',
    date: '2025-05-12',
  },
]

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES)

  // 1. State to track which expense is being edited (null = add mode)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)

  const handleAddExpense = (newExpenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...newExpenseData,
      id: crypto.randomUUID(),
    }
    setExpenses((prev) => [newExpense, ...prev])
  }

  // 2. Immutable update handler using .map()
  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    )
    setEditingExpense(null) // Return to add mode after updating
  }

  // 3. Delete handler (also cancels edit if the deleted item was currently being edited)
  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
    if (editingExpense?.id === id) {
      setEditingExpense(null)
    }
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="min-h-screen bg-slate-100 py-10 px-4">
        <main className="max-w-xl mx-auto flex flex-col gap-6">
          <header className="text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Expense Tracker
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track and manage your daily expenses
            </p>
          </header>

          {/* Form handling both Add and Edit via key */}
          <ExpenseForm
            key={editingExpense ? editingExpense.id : 'create'}
            onAddExpense={handleAddExpense}
            editingExpense={editingExpense}
            onUpdateExpense={handleUpdateExpense}
            onCancelEdit={() => setEditingExpense(null)}
          />

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              Recent Expenses
            </h2>
            <ExpenseList
              expenses={expenses}
              onEditExpense={setEditingExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          </section>
        </main>
      </div>
    </FluentProvider>
  )
}

export default App
