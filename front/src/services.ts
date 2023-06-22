import { DashboardData } from "./App";

export async function fetchData(url: string): Promise<DashboardData> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    return data;
  // try {

  //   const response = await fetch(url);

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }

  //   const data = await response.json();

  //   console.log(data);

  //   return data;

  // } catch (error) {

  //   console.error("Error:", error);

  //   return undefined
  // }
}
