export const state = () => ({
    user: null,
    userData: null,
    isUserReady: false
})

// * STATE MODIFIERS
export const mutations = {
    ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
        // * I dont think this is really necessary.
        // Do this:
        //const { uid, email, emailVerified } = authUser
        //state.user = { uid, email, emailVerified }
    },

    clearUserData(state){
      state.isUserReady = false
      state.userData = null
  },

  setUserData(state, payload){
      state.userData = payload
      state.isUserReady = true
  },

    SET_USER(state, payload) {
        state.user = JSON.parse(JSON.stringify(payload));
      },

    SET_ERROR(state, payload) {
        state.error = JSON.parse(JSON.stringify(payload));
      },
}

// ! FUNCTIONS
export const actions = { 

  async nuxtServerInit({ commit }, { res }) {
    if (res && res.locals && res.locals.user) {
        const { ...authUser } = res.locals.user
        commit('onAuthStateChangedMutation', { authUser })
    }
},

async onAuthStateChangedAction({commit}, {authUser}){
    if (!authUser) {
        commit('clearUserData')
    } else {
        try{
            const userRef = await this.$fire.firestore.collection('users').doc(authUser.uid).get()
            const userData = await userRef.data()
            commit('setUserData', userData)
        }
        catch(e){
            console.log(e)
        }
    }
},

  throwMessage({ commit }, [error, type] ) {
      this.$swal.fire({
        icon: type,
        title: `<h5 style='color:white'> ${error} </h5>`,
        background: '#282B39',
    })
  },

  loginUser({ commit }, user) {
    return new Promise ((resolve, reject) => {
      console.log(user.email, user.password)

      this.$fireModule.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {

          //dispatch('getUserDB', res.user.uid)
          
          console.log(res)
          commit('SET_USER', res.user)
          resolve()
          this.$router.push('/app')
          // this.$router.push('app.localhost:3000')
          //window.location.href = 'app.protectedbookmarks.com'

        }).catch(error => {
          console.log(error)
          console.log(error.code)
          reject(error.message)
          // switch (error.code) {
          //   case "auth/weak-password":
          //     reject('Password should be at least 6 characters.');
          //   case "auth/invalid-email":
          //     reject('The email address is badly formatted.');
          //   case "auth/email-already-in-use":
          //     reject('The email address is already in use by another account.');
          //   default:
          //     reject('Something happened. Try again later.');
          // }
        } )
    })
    },

    logOut({ commit }) {
      return new Promise ((resolve, reject) => {
        this.$fireModule.auth().signOut().then(() => {
          var user = {}
          commit('SET_USER', user)
          this.$router.push('/')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    registerUser({ commit }, user) {
      return new Promise ((resolve, reject) => {
        console.log(user.email, user.password)
        this.$fireModule.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(res => {
            console.log(res)
            const userCreated = {
              email: res.user.email,
              uid: res.user.uid
            }
            var docRef = this.$fire.firestore.collection('users').doc(res.user.uid);
            docRef.set({
              userid: res.user.uid,
              email: res.user.email,
              }).then(
              this.$fireModule.auth().currentUser.sendEmailVerification()
              .then(
                console.log('EmailVerificationSended')
              )
            )
            commit('SET_USER', userCreated)
            resolve()
            this.$router.push('/app')
           //  window.location.href = 'app.protectedbookmarks.com'

          }).catch(error => {
            switch (error.code) {
              case "auth/weak-password":
                reject('Password should be at least 6 characters.');
              case "auth/invalid-email":
                reject('The email address is badly formatted.');
              case "auth/email-already-in-use":
                reject('The email address is already in use by another account.');
              default:
                reject('Something happened. Try again later.');
            }
          })
      })

      },
}
