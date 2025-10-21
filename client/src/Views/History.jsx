import { Link } from "react-router-dom";
import "../App.css";
import React, {useEffect, useState} from "react";

export default function History(){

  const [transactions, setTransactions] = useState([]);
  const [accountId, setAccountId] = useState(null);

  useEffect(() =>{
    const storedId = localStorage.getItem("selectedAccount");
    if (storedId) {
      setAccountId(Number(storedId));
    }
  }, 
  []);

  useEffect(() =>{
    if (accountId){
      loadTransactions();
    }
  }, [accountId]);

  async function loadTransactions(){
    const res = await fetch("http://localhost:3001/api/transactions");
    const data = await res.json();
    const filtered = data.filter((t) => Number(t.account_id) === accountId);
    setTransactions(filtered);
  }

  if (!accountId){

    return(
      <div className="home">
        <h1 className="title">Finance Tracker History</h1>
        <p>No account selected! Please choose one on the Home page.</p>
        <div className="links">
          <Link to="/" className="link">Home</Link>
        </div>
      </div>
    );
  }

  return(
    <div className="home">
      <h1 className="title">Finance Tracker History</h1>

      <div className="links">
        <Link to="/" className="link">Home</Link>
        <Link to="/add" className="link">Add Transactions</Link>
      </div>
	  
	  <h3 style={{ marginTop: "1.5rem" }}>
        Transactions for {localStorage.getItem("selectedAccountName") || `Account #${accountId}`}</h3>


      {transactions.length === 0 ? (
        <p>No transactions yet.</p>

      ) : (

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr>

              <th style={{ borderBottom: "2px solid #000" }}>Type</th>
              <th style={{ borderBottom: "2px solid #000" }}>Amount</th>
              <th style={{ borderBottom: "2px solid #000" }}>Description</th>
              <th style={{ borderBottom: "2px solid #000" }}>Date</th>
            
			</tr>
          </thead>
          <tbody>
            {transactions.map((t) =>(
              <tr key={t.id}>

                <td>{t.type}</td>

                <td style={{ color: t.type === "Income" ? "green" : "red" }}>
                  ${parseFloat(t.amount).toFixed(2)}
                </td>
                <td>{t.description}</td>
                <td>{new Date(t.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}