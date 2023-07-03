import './DataTable.scss';
import { IComic } from '../App';

const DataTable = ({ data = [] }: { data: IComic[] }) => {
  return (
    <div className="table-wrapper">
      <div className="table-overflow">
        <div className="table-positioning">
          <table className="table-element">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-4">Publisher</th>
                <th scope="col" className="px-6 py-4">Title</th>
                <th scope="col" className="px-6 py-4">Issue</th>
                <th scope="col" className="px-6 py-4">Year</th>
                <th scope="col" className="px-6 py-4">Writer</th>
                <th scope="col" className="px-6 py-4">Ilustrator</th>
                <th scope="col" className="px-6 py-4">Meta</th>
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
                      <button type="button" className="btn edit-btn">Edit</button>
                      <button type="button" className="btn delete-btn">Delete</button>
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