import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>Finance Tracker Home Page</h1>
      <Link to="/history">History</Link>
      <br />
      <Link to="/transactions">Transactions</Link>
      <br />
      <Link to="/settings">Settings</Link>
    </div>
  )
}