import { Link } from 'react-router-dom'
import '../App.css'

export default function Home() {
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
			</div>
	       )
}
