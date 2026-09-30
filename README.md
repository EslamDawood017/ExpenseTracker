# Expense Tracker (React + TypeScript)

A clean, modern, and responsive **Expense Tracker** frontend application built with **React 19**, **TypeScript**, **Tailwind CSS**, and Microsoft's **Fluent UI**.

This project was built incrementally as an educational, pair-programming project designed to master fundamental React concepts (props, state, controlled forms, immutable updates, derived state, and side effects) coming from an Angular and .NET background.

---

## 🚀 Live Demo & Preview

- **Add, Edit, and Delete Expenses** with real-time UI updates
- **Live Search & Category Filtering** using pure derived state
- **Aggregate Summary Dashboard** (total count & total spent)
- **Local Persistence** via browser `localStorage`
- **Responsive Layout** optimized for mobile, tablet, and desktop

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Core UI library (Functional Components & Hooks) |
| **TypeScript** | Static typing and interface contracts |
| **Vite** | Next-generation build tool and dev server |
| **Fluent UI v9** | Accessible UI components (`Button`, `Input`, `Select`, `Field`, `FluentProvider`) |
| **Tailwind CSS v4** | Layout, flexbox, grid, spacing, and responsive utilities |
| **Custom CSS** | Subtle design accents (top gradient bars, text gradient, smooth lift) |
| **LocalStorage** | Client-side persistence without external backend or database dependencies |

---

## 🧠 Key React Concepts Demonstrated

### 1. State Management & Hooks
- **`useState`**: Managing local component state for controlled inputs, editing mode, search queries, and selected category filters.
- **`useEffect`**: Handling browser side effects to synchronize the expenses state into `localStorage`.
- **Lazy State Initialization (`useState(() => ...)`)**: Reading from `localStorage` once on initial mount without causing duplicate re-renders.

### 2. Component Communication
- **Props (`Parent → Child`)**: Passing read-only typed data down the component hierarchy (similar to Angular `@Input()`).
- **Callback Props (`Child → Parent`)**: Passing functions (`onAddExpense`, `onUpdateExpense`, `onDeleteExpense`, `onEditExpense`) to handle user events (similar to Angular `@Output()`).

### 3. Data Immutability
- **Adding Items**: Prepending items with the spread operator: `[newExpense, ...prev]`.
- **Deleting Items**: Filtering items with `prev.filter(e => e.id !== id)`.
- **Updating Items**: Mapping items with `prev.map(e => e.id === updated.id ? updated : e)`.

### 4. Derived State (Avoiding Redundant State)
- Rather than storing duplicate state (e.g. `filteredExpenses` or `totalAmount`), values are derived on-the-fly during render:
  - **Summary Calculations**: Computed using `expenses.reduce(...)`.
  - **Filtered List**: Computed using `expenses.filter(...)` combining search query and category.

### 5. Component Lifecycle & Key-Based Resets
- Reusing `ExpenseForm` for both **Create** and **Edit** modes by applying `key={editingExpense ? editingExpense.id : 'create'}` to cleanly remount and re-initialize form state.

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── ExpenseCard.tsx      # Individual expense display with category pill & actions
│   ├── ExpenseFilters.tsx   # Search input and category dropdown filter controls
│   ├── ExpenseForm.tsx      # Controlled form for adding and editing expenses
│   ├── ExpenseList.tsx      # List container with conditional empty state
│   └── ExpenseSummary.tsx   # Top dashboard cards calculating totals via reduce()
│
├── types/
│   └── expense.ts           # TypeScript interfaces (Expense, ExpenseCategory)
│
├── App.tsx                  # Root state container, CRUD handlers, derived filtering
├── App.css                  # Custom styling accents and micro-animations
├── index.css                # Tailwind CSS core directives and body resets
└── main.tsx                 # Application entry point with FluentProvider
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/EslamDawood017/ExpenseTracker.git

# Navigate into the project folder
cd ExpenseTracker

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will be running locally at:
`http://localhost:5173`

### Production Build
```bash
# Type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
