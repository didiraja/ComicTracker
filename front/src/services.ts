import { type DashboardData } from './routes/Home'
import { type IEntryRequest } from './components/FormEntry'
export interface IComicData {
  illustrator: string
  issue: string
  publisher: string
  title: string
  writer: string
  year: string
}
export async function fetchData (url: string): Promise<DashboardData> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return await response.json()
}

export async function addEntry (url: string, entry: IComicData | IEntryRequest): Promise<void> {
  const response = await fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}

export async function removeComic (id: string): Promise<void> {
  const idAsNumber: number | typeof NaN = Number(id)

  if (idAsNumber === 0 || Number.isNaN(idAsNumber)) {
    throw new Error('COMICTRACKER: ID needs to be a number')
  }

  const response = await fetch(`${import.meta.env.DEV ? 'http://localhost:5200' : 'https://comictracker.onrender.com'}/comic/${id}`)

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
}
