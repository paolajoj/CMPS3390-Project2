import { Link } from 'react-router-dom'
import '../App.css'
import { useState, useEffect } from "react"
import Account from '../Models/Account.js'

const accountManage = new Account();


export default function Home(){

    const [accounts, setAccounts] = useState([]);
    const [accountName, setAccountName] = useState("")
    const [selectedAccount, setSelectedAccount] = useState(localStorage.getItem("selectedAccount") || "");
    
    useEffect(() =>{
      loadAccounts();
   }, []);
   
   async function loadAccounts()
   {
      const data = await accountManage.getAccounts();
      setAccounts(data);
   }

   async function createAccount()
   {
      if (!accountName) {
         alert("You need to type an account name");
         return;
      }
      await accountManage.createAccount(accountName);
      setAccountName("");
      loadAccounts();
   }

   async function deleteAccount(){
      if (!selectedAccount)
      {
         alert("Please select an account to delete!");
         return;
      }
      await accountManage.deleteAccount(selectedAccount);
      loadAccounts();
      localStorage.removeItem("selectedAccount");
      setSelectedAccount("");
   }
   
   function handleSelectChange(e)
   {
      const val = e.target.value;
      setSelectedAccount(val);
      const selected = accounts.find(acc => acc.id === Number(val));
      if (selected){
         localStorage.setItem("selectedAccountName", selected.name);
      }
      localStorage.setItem("selectedAccount", val);
   }


   return(

   <div className="home">
      <h1 className="title">Finance Tracker Home Page</h1>
      
      <div className="account">
         <input
         type="text"
         value={accountName}
         onChange={(e) => setAccountName(e.target.value)}
         placeholder="Account name here"/>
         
         <button onClick={createAccount}>Create account</button>
         <button onClick={deleteAccount}>Delete account</button>
         </div>
         
         <div className="account-select">

            <label>Choose an Account: <select value={selectedAccount} onChange={handleSelectChange}>
                  <option value="">Select Account</option>
                  {accounts.map((account) => (
                     <option key={account.id} value={account.id}>
                        {account.name}
                     </option>
                  ))}
               </select>
            </label>
         </div>
      <div className="links">
         
        <Link to="/history" className="link">History</Link>
        <Link to="/transactions" className="link">Transactions</Link>
        <Link to="/settings" className="link">Settings</Link>
        <Link to="/add" className="link">Add Transactions</Link>
         </div>
      </div>
   );
}
