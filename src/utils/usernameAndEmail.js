const usernameAndEmail = (v) => {
  const isEmail = /^(?!.*[-.]{2})[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-zA-Z]+$/.test(
    v
  )
  const isUsername = /^[a-z0-9_-]{4,255}$/.test(v)

  if (!isUsername && !isEmail) {
    return 'Ô này phải là tên tài khoản hoặc email'
  }

  return null
}
export default usernameAndEmail