// utils/localStorage.ts

export const getAdminToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken")
  }
  return null
}

export const getVoterToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("voterToken")
  }
  return null
}
