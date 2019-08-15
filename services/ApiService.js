const URI = 'http://localhost:3000'

export default {
  async getParties() {
    try {
      let response = await fetch(URI + '/parties')
      let jsonData = await response.json()
      return jsonData
    }
    catch (e) {
      console.log(e)
    }
  },

  async meet() {
    try {
      let response = await fetch(URI + '/meet')
      let jsonData = await response.json()
      return jsonData
    }
    catch (e) {
      console.log(e)
    }
  }
}