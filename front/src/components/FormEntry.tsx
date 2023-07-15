import { Formik, Form, Field, ErrorMessage } from 'formik'
import './FormEntry.scss'
import { useState } from 'react'

export interface IEntryRequest {
  name: string
  publisher: string
  writer: boolean
  illustrator: boolean
}

const FormEntry = ({ submit }: { submit: (entry: IEntryRequest) => void }): JSX.Element => {
  const labels = ['Publisher', 'Writer/Illustrator']
  const [navActive, setActive] = useState(labels[0])

  const NavBar = ({ reset }: { reset: () => void }): JSX.Element => {
    return (
      <div className="nav-wrapper">
        {
          labels.map((nav) => (
            <button className={`nav-btn ${(navActive === nav) ? 'active' : ''}`} onClick={() => {
              setActive(nav)

              reset()
            }} key={nav}>
              {nav}
            </button>
          ))
        }
      </div>
    )
  }

  return (
    <>
      <div className="form-wrapper">
        <Formik
          initialValues={{
            name: '',
            publisher: '',
            writer: false,
            illustrator: false
          }}
          validate={values => {
            const errors: any = {}

            if (navActive === 'Writer/Illustrator') {
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              if (!values.name) {
                errors.name = 'Entry name is required'
              }

              if (!values.writer && !values.illustrator) {
                errors.writer = 'Writer or Illustrator is required'
              }
            }

            if (navActive === 'Publisher') {
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              if (!values.publisher) {
                errors.publisher = 'Publisher name is required'
              }
            }

            return errors
          }}
          onSubmit={(values, { resetForm }) => {
            submit(values)
            resetForm()
          }}
        >
          {({ resetForm }) => {
            return (
              <>
                <NavBar reset={resetForm} />

                <Form id="form">
                  <div className='form-grid'>

                    {
                      (navActive === 'Writer/Illustrator')
                        ? <>
                          <div>
                            <label className="label" htmlFor="name">Name</label>
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
                        </>
                        : null

                    }

                    {
                      (navActive === 'Publisher')
                        ? <>
                          <div>
                            <label className="label" htmlFor="publisher">Publisher</label>
                            <Field className="form-default" type="text" name="publisher"
                              placeholder="Dark Horse" />
                          </div>
                        </>
                        : null
                    }
                  </div>

                  <ErrorMessage name="name" component="div" className="form-error" />
                  <ErrorMessage name="writer" component="div" className="form-error" />
                  <ErrorMessage name="publisher" component="div" className="form-error" />

                  <button
                    type="submit"
                    className='btn-submit'>
                    Add New Entry
                  </button>
                </Form>
              </>
            )
          }}

        </Formik>
      </div>
    </>
  )
}

export default FormEntry
