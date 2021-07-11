import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Store } from 'vuex'
import { RootState } from '../typings/store/state'

const firebaseConfig = {
  apiKey: 'AIzaSyBcWQbCLCZTmnIlV4UMBn8jzvgloPrUdvA',
  authDomain: 'my-finance-365.firebaseapp.com',
  projectId: 'my-finance-365',
  storageBucket: 'my-finance-365.appspot.com',
  messagingSenderId: '498867033749',
  appId: '1:498867033749:web:7b4335a0e764b8fc0f2d9c',
  measurementId: 'G-V7RXX2JYHB',
}

export function initializeFirebase(): void {
  firebase.initializeApp(firebaseConfig)
}

export function initializeFirebaseAuth(): void {
  // attach firebase auth observer
}

type FirebaseAuth = {
  firebaseAuth: firebase.auth.Auth
  signInOptions: Array<string>
  userUnwatcher: () => void
  signInObserver: (store: Store<RootState>) => void
}
export function useFirebaseAuth(): FirebaseAuth {
  const firebaseAuth = firebase.auth()
  const signInOptions = [
    // List of OAuth providers supported.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ]

  let userUnwatcher: () => void = () => {
    return
  }

  const signInObserver = (store: Store<RootState>) => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // save to firestore
        const { fireStore } = useFireStore()

        const {
          displayName: name,
          email,
          uid: id,
          photoURL: profilePicUrl,
        } = user

        try {
          fireStore
            .collection('users')
            .doc(id)
            .set({ name, email, id, profilePicUrl }, { merge: true })
        } catch (e) {
          console.log(e)
        }

        // attatch listener to user document
        try {
          userUnwatcher = fireStore
            .collection('users')
            .doc(id)
            .onSnapshot((doc) => {
              store.dispatch('user', doc.data())
            })
        } catch (e) {
          console.log(e)
        }
      } else {
        console.log('user not signed in')
      }
    })
  }

  return {
    firebaseAuth,
    signInOptions,

    userUnwatcher,
    signInObserver,
  }
}

type FireStore = {
  fireStore: firebase.firestore.Firestore
}

export function useFireStore(): FireStore {
  const fireStore = firebase.firestore()

  return {
    fireStore,
  }
}
