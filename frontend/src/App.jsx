import AuthComponent from './components/auth/AuthComponents';
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/account' element={<AuthComponent/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
