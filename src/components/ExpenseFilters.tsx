import { Input, Select } from '@fluentui/react-components'
import type { ExpenseCategory } from '../types/expense'

interface ExpenseFiltersProps {
    searchQuery: string
    onSearchChange: (query: string) => void
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

const CATEGORIES: ('All' | ExpenseCategory)[] = [
    'All',
    'Food',
    'Transport',
    'Shopping',
    'Bills',
    'Other',
]

export function ExpenseFilters({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
}: ExpenseFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1">
                <Input
                    className="w-full"
                    value={searchQuery}
                    onChange={(_, data) => onSearchChange(data.value)}
                    placeholder="Search by title..."
                />
            </div>

            {/* Category Dropdown */}
            <div className="w-full sm:w-44">
                <Select
                    className="w-full"
                    value={selectedCategory}
                    onChange={(_, data) => onCategoryChange(data.value)}
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat === 'All' ? 'All Categories' : cat}
                        </option>
                    ))}
                </Select>
            </div>
        </div>
    )
}
