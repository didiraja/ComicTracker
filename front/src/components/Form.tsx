import { DashboardData, ICategory } from '../App';
import './Form.scss';

const Form = ({ data, submit }: { data: DashboardData, submit: () => void }) => {
  return (
    <div className="form-wrapper">
      {/* <h3 className="title-section">Add New Comic</h3> */}

      <div id="form">
        <div>
          <label className="label" htmlFor="publisher">Publisher</label>

          <select className="form-default" name="publisher">
            {
              data.publishers?.map((pub: ICategory) => (
                <option key={pub.id} value={pub.id}>{pub.name}</option>
              ))
            }
          </select>
        </div>

        <div>
          <label className="label" htmlFor="title">Title</label>

          <input className="form-default" type="text" name="title" placeholder="Justice League" />
        </div>

        <div>
          <label className="label" htmlFor="issue">Issue</label>

          <input className="form-default" type="text" name="issue" placeholder="25" />
        </div>

        <div>
          <label className="label" htmlFor="year">Year</label>

          <input className="form-default" type="text" name="year" placeholder="2011" />
        </div>

        <div>
          <label className="label" htmlFor="writer">Writer</label>

          <select className="form-default" name="writer">
            {data.writers?.map((writer: ICategory) => (
              <option key={writer.id} value={writer.id}>{writer.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="illustrator">Illustrator</label>

          <select className="form-default" name="illustrator">
            {data.illustrators?.map((illustrator: ICategory) => (
              <option key={illustrator.id} value={illustrator.id}>{illustrator.name}</option>
            ))}
          </select>
        </div>

      </div>

      <button
        className='rounded px-5 py-3 font-bold uppercase bg-gray-500'
        onClick={() => submit()}>
        Add New Comic
      </button>
    </div>
  );
}

export default Form;