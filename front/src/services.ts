import { DashboardData } from "./App";

export async function fetchData(url: string): Promise<DashboardData> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}

export async function addComic(url: string) {
    const response = await fetch(url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        publisher_id: 1,
        title: 'testjdiofgjoi',
        issue: Math.floor(Math.random() * 100),
        year: Math.floor(Math.random() * 2023),
        writer_id: 3,
        illustrator_id: 2,
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
}
