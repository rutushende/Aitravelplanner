import { useState } from 'react';
import { DollarSign, Plus, Trash2, X } from 'lucide-react';

interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export function ExpenseTracker({ tripBudget }: { tripBudget: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '', category: 'food' });

  const handleAddExpense = () => {
    if (!newExpense.name || !newExpense.amount) return;

    const expense: Expense = {
      id: Date.now().toString(),
      name: newExpense.name,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: new Date().toLocaleDateString(),
    };

    setExpenses((prev) => [...prev, expense]);
    setNewExpense({ name: '', amount: '', category: 'food' });
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = tripBudget - totalSpent;
  const percentageSpent = (totalSpent / tripBudget) * 100;

  return (
    <>
      {/* Expense Tracker Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition flex items-center gap-2 z-50"
      >
        <DollarSign className="w-5 h-5" />
        <span className="font-semibold">Track Expenses</span>
      </button>

      {/* Expense Tracker Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-green-600 text-white p-6 rounded-t-xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Expense Tracker</h2>
                <p className="text-sm opacity-90">Track your spending during the trip</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-2 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Budget Overview */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900">₹{tripBudget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Spent</p>
                    <p className="text-2xl font-bold text-red-600">₹{totalSpent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Remaining</p>
                    <p className="text-2xl font-bold text-green-600">₹{remainingBudget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      percentageSpent > 90 ? 'bg-red-500' : percentageSpent > 70 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(percentageSpent, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{percentageSpent.toFixed(1)}% of budget used</p>
              </div>

              {/* Add Expense Form */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Expense
                </h3>
                <div className="grid md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Description"
                    value={newExpense.name}
                    onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="activities">Activities</option>
                    <option value="shopping">Shopping</option>
                    <option value="other">Other</option>
                  </select>
                  <button
                    onClick={handleAddExpense}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Expenses List */}
              <div>
                <h3 className="font-semibold mb-3">Expense History</h3>
                {expenses.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No expenses recorded yet</p>
                ) : (
                  <div className="space-y-2">
                    {expenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                      >
                        <div className="flex-1">
                          <p className="font-semibold">{expense.name}</p>
                          <p className="text-sm text-gray-600">
                            {expense.category} • {expense.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg">₹{expense.amount.toLocaleString()}</span>
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
