import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Home from './routes/Home';
import NewEntry from './routes/NewEntry';
import NoMatch from './routes/NoMatch';
import './App.scss'

function App(): JSX.Element {

  function handleClick(e: MouseEvent, to: string) {

    const location = useLocation();

    if (location.pathname === to) {
      e.preventDefault();
    }
  }

  const NavCustom = ({ route, children }: { route: string, children: string }) => {
    return <NavLink to={route} className="nav" onClick={() => handleClick}>{children}</NavLink>
  }

  return (
    <>
      <HashRouter>
        <div className="navbar">
          <NavCustom route="/">New Comic</NavCustom>
          <NavCustom route="/entry">New Entry</NavCustom>
        </div>

        <h1 className="title-main">ComicTracker</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entry" element={<NewEntry />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
