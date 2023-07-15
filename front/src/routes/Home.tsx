// @ts-nocheck

import { useEffect, useState } from 'react'
import { fetchData, addEntry, removeComic } from '../services'
import FormComic from '../components/FormComic'
import DataTable from '../components/DataTable'

export interface IComic {
  id: string
  publisher: string
  title: string
  issue: string
  year: string
  writer: string
  illustrator: string
  [key: string]: string
}

export interface ICategory {
  id: string
  name: string
}

export interface DashboardData {
  comics: IComic[]
  publishers: ICategory[]
  writers: ICategory[]
  illustrators: ICategory[]
}

function Home(): JSX.Element {
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
      await addEntry(`${import.meta.env.DEV ? 'http://localhost:5200' : 'https://comictracker.onrender.com'}/comics`, comic)
    } catch (e) {
      console.log(e)
    } finally {
      await fetchDash()
    }
  }

  const removeComicFlow = async (id: string): Promise<void> => {
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
      <FormComic
        data={dashData}
        submit={newComicFlow}
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

export default Home