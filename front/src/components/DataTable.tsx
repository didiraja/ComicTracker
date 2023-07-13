import './DataTable.scss';
import { IComic } from '../App';

const DataTable = (
  { data = [], isLoading, errorLoading, remove }:
  { data: IComic[], isLoading: boolean, errorLoading: boolean, remove: (id: number) => void }
) => {

  if (errorLoading) {
    return (
      <div className="error-loading">
        <p className="loading-title"><strong>[X]</strong> Nothing here, only anti-matter</p>
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

  return (
    <div className="table-wrapper">
      <div className="table-overflow">
        <div className="table-positioning">
          <table className="table-element">
            <thead>
              <tr>
                <th scope="col" className="table-head">Publisher</th>
                <th scope="col" className="table-head">Title</th>
                <th scope="col" className="table-head">Issue</th>
                <th scope="col" className="table-head">Year</th>
                <th scope="col" className="table-head">Writer</th>
                <th scope="col" className="table-head">Ilustrator</th>
                {/* <th scope="col" className="table-head">Meta</th> */}
              </tr>
            </thead>
            <tbody>
              {
                data?.map((item: IComic) => (
                  <tr key={item.id}>
                    <td className="table-item">{item.publisher}</td>
                    <td className="table-item">{item.title}</td>
                    <td className="table-item">{item.issue}</td>
                    <td className="table-item">{item.year}</td>
                    <td className="table-item">{item.writer}</td>
                    <td className="table-item">{item.illustrator}</td>
                    <td className="table-item">
                      {/* <button type="button" className="btn edit-btn">Edit</button> */}
                      <button
                        type="button"
                        className="btn delete-btn"
                        onClick={() => remove(item.id)}>
                        Delete
                      </button>
                    </td>
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