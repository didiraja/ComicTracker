import { DashboardData } from "./App";

export async function fetchData(url: string): Promise<DashboardData> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}
