'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface AuthSession {
  userId: string
  name: string
  email: string
}

interface StoredUser {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

interface AuthResult {
  success: boolean
  message: string
}

interface AuthState {
  users: StoredUser[]
  session: AuthSession | null
  signUp: (payload: { name: string; email: string; password: string }) => AuthResult
  signIn: (payload: { email: string; password: string }) => AuthResult
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      session: null,
      signUp: ({ name, email, password }) => {
        const normalizedEmail = email.trim().toLowerCase()
        const existing = get().users.find((user) => user.email === normalizedEmail)

        if (existing) {
          return { success: false, message: 'An account already exists for this email.' }
        }

        const user: StoredUser = {
          id: crypto.randomUUID(),
          name: name.trim(),
          email: normalizedEmail,
          password,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          users: [...state.users, user],
          session: { userId: user.id, name: user.name, email: user.email },
        }))

        return { success: true, message: 'Account created successfully.' }
      },
      signIn: ({ email, password }) => {
        const normalizedEmail = email.trim().toLowerCase()
        const user = get().users.find(
          (candidate) =>
            candidate.email === normalizedEmail && candidate.password === password
        )

        if (!user) {
          return { success: false, message: 'Invalid email or password.' }
        }

        set({
          session: { userId: user.id, name: user.name, email: user.email },
        })

        return { success: true, message: 'Signed in successfully.' }
      },
      signOut: () => set({ session: null }),
    }),
    {
      name: 'discover-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

