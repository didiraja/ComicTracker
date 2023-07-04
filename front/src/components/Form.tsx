import { Formik, Form, Field, ErrorMessage } from 'formik';
import { DashboardData, ICategory } from '../App';
import { IComicData } from '../services';
import './Form.scss';

const FormComponent = ({ data, submit }: { data: DashboardData, submit: (comic: IComicData) => void }) => {

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{
          publisher: '',
          title: '',
          issue: '',
          year: '',
          writer: '',
          illustrator: ''
        }}
        validate={values => {
          const errors: Partial<Record<keyof typeof values, string>> = {};

          Object.keys(values).forEach(key => {
            if (!values[key as keyof typeof values]) {
              errors[key as keyof typeof values] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
          });

          return errors;
        }}
        onSubmit={(values) => submit(values)}
      >
        <Form id="form">

          <div className='form-grid'>
            <div>
              <label className="label" htmlFor="publisher">Publisher</label>
              <Field className="form-default" name="publisher" as="select">
                <option value="">{' '}</option>
                {data.publishers?.map((pub: ICategory) => (
                  <option key={pub.id} value={pub.id}>{pub.name}</option>
                ))}
              </Field>
              <ErrorMessage name="publisher" component="div" className="form-error" />
            </div>

            <div>
              <label className="label" htmlFor="title">Title</label>
              <Field className="form-default" type="text" name="title" placeholder="Justice League" />
              <ErrorMessage name="title" component="div" className="form-error" />
            </div>

            <div>
              <label className="label" htmlFor="issue">Issue</label>
              <Field className="form-default" type="text" name="issue" placeholder="52" />
              <ErrorMessage name="issue" component="div" className="form-error" />
            </div>

            <div>
              <label className="label" htmlFor="year">Year</label>
              <Field className="form-default" type="text" name="year" placeholder="2011" />
              <ErrorMessage name="year" component="div" className="form-error" />
            </div>

            <div>
              <label className="label" htmlFor="writer">Writer</label>
              <Field className="form-default" name="writer" as="select">
                <option value="">{' '}</option>
                {data.writers?.map((writer: ICategory) => (
                  <option key={writer.id} value={writer.id}>{writer.name}</option>
                ))}
              </Field>
              <ErrorMessage name="writer" component="div" className="form-error" />
            </div>

            <div>
              <label className="label" htmlFor="illustrator">Illustrator</label>
              <Field className="form-default" name="illustrator" as="select">
                <option value="">{' '}</option>
                {data.illustrators?.map((illustrator: ICategory) => (
                  <option key={illustrator.id} value={illustrator.id}>{illustrator.name}</option>
                ))}
              </Field>
              <ErrorMessage name="illustrator" component="div" className="form-error" />
            </div>
          </div>

          <button
            type="submit"
            className='btn-submit'>
            Add New Comic
          </button>
        </Form>
      </Formik>
    </div>
  );
}



export default FormComponent;