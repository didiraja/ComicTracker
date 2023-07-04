import { useEffect, useState } from 'react'
import { fetchData, addComic, IComicData } from './services'
import Form from './components/Form'
import DataTable from './components/DataTable'
import './App.scss'

export type IComic = {
  id: number;
  publisher: string;
  title: string;
  issue: number;
  year: number;
  writer: string;
  illustrator: string;
}

export type ICategory = {
  id: number;
  name: string;
}

export type DashboardData = {
  comics: IComic[];
  publishers: ICategory[];
  writers: ICategory[];
  illustrators: ICategory[];
}

function App() {
  const INITIAL_DASH = {
    comics: [],
    publishers: [],
    writers: [],
    illustrators: [],
  }

  const [dashData, setDashData] = useState<DashboardData>(INITIAL_DASH);

  const fetchDash = async () => {
    try {
      const data = await fetchData(`${import.meta.env.DEV ? 'http://localhost:5200' : 'https://comictracker.onrender.com'}/dashboard`);

      setDashData(data);
    } catch (error) {
      console.error("Error:", error);

      return {}
    }
  }

  const newComicFlow = async (comic: IComicData) => {
    try {
      await addComic(`${import.meta.env.DEV ? 'http://localhost:5200' : 'https://comictracker.onrender.com'}/comics`, comic)
    }
    catch (e) {
      console.log(e);
    }
    finally {
      fetchDash()
    }
  }

  useEffect(() => {
    fetchDash()
  }, [])

  return (
    <>
      <h1 className="title-main">ComicTracker</h1>
      <Form data={dashData} submit={newComicFlow} />
      <DataTable data={dashData.comics} />
    </>
  )
}

export default App
