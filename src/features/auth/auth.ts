import { storage } from '../../services/storage/storage'

const KEY = 'studyflow:auth'

export type AuthUser = {
  name: string
}

export const auth = {
  get(): AuthUser | null {
    return storage.get<AuthUser>(KEY)
  },

  login(name: string) {
    storage.set<AuthUser>(KEY, { name })
  },

  logout() {
    storage.remove(KEY)
  },
}
