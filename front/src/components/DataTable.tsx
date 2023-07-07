import './DataTable.scss';
import { IComic } from '../App';

const DataTable = (
  { data = [], remove }: { data: IComic[], remove: (id: number) => void }
) => {

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