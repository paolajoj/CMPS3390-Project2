import { Link } from 'react-router-dom'
import '../App.css'

export default function History() {
	return (
			<div className="home">
			<h1 className="title">Finance Tracker History Page</h1>
			<div className="links">
			<Link to="/" className="link">Home</Link>
			</div>
			</div>
	       )
}
