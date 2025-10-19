import { Link } from 'react-router-dom'
import '../App.css'

export default function Transactions() {
	return (
			<div className="home">
			<h1 className="title">Finance Tracker Add Page</h1>
			<div className="links">
			<Link to="/" className="link">Home</Link>
			<Link to="/Edit" className="link">Edit</Link>
			</div>
			</div>
	       )
}
