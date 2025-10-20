import { Link } from 'react-router-dom'
import '../App.css'
import { useState, useEffect } from "react"
import Account from '../Models/Account.js'

const accountManage = new Account();


export default function Home() {
    const [accounts, setAccounts] = useState([]);
    const [accountName, setAccountName] = useState("")
    const [selectedAccount, setSelectedAccount] = useState("")
    
    useEffect(() => {
      loadAccounts();
   }, []);
   
   async function loadAccounts()
   {
      const data = await accountManage.getAccounts();
      setAccounts(data);
   }

   async function createAccount(){
      const data = await accountManage.getAccounts();
      setAccounts(data);
   }

   async function createAccount()
   {
      if (!accountName.trim()) {
         alert("You need to type an account name");
         return;
      }
      await accountManage.createAccount(accountName);
      setAccountName("");
      loadAccounts();
   }

   async function deleteAccount(){
      if (!SelectedAccount)
      {
         alert("Please select an account to delete!");
         return;
      }
      await accountManage.deleteAccount(selectedAccount);
      loadAccounts();
   }

   return(
   <div className="home">
      <h1 className="title">Finance Tracker Home Page</h1>
      <div className="links">
         
        <Link to="/history" className="link">History</Link>
        <Link to="/transactions" className="link">Transactions</Link>
        <Link to="/settings" className="link">Settings</Link>
        <Link to="/add" className="link">Add Transactions</Link>
      </div>
      
      <div className="account">
         <input
         type="text"
         value={accountName}
         onChange={(e) => setAccountName(e.target.value)}
         placeholder="Account name here"
         />
         
         <button onClick={createAccount}>Create account</button>
         <button onClick={deleteAccount}>Delete account</button>
         </div>
         
         <div className="account-select">
            <label>Account:
               <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
                  <option value="">Select Account</option>
                  {accounts.map((account) => (
                     <option key={account.id} value={account.id}>
                        {account.name}
                     </option>
                  ))}
               </select>
            </label>
         </div>
      </div>
   );
}