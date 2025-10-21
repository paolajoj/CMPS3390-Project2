import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Add() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("Expense");
  const [editingId, setEditingId] = useState(null);

  // Load transactions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) setTransactions(JSON.parse(stored));
  }, []);

  // Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const amountChange = (e) => setAmount(e.target.value);
  const nameChange = (e) => setName(e.target.value);
  const typeChange = (e) => setType(e.target.value);

  const addOrUpdateTransaction = () => {
    if (!name) return alert("You need to type a description");
    if (!amount) return alert("You need to type an amount");

    if (editingId) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingId ? { ...t, name, amount, type } : t
        )
      );
      setEditingId(null);
    } else {
      const newTransaction = {
        id: Date.now(),
        name,
        amount,
        type,
      };
      setTransactions([...transactions, newTransaction]);
    }

    setName("");
    setAmount("");
    setType("Expense");
  };

  const editTransaction = (t) => {
    setName(t.name);
    setAmount(t.amount);
    setType(t.type);
    setEditingId(t.id);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const isPositiveType = (t) => ["Income", "Investment", "Savings"].includes(t.type);

  const total = transactions.reduce((acc, t) => {
    return isPositiveType(t) ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount);
  }, 0);

  return (
    <div className="home">
      <h1 className="title">Finance Tracker</h1>

      <div className="links">
        <Link to="/" className="link">Home</Link>
      </div>

      {/* Total Balance */}
      <div style={{ marginTop: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>
        Total Balance: <span style={{ color: total >= 0 ? "green" : "red" }}>
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Add Transaction Section */}
      <div className="account" style={{ marginTop: "1rem" }}>
        <select value={type} onChange={typeChange} style={{ padding: "0.5rem", borderRadius: "5px" }}>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
          <option value="Investment">Investment</option>
          <option value="Savings">Savings</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={amountChange}
        />
        <input
          type="text"
          placeholder="Description"
          value={name}
          onChange={nameChange}
        />
        <button onClick={addOrUpdateTransaction}>
          {editingId ? "Save Changes" : "Add Transaction"}
        </button>
      </div>

      {/* Transactions Table */}
      <div className="transaction-table" style={{ marginTop: "2rem" }}>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "2px solid #000" }}>Type</th>
                <th style={{ borderBottom: "2px solid #000" }}>Amount</th>
                <th style={{ borderBottom: "2px solid #000" }}>Description</th>
                <th style={{ borderBottom: "2px solid #000" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => {
                const isPositive = isPositiveType(t);
                return (
                  <tr key={t.id}>
                    <td style={{ textAlign: "center" }}>{t.type}</td>
                    <td style={{ color: isPositive ? "green" : "red", textAlign: "right" }}>
                      {isPositive ? "+" : "-"}${parseFloat(t.amount).toFixed(2)}
                    </td>
                    <td>{t.name}</td>
                    <td>
                      <button onClick={() => editTransaction(t)}>Edit</button>
                      <button onClick={() => deleteTransaction(t.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
