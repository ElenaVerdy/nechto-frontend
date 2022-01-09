import './App.sass';
import './styles/typography.sass';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  NavLink
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <div className="App__menu">
          <NavLink to="/" className="App__menu-item">Рейтинг</NavLink>
          <NavLink to="/new" className="App__menu-item">Записать результат</NavLink>
          <NavLink to="/games" className="App__menu-item">Все игры</NavLink>
        </div>

        <Routes>
          <Route exact path="/" element={<div>Рейтинг</div>} />
          <Route path="/new" element={<div>Новая игра</div>} />
          <Route path="/games" element={<div>Все игры</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
