import { Link } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import '../App.css'

export default function Transactions() {
	const [transactions, setTransactions] = useState([])
	const [amount, setAmount] = useState('')
	const [description, setDescription] = useState('')
	const [type, setType] = useState('Expense')
// Load saved transactions
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('transactions') || '[]')
    setTransactions(saved)
  }, [])

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  // Add a new transaction
  const addTransaction = () => {
    if (!amount || !description) {
      alert('Please fill out both fields.')
      return
    }
    const newTransaction = { amount, description, type}
    setTransactions([...transactions, newTransaction])
    setAmount('')
    setDescription('')
    setType('Expense')
  }

  // Delete a transaction
  const deleteTransaction = (index) => {
    const updated = transactions.filter((_, i) => i !== index)
    setTransactions(updated)
  }


return (
    <div className="home">
      <h1 className="title">Finance Tracker Add Page</h1>

      <div className="links">
        <Link to="/" className="link">Home</Link>
        <Link to="/edit" className="link">Edit</Link>
      </div>

      {/* Add Transaction Section */}
      <div className="account" style={{ marginTop: '2rem' }}>
      {/* type */}
	<select 
	  value={type}
          onChange={(e) => setType(e.target.value)}
   	  style={{ padding: '0.5rem', borderRadius: '5px'}}
	 >
	     <option value ="Expense">Expense</option>
	     <option value ="Income">Income</option>
	  </select>
	<input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTransaction}>Add Transaction</button>
      </div>

      {/* Display Transactions */}
      <div className="transaction-list" style={{ marginTop: '2rem' }}>
        <h3>Transactions</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {transactions.map((t, index) => (
              <li 
		 key={index} 
		 style={{ 
		 marginBottom: '5px',
		 display: 'flex',
		 gap: '1rem'
		}}>
                 <strong>${t.amount}</strong> — {t.description}
               <span 
		style={{
	    	  color: t.type === 'Income' ? 'green' : 'red',
		  fontWeight: 'bold',
	        }}
		>
	 	   {t.type} 
		</span>
		
	       <button
                  style={{ marginLeft: '10px' }}
                  onClick={() => deleteTransaction(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
