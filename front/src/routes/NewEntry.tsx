import { useEffect, useState } from 'react'
import { fetchData, addEntry } from '../services'
import FormEntry from '../components/FormEntry'
import DataTable from '../components/DataTable'
import { DashboardData } from './Home'

function NewEntry(): JSX.Element {
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

  const newEntryFlow = async (entry: any): Promise<void> => {
    try {
      await addEntry(`${import.meta.env.DEV ? 'http://localhost:5200' : 'https://comictracker.onrender.com'}/entry`, entry)
    } catch (e) {
      console.log(e)
    } finally {
      await fetchDash()
    }
  }

  // const removeComicFlow = async (id: string): Promise<void> => {
  //   try {
  //     await removeComic(id)
  //   } catch (e) {
  //     console.log(e)
  //   } finally {
  //     await fetchDash()
  //   }
  // }

  useEffect(() => {
    fetchDash()
  }, [])

  return (
    <>
      <FormEntry
        submit={newEntryFlow}
      />

      <div className="grid grid-cols-3 gap-5">
        <DataTable
          data={dashData.publishers}
          isLoading={isLoading}
          errorLoading={errorLoading}
        />
        <DataTable
          data={dashData.writers}
          isLoading={isLoading}
          errorLoading={errorLoading}
        />
        <DataTable
          data={dashData.illustrators}
          isLoading={isLoading}
          errorLoading={errorLoading}
        />
      </div>

    </>
  )
}

export default NewEntry