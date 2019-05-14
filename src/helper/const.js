const { host, protocol } = window.location

const API_URL = `${protocol}//${host}`
const API_BOOKS = 'https://api.jaxs.io/books'

export default {
  API_URL,
  API_BOOKS
}
