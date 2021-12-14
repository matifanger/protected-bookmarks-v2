export const state = () => ({
    user: null,
    error: null,
})

// * STATE MODIFIERS
export const mutations = {
    ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
        // Do this:
        const { uid, email, emailVerified } = authUser
        state.user = { uid, email, emailVerified }
        console.log(state.user)
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
            this.$router.push('/')
          }).catch(error => {
            console.log(error)
            console.log(error.code)
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
          } )
      })

      },
}
