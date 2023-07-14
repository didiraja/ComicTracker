import { useEffect, useState } from 'react'
import { fetchData, addComic, type IComicData, removeComic } from './services'
// import FormComic from './components/FormComic'
import FormEntry from './components/FormEntry'
import DataTable from './components/DataTable'
import './App.scss'

export interface IComic {
  id: number
  publisher: string
  title: string
  issue: number
  year: number
  writer: string
  illustrator: string
}

export interface ICategory {
  id: number
  name: string
}

export interface DashboardData {
  comics: IComic[]
  publishers: ICategory[]
  writers: ICategory[]
  illustrators: ICategory[]
}

function App(): JSX.Element {
  const INITIAL_DASH = {
    comics: [],
    publishers: [],
    writers: [],
    illustrators: []
  }

  const [isLoading, setLoading] = useState(false)
  const [errorLoading, setErrLoading] = useState(false)

  const [dashData, setDashData] = useState<DashboardData>(INITIAL_DASH)

  const fetchDash = async (): Promise<void> => {
    setLoading(true)

    try {
      const data = await fetchData(`${import.meta.env.DEV ? 'http://localhost:5200' : 'https://comictracker.onrender.com'}/dashboard`)

      setDashData(data)
      setLoading(false)
    } catch (error) {
      setErrLoading(true)
      setLoading(false)
      console.error('Error:', error)
    }
  }

  const newComicFlow = async (comic: IComicData): Promise<void> => {
    try {
      await addComic(`${import.meta.env.DEV ? 'http://localhost:5200' : 'https://comictracker.onrender.com'}/comics`, comic)
    } catch (e) {
      console.log(e)
    } finally {
      await fetchDash()
    }
  }

  const newEntryFlow = async (entry: any): Promise<void> => {
    console.log(entry)
  }

  const removeComicFlow = async (id: number): Promise<void> => {
    try {
      await removeComic(id)
    } catch (e) {
      console.log(e)
    } finally {
      await fetchDash()
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
