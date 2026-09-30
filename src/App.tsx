import { useState, useEffect } from 'react'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import type { Expense } from './types/expense'
import { ExpenseList } from './components/ExpenseList'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseSummary } from './components/ExpenseSummary'
import { ExpenseFilters } from './components/ExpenseFilters'

const STORAGE_KEY = 'expense_tracker_data'

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
  // 1. Lazy state initialization: loads from localStorage on initial render
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved) as Expense[]
      } catch (e) {
        console.error('Failed to parse stored expenses:', e)
        return INITIAL_EXPENSES
      }
    }
    return INITIAL_EXPENSES
  })

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // 2. Side Effect: Automatically saves expenses to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  const handleAddExpense = (newExpenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...newExpenseData,
      id: crypto.randomUUID(),
    }
    setExpenses((prev) => [newExpense, ...prev])
  }

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    )
    setEditingExpense(null)
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
    if (editingExpense?.id === id) {
      setEditingExpense(null)
    }
  }

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim())
    const matchesCategory =
      selectedCategory === 'All' || expense.category === selectedCategory

    return matchesSearch && matchesCategory
  })

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

          <ExpenseSummary expenses={expenses} />

          <ExpenseForm
            key={editingExpense ? editingExpense.id : 'create'}
            onAddExpense={handleAddExpense}
            editingExpense={editingExpense}
            onUpdateExpense={handleUpdateExpense}
            onCancelEdit={() => setEditingExpense(null)}
          />

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Expenses
              </h2>
              {(searchQuery || selectedCategory !== 'All') && (
                <span className="text-xs text-slate-500">
                  Showing {filteredExpenses.length} of {expenses.length}
                </span>
              )}
            </div>

            <ExpenseFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <ExpenseList
              expenses={filteredExpenses}
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
