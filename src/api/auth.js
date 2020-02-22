import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const AuthTokenKey = 'Authorization'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getAuthToken() {
  return Cookies.get(AuthTokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 15 })
}

export function setAuthToken(token) {
  return Cookies.set(AuthTokenKey, token, { expires: 15 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeAuthToken() {
  return Cookies.remove(AuthTokenKey)
}