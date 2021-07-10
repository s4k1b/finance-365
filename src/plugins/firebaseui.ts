import { useFirebaseAuth } from './firebase'
import * as firebaseui from 'firebaseui'

const { firebaseAuth, signInOptions } = useFirebaseAuth()

const ui = new firebaseui.auth.AuthUI(firebaseAuth)

interface FirebaseUI {
  ui: typeof ui
  startUi: (s: string) => void
}

export function useFirebaseUi(): FirebaseUI {
  function startUi(selector: string): void {
    ui.start(selector, {
      callbacks: {
        signInSuccessWithAuthResult: function () {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false
        },
      },
      signInFlow: 'popup',
      signInOptions,
    })
  }
  return {
    ui,
    startUi,
  }
}
