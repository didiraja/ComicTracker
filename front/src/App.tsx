import { useEffect, useState } from 'react'
import { fetchData, addComic, IComicData, removeComic } from './services'
// import FormComic from './components/FormComic'
import FormEntry from './components/FormEntry'
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

  const [isLoading, setLoading] = useState(false);
  const [errorLoading, setErrLoading] = useState(false);

  const [dashData, setDashData] = useState<DashboardData>(INITIAL_DASH);

  const fetchDash = async () => {

    setLoading(true);
    
    try {

      const data = await fetchData(`${import.meta.env.DEV ? 'http://localhost:5200' : 'https://comictracker.onrender.com'}/dashboard`);
      
      setDashData(data);
      setLoading(false);
    } catch (error) {

      setErrLoading(true);
      setLoading(false);
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

  const newEntryFlow = async (entry: any) => {
    
    console.log(entry);
  }

  const removeComicFlow = async (id: number) => {
    try {
      await removeComic(id)
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
      <FormEntry
        submit={newEntryFlow}
      />
      <DataTable
        data={dashData.comics}
        isLoading={isLoading}
        errorLoading={errorLoading}
        remove={removeComicFlow}
      />
    </>
  )
}

export default App
