import { Formik, Field, Form, ErrorMessage } from "formik"
import { useNavigate } from "react-router"
import { login } from "../lib/signin-api"

const Login = () => {
  const navigate = useNavigate()

  function validateEmail(value) {
    if (!value) {
      return "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return "Invalid email address"
    }
  }

  function validatePassword(value) {
    if (!value) return "Required"
    if (value.length < 6) {
      return "Min length is 6"
    }
  }

  return (
    <div>
      <div className='w-[450px] card bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title font-semibold text-3xl mb-4'>Sign In</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              await login(values)
              resetForm()
              navigate("/posts")
            }}>
            {({ isSubmitting }) => (
              <Form className='space-y-2'>
                <div>
                  <label className='block label-text' htmlFor='email'>
                    Email
                  </label>
                  <Field
                    id='firstName'
                    name='email'
                    placeholder='example@example.com'
                    className='input w-full input-bordered'
                    validate={validateEmail}
                  />
                  <ErrorMessage
                    name='email'
                    render={(msg) => (
                      <p className='text-red-400 mt-1 text-xs'>{msg}</p>
                    )}
                  />
                </div>
                <div>
                  <label className='block label-text' htmlFor='lastName'>
                    Password
                  </label>
                  <Field
                    id='password'
                    name='password'
                    placeholder=''
                    className='input w-full input-bordered'
                    type='password'
                    validate={validatePassword}
                  />
                  <ErrorMessage
                    name='password'
                    render={(msg) => (
                      <p className='text-red-400 mt-1 text-xs'>{msg}</p>
                    )}
                  />
                </div>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full !mt-4 btn btn-primary'>
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
export default Login
