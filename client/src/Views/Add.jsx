import { Link } from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import '../App.css'
import Transactions from '../Models/Transactions.js'

const model = new Transactions()


export default function Add() {
	const [transactions, setTransactions] = useState([])
	const [amount, setAmount] = useState('')
	const [name, setName] = useState('')
	const [type, setType] = useState('Expense')
	const [editingId, setEditingId] = useState(null);


   function amountChange(event)
    {
       setAmount(event.target.value)
    }

    function nameChange(event)
    {
       setName(event.target.value)
    }

    function typeChange(event)
    {
       setType(event.target.value)
    }


	function addTransaction()
	{
       if (!name)
       {
          alert("You need to type an description");
          return;
       }

       if (!amount)
       {
           alert("You need to type an amount");
           return;
       }
	if (editingId) {
		//editing existing transactions(editingId, {amount, name, type})
		setEditingId(null)
	} else { 
		model.createTransaction(amount, name, type)
	}

       {/*model.createTransaction(amount, name, type)*/}
       setTransactions([...model.getTransactions()])
       setAmount("")
       setName("")
       setType("Expense")
    }
    function editTransaction(id) {
	const transaction = model.getTransactions().find(t => t.id === id)
	if (transaction) {
		setAmount(transaction.amount)
		setName(transaction.name)
		setType(transaction.type)
		setEditingId(id)
	}
}

    function deleteTransaction(id)
    {
       model.deleteTransaction(id)
       setTransactions([...model.getTransactions()])
    }

    function transactionDisplay(element)
    {
      return(

        <li key = {element.id}
        style =
        {{
          marginBottom: "5px",
          display: "flex",
          gap: "1rem"
        }}
        >
        <strong>${element.amount} </strong> - {element.name}
        <span
        style =
        {{
          color: element.type == "Income" ? "green" : "red",
          fontWeight: "bold"
        }}
        >
        {element.type}
        </span>
        <button
        style =
        {{
           marginLeft: "10px"
        }}
        onClick = {function () {deleteTransaction(element.id)}}
        >
        Delete
        </button>
        </li>

      )
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
          onChange={typeChange}
   	  style={{ padding: '0.5rem', borderRadius: '5px'}}
	 >
	     <option value ="Expense">Expense</option>
	     <option value ="Income">Income</option>
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
        <button onClick={addTransaction}>
	{editingId ? "Save changes" : "Add Transaction"}
	</button>
      		
	</div>

      {/* Display Transactions */}
      <div className="transaction-list" style={{ marginTop: '2rem' }}>
        <h3>Transactions</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (

	<ul style={{ listStyle: 'none', padding: 0 }}>
          {transactions.map(t => (
            <li key={t.id} style={{ marginBottom: '0.5rem' }}>
              ${t.amount} — {t.name} ({t.type})
              <button
                style={{ marginLeft: '0.5rem' }}
                onClick={() => editTransaction(t.id)}
              >
                Edit
              </button>
              <button
                style={{ marginLeft: '0.5rem' }}
                onClick={() => deleteTransaction(t.id)}
              >



          {/*<ul style={{ listStyle: 'none', padding: 0 }}>
            {transactions.map(transactionDisplay)}*/}
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
