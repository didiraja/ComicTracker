import './DataTable.scss';

const DataTable = () => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-neutral-500">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="min-w-full sm:px-6 lg:px-8">
          <div className="">
            <table className="min-w-full text-left text-md">
              <thead className="">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">First</th>
                  <th scope="col" className="px-6 py-4">Last</th>
                  <th scope="col" className="px-6 py-4">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">1</td>
                  <td className="whitespace-nowrap px-6 py-4">Mark</td>
                  <td className="whitespace-nowrap px-6 py-4">Otto</td>
                  <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">2</td>
                  <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                  <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                  <td className="whitespace-nowrap px-6 py-4">@fat</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">3</td>
                  <td className="whitespace-nowrap px-6 py-4">Larry</td>
                  <td className="whitespace-nowrap px-6 py-4">Wild</td>
                  <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTable;