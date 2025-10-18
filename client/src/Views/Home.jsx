import { Link } from 'react-router-dom'
import '../App.css'
import { useState } from "react"
import Account from '../Models/Account.js'

const accountManage = new Account()


export default function Home() {
    const [accounts, setAccounts] = useState(accountManage.getAccounts())
    const [accountName, setAccountName] = useState("")
    const [selectedAccount, setSelectedAccount] = useState("")

    function handleAccountChange(event)
    {
       setAccountName(event.target.value)
    }

    function handleAccountSelect(event)
    {
       setSelectedAccount(event.target.value)
    }

    function createAccount()
    {
       if (accountName == "")
       {
           alert("You need to type an account name")
           return
       }
       accountManage.createAccount(accountName)
       setAccounts(accountManage.getAccounts())
       setAccountName("")

    }

    function deleteAccount()
    {

       if (accountName == "")
       {
           alert("You need to type an account name")
           return

       }

       accountManage.deleteAccount(selectedAccount)
       setAccounts(accountManage.getAccounts())
       setAccountName("")
    }

    function AccountOptions()
    {
       const options = accounts.map(function(account)
       {
          return <option key = {account.id} value = {account.id}> {account.name} </option>
       })

       return options
    }


	return (
			<div className="home">
			<h1 className="title">Finance Tracker Home Page</h1>
			<div className="links">
			<Link to="/history" className="link">History</Link>
			<Link to="/transactions" className="link">Transactions</Link>
			<Link to="/settings" className="link">Settings</Link>
			<Link to="/add" className="link">Add Transactions</Link>
			<Link to="/edit" className="link">Edit Transactions</Link>
			</div>

			<input type = "text"
			value = {accountName}
			onChange = {handleAccountChange}
			placeholder = "Account name here"
			/>
            <button onClick = {createAccount}> Create account </button>
            <button onClick = {deleteAccount}> Delete account </button>

            <span>
                Account :
           <select value = {selectedAccount} onChange = {handleAccountSelect}>
               <option value = ""> Select Account </option>
               {AccountOptions()}
            </select>
            </span>
			</div>
	       )
}
