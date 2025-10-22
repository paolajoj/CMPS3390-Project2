import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Add() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Expense");
  const [accountId, setAccountId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("selectedAccount");
    if (storedId && storedId !== "null" && storedId !== "") {
      setAccountId(Number(storedId));
    }
  }, []);

  useEffect(() => {
    if (accountId) {
      loadTransactions();
    }
  }, [accountId]);

  async function loadTransactions() {
    try {

      const res = await fetch("http://localhost:3001/api/transactions");
      const data = await res.json();
      const filtered = data.filter(
        (t) => Number(t.account_id) === Number(accountId)
      );
      setTransactions(filtered);
    } catch (err) {
      console.error("Error loading transactions:", err);
    }
  }

  async function addOrUpdateTransaction() {
    if (!accountId) {
      alert("No account selected! Please select one on the Home page first.");
      return;
    }
    if (!amount || !description) {
      alert("Please fill out all fields.");
      return;
    }
    
    if (editingId){ 
    try {
      //if (editingId) {
      const res = await fetch(`http://localhost:3001/api/transactions/${editingId}`, {
        method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ account_id: accountId, type, amount, description }),
        });
        const data = await res.json();
        await loadTransactions();
        //setTransactions((prev) =>
          //prev.map((t) => (t.id === editingId ? data : t))
        //);
        setEditingId(null);
        setAmount("");
        setDescription("");
        setType("Expense");


        



      } catch(err){
        console.error("Error updating transaction:", err);
      }
    }

    else {
      try {

        const res = await fetch("http://localhost:3001/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ account_id: accountId, type, amount, description }),
        });
        const data = await res.json();
        setTransactions([...transactions, data]);
      } catch (err) {
        console.error("Error adding transaction:", err);
      }
    }


      setAmount("");
      setDescription("");
      setType("Expense");
    }

  async function deleteTransaction(id) {
    try {
      await fetch(`http://localhost:3001/api/transactions/${id}`, {
        method: "DELETE",
      });
      setTransactions((prev) =>
        prev.filter((t) => Number(t.id) !== Number(id))
      );
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  }

  function startEditing(t)
  {

    setEditingId(t.id);
    setAmount(t.amount);
    setDescription(t.description);
    setType(t.type);
  }

  if (!accountId){

    return (

      <div className="home">
        <h1 className="title">Finance Tracker - Add Transactions</h1>
        <p style={{ marginTop: "2rem" }}>No account selected! Go back to Home and pick one.</p>
        <div className="links">
          <Link to="/" className="link">Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <h1 className="title">Finance Tracker - Add Transactions</h1>

      <div className="links">
        <Link to="/" className="link">Home</Link>
      </div>

      <div className="account" style={{ marginTop: "1rem" }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>

        <input
          type="number"
          placeholder="Amount"

          value={amount}
          onChange={(e) => setAmount(e.target.value)}/>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}/>

        <button onClick={addOrUpdateTransaction}>
          {editingId ? "Save Changes" : "Add Transaction"}
        </button>
      </div>

      <div className="transaction-list" style={{ marginTop: "2rem" }}>
        <h3>Transactions for {localStorage.getItem("selectedAccountName") || `Account #${accountId}`}</h3>

        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul>
            {transactions.map((t) => (
              <li key={t.id}>
                <strong>${t.amount}</strong> — {t.description} ({t.type})
                <button
                  style={{ marginLeft: "10px", marginBottom: "10px"}}
                  onClick={() => startEditing(t)}>Edit</button>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => deleteTransaction(t.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}