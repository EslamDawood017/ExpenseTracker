import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import type { Expense } from './types/expense'
import { ExpenseList } from './components/ExpenseList'

// Sample temporary data to test our components
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

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">
              Recent Expenses
            </h2>
            <ExpenseList expenses={INITIAL_EXPENSES} />
          </section>
        </main>
      </div>
    </FluentProvider>
  )
}

export default App
