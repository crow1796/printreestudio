export default {
  _extractUserdata(src){
    return {
      displayName: src.name,
      email: src.email,
      uid: src._id,
      roles: src.roles,
      token: src.token
    }
  },
  async createUserWithEmailAndPassword(formData, http){
    let response = {}
    try {
      let res = await http.post('/signup', formData)
      if(!res.data.status) throw res
      response = {
        status: true,
        user: this._extractUserdata({
          ...res.data.user,
          token: res.data.token
        })
      }
    } catch (error) {
      response.status = false
      response.message = error.data.err.message
    }
    if(!response.status) throw response
    return response
  },
  async socialLogin(type){
    let response = {}
    try {
      let provider = authProviderOf(type)
      let res = await fireAuth.signInWithPopup(provider)
      response = {
        status: true,
        user: await this._extractUserdata(res.user)
      }
    } catch (error) {
      response.status = false
      response.message = error.message
    }
    return response
  },
  async signInAsAGuest(){
    let response = {}
    try {
      let res = await fireAuth.signInAnonymously()
      response = {
        status: true,
        user: await this._extractUserdata(res.user)
      }
    } catch (error) {
      response.status = false
      response.message = error.message
    }
    return response
  },
  async sendPasswordRecoveryEmail(email){
    let response = {}
    try {
      let res = await fireAuth.sendPasswordResetEmail(email)
      response = {
        status: true
      }
    } catch (error) {
      response.status = false
      response.message = error.message
    }
    return response
  },
  async updateProfile(data){
    let response = {}
    try {
      await fireAuth.currentUser.updateProfile({
        displayName: data.displayName
      })
      await fireAuth.currentUser.updateEmail(data.email)
      response = {
        status: true
      }
    } catch (error) {
      response.status = false
      response.message = error.message
    }
    return response
  },
  async updatePassword(password){
    let response = {}
    try {
      let res = await fireAuth.currentUser.updatePassword(password)
      response = {
        status: true
      }
    } catch (error) {
      response.status = false
      response.message = error.message
    }
    return response
  }
}
