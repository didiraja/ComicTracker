import DataTable from './components/DataTable'
import './App.css'

export type InterfaceComic = {
  id: number;
  publisher: string;
  title: string;
  issue: number;
  year: number;
  writer: string;
  illustrator: string;
}

function App() {

  const comics = [
    {
      id: 4876,
      publisher: 'Marvel',
      title: 'X-men',
      issue: 1,
      year: 2019,
      writer: 'Jonathan Hickman',
      illustrator: 'Chris Bachallo',
    },
    {
      id: 9630,
      publisher: 'DC',
      title: 'Mister Miracle',
      issue: 5,
      year: 2018,
      writer: 'Tom King',
      illustrator: 'Nick Derandt',
    },
    {
      id: 7412,
      publisher: 'Image',
      title: 'Paper Girls',
      issue: 8,
      year: 2015,
      writer: 'Brain K. Vaughan',
      illustrator: 'Cliff Chiang',
    },
  ];

  return (
    <>
      <h1 className="text-5xl font-bold mb-8">ComicTracker</h1>
      <DataTable data={comics} />
    </>
  )
}

export default App
