import './Form.scss';

const Form = () => {
  return (
    <div className="form-wrapper">
      <h3 className="title-section">Add New Comic</h3>

      <div id="form" className="mb-5 grid grid-cols-3 gap-6">
        <div>
          <label className="label" htmlFor="publisher">Publisher</label>

          <select className="form-default" name="publisher">
            <option>Marvel</option>
            <option>DC</option>
            <option>Image</option>
            <option>Mangá</option>
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
            <option>Jonathan Hickman</option>
            <option>Tom King</option>
            <option>Brain K. Vaughan</option>
          </select>
        </div>

        <div>
          <label className="label" htmlFor="illustrator">Illustrator</label>

          <select className="form-default" name="illustrator">
            <option>Chris Bachallo</option>
            <option>Nick Derandt</option>
            <option>Cliff Chiang</option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default Form;