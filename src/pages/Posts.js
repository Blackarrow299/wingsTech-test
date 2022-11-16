import { useEffect, useState } from "react"

import { redirect } from "react-router-dom"
import { isAuth } from "../lib/signin-api"

export async function loader() {
  const user = await isAuth()
  if (!user) {
    return redirect("/login")
  }
}

function Posts() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      await isAuth()
      setError(null)
      setLoading(true)
      const res = await fetch("https://jsonplaceholder.typicode.com/posts")
      if (!res.ok) {
        setError("Something went wrong")
      } else {
        const data = await res.json()
        setData(data)
      }

      setLoading(false)
    })()
  }, [])

  return (
    <div className='space-y-2'>
      <h2 className='text-4xl font-semibold mb-8'>Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-400'>{error}</p>}
      {data.map((data) => (
        <div
          key={data.id}
          className='card w-full bg-neutral text-neutral-content'>
          <div className='card-body'>
            <h2 className='card-title text-2xl'>{data.title}</h2>
            <p>{data.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Posts
