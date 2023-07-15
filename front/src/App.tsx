import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import NewEntry from './routes/NewEntry';
import NoMatch from './routes/NoMatch';
import './App.scss'

function App(): JSX.Element {

  return (
    <>
      <h1 className="title-main">ComicTracker</h1>

      <HashRouter>
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
