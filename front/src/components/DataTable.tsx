import './DataTable.scss';
import { InterfaceComic } from '../App';

const DataTable = ({ data }: { data: InterfaceComic[] }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="min-w-full sm:px-6 lg:px-8">
          <div>
            <table className="min-w-full text-left text-md">
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
                  data.map((item: InterfaceComic) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap px-6 py-4">{item.publisher}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.title}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.issue}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.year}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.writer}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.illustrator}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button type="button" className="rounded bg-indigo-500 hover:bg-indigo-600 p-2 mr-2 text-sm uppercase leading-normal text-white">Edit</button>
                        <button type="button" className="rounded bg-red-500 hover:bg-red-600 p-2 text-sm uppercase leading-normal text-white">Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTable;