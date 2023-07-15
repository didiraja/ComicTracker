import { IComic, ICategory } from '../routes/Home';
import './DataTable.scss';

export type ComicOrEntry = IComic | ICategory
export type ComicsOrEntries = IComic[] | ICategory[]

const DataTable = (
  { data = [], isLoading, errorLoading, remove }:
    { data: ComicsOrEntries, isLoading: boolean, errorLoading: boolean, remove?: (id: string) => void }
) => {

  if (errorLoading) {
    return (
      <div className="error-loading">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        <p className="error-title"> Nothing here, only anti-matter</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="table-is-loading">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className="w-6 h-6 animate-spin">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>

        <p className="loading-title">Fetching content...</p>
      </div>
    )
  }

  const headersArr = data.length > 0 ? Object.keys(data[0]) : [];

  function capitalizeFirstCharacter(str: string) {
    return str.split(' ')
      .map(block => block.charAt(0).toUpperCase() + block.slice(1))
      .join(' ');
  }

  return (
    <div className="table-wrapper">
      <div className="table-overflow">
        <div className="table-positioning">
          <table className="table-element">
            <thead>
              <tr>
                {
                  headersArr ?
                    headersArr.map((label) => (
                      <th scope="col" className="table-head" key={label}>
                        {capitalizeFirstCharacter(label)}
                      </th>
                    )) : null
                }
                {/* <th scope="col" className="table-head">Meta</th> */}
              </tr>
            </thead>
            <tbody>
              {
                data?.map((item: ComicOrEntry) => (
                  <tr key={item.id}>
                    {
                      (Object.keys(item) as Array<keyof typeof item>).map((entry: keyof typeof item) => (
                        <td className="table-item" key={entry}>{item[entry]}</td>
                      ))
                    }

                    {
                      remove ?
                        <td className="table-item">
                          <button type="button" className="btn edit-btn">Edit</button>
                          <button
                            type="button"
                            className="btn delete-btn"
                            onClick={() => remove(item.id)}>
                            Delete
                          </button>
                        </td>
                        : null
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DataTable;