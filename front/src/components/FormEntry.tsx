import { Formik, Form, Field, ErrorMessage } from 'formik';
import './FormEntry.scss';

export type IEntry = {
  name: string;
  writer: boolean;
  illustrator: boolean;
}

const FormEntry = ({ submit }: { submit: (entry: IEntry) => void }) => {

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{
          name: '',
          writer: false,
          illustrator: false,
        }}
        validate={values => {

          const errors: any = {};

          if (!values['name']) {
            errors.name = "Entry name is required";
          }

          if (!values['writer'] && !values['illustrator']) {
            errors.writer = "Writer or Illustrator is required"
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {

          submit(values);

          resetForm();
        }}
      >
        <Form id="form">
          <div className='form-grid'>
            <div>
              <label className="label" htmlFor="title">Name</label>
              <Field className="form-default" type="text" name="name"
                placeholder="Takehiko Inoue" />
            </div>

            <div className="option-wrapper flex justify-evenly items-center">
              <div className="entry">
                <Field type="checkbox" name="writer" label="Writer" />
                <label className="label-check" htmlFor="writer">Writer</label>
              </div>

              <div className="entry">
                <Field type="checkbox" name="illustrator" label="Illustrator" />
                <label className="label-check" htmlFor="illustrator">Illustrator</label>
              </div>
            </div>
          </div>
          
          <ErrorMessage name="name" component="div" className="form-error" />
          <ErrorMessage name="writer" component="div" className="form-error" />

          <button
            type="submit"
            className='btn-submit'>
            Add New Entry
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default FormEntry;