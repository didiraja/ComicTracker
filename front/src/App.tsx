import Form from './components/Form'
import DataTable from './components/DataTable'
import './App.scss'
import { useEffect, useState } from 'react'

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

export type DashboardData = undefined | {
  comics: IComic[] | undefined;
  publishers: ICategory[] | undefined;
  writers: ICategory[] | undefined;
  illustrators: ICategory[] | undefined;
}

function App() {

  const [dashData, setDashData] = useState({});

  useEffect(() => {

    const fetchDash = async () => {

      try {

        const response = await fetch(`http://${import.meta.env.DEV ? 'localhost:5200' : 'comictracker.onrender.com'}/dashboard`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // console.log(data);

        setDashData(data);
      } catch (error) {

        console.error("Error:", error);

        return {}
      }
    }

    fetchDash()
  }, [])

  return (
    <>
      <h1 className="title-main">ComicTracker</h1>
      <Form />

      <DataTable data={dashData.comics} />
    </>
  )
}

export default App
