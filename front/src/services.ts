import { DashboardData } from "./App";
import { IEntruo } from "./components/FormEntry";
export interface IComicData {
  illustrator: string;
  issue: string;
  publisher: string;
  title: string;
  writer: string;
  year: string;
}
export async function fetchData(url: string): Promise<DashboardData> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}

export async function addComic(url: string, comic: IComicData) {
    const response = await fetch(url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comic)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

export async function addEntry(url: string, entry: IEntruo) {
    const response = await fetch(url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

export async function removeComic(id: string) {

    if (!id) {
      throw new Error(`COMICTRACKER: ID needs to be a number`);
    }

    const response = await fetch(`${import.meta.env.DEV ? 'http://localhost:5200' : 'https://comictracker.onrender.com'}/comic/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
}
