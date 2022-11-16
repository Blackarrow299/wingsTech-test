import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { isAuth, logout } from "../lib/signin-api"
import { useNavigate } from "react-router-dom"
function Layout() {
  let location = useLocation()
  const [auth, setAuth] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    ;(async () => {
      setAuth(await isAuth())
    })()
  }, [location])
  return (
    <>
      <div className='navbar bg-base-200 items-center justify-center'>
        <Link className='btn btn-ghost normal-case text-xl' to={"/"}>
          YG
        </Link>

        <div className='navbar-end'>
          {auth ? (
            <>
              <Link
                className='mr-2 btn btn-accent normal-case text-xl'
                to={"/posts"}>
                Posts
              </Link>
              <button
                onClick={async () => {
                  await logout()
                  setAuth(false)
                  navigate("/login")
                }}
                className='btn'>
                Logout
              </button>
            </>
          ) : (
            <Link className='btn btn-primary' to={"/login"}>
              Login
            </Link>
          )}
        </div>
      </div>
      <main className='w-screen flex items-center flex-col'>
        <div className='sm:w-[40%] w-[80%] flex items-center flex-col pt-8'>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Layout
