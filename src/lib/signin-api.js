export async function getData() {
  return await JSON.parse(localStorage.getItem("user"))
}

export async function setData(data) {
  const user = await JSON.stringify(data)
  localStorage.setItem("user", user)
}

export async function login(data) {
  await setData(data)
}

export async function logout() {
  const user = await getData()
  if (user) localStorage.removeItem("user")
}

export async function isAuth() {
  const user = await getData()
  console.log(user)
  if (!user || !user.email || !user.password) {
    return false
  }

  return true
}
