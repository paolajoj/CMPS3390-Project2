import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>Da finance tracker Home Page</h1>
      <Link to="/history">History</Link>
    </div>
  )
}