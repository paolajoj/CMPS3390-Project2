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

   //useEffect(() => {
   //const applyStyle = async () => {
    //const id = localStorage.getItem("selectedAccount");
    //if (!id) return;

    //const res = await fetch(`http://localhost:3001/api/accounts/${id}`);
    //const data = await res.json();

    //document.body.style.backgroundColor = data.background_color || "white";
    //document.body.style.fontFamily = data.font_family || "Arial";
  //};

  //applyStyle();
//}, [localStorage.getItem("selectedAccount")]);

   
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
                     <input
                     type="text"
                     value={accountName}
                     onChange={(e) => setAccountName(e.target.value)}
                     placeholder="Account name here"/>
                     <button onClick={createAccount}>Create account</button>
                     <button onClick={deleteAccount}>Delete account</button>
                     </div>
                     <div className="links-container">
                        <h2 className = "HTitle">Account menu</h2>
                        <div className="links">
                           
                           <Link to="/add" className="link">Add Transactions</Link>
                           <Link to="/history" className="link">History</Link>
                           <Link to="/settings" className="link">Settings</Link>
                           {/*<Link to="/transactions" className="link">Transactions</Link>*/}
                     </div>
                     </div>
                     </div>
                     );
                  }