import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const ToutuToken = 'Toutu-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 30 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setToutuToken(token) {
  return Cookies.set(ToutuToken, token, { expires: 365 })
}

export function getToutuToken() {
  return Cookies.get(ToutuToken)
}