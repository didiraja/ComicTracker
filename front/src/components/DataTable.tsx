import { IComic, ICategory } from '../routes/Home';
import Close from './icon/Close';
import Load from './icon/Load';
// import Edit from './icon/Edit';
import Delete from './icon/Delete';
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
        <Close />

        <p className="error-title"> Nothing here, only anti-matter</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="table-is-loading">
        <Load />

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
              </tr>
            </thead>
            <tbody>
              {
                data?.map((item: ComicOrEntry) => (
                  <tr key={item.id}>
                    {
                      (Object.keys(item) as Array<keyof typeof item>).map((entry: keyof typeof item) => (
                        <td className="table-item" key={entry}>
                          {item[entry]}</td>
                      ))
                    }


                    {
                      remove ?
                        <td className="table-item">
                          {/* <button type="button" className="btn edit-btn">
                            <Edity />
                          </button>  */}
                          <button
                            type="button"
                            className="btn delete-btn"
                            onClick={() => remove(item.id)}>
                            <Delete />
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