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

export type DashboardData = {} | {
  comics?: IComic[];
  publishers?: ICategory[];
  writers?: ICategory[];
  illustrators?: ICategory[];
}

function App() {

  const [dashData, setDashData] = useState({
    comics: [],
  });

  useEffect(() => {

    const fetchDash = async () => {

      try {

        const response = await fetch(`${import.meta.env.DEV ? 'http://localhost:5200' : 'https://comictracker.onrender.com'}/dashboard`);

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
