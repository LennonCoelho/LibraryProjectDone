const { host, protocol } = window.location

const API_URL = `${protocol}//${host}`
const API_VIACEP = 'https://viacep.com.br/ws'

export default {
  API_URL,
  API_VIACEP
}
