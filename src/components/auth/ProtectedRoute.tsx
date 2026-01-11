"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { useSubscriptionStore } from "@/store/subscription-store"
import { LoadingOverlay } from "@/components/LoadingOverlay"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()

  const {
    user,
    business,
    loading,
    fetchUser,
    isHydrated,
    profileCompleted,
  } = useAuthStore()

  const {
    fetchBusinessSubscription,
    fetchSubscriptionStatus,
  } = useSubscriptionStore()

  const [isLoading, setIsLoading] = useState(true)
  const fetchUserCalledRef = useRef(false)

  useEffect(() => {
    const checkAuth = async () => {
      if (!isHydrated) return

      // 🔴 Not logged in
      if (!user) {
        router.replace("/login")
        return
      }

      // 🔄 Fetch user once
      if (!loading && !fetchUserCalledRef.current) {
        fetchUserCalledRef.current = true
        await fetchUser()
      }

      const isProfileComplete =
        profileCompleted ?? business?.isProfileCompleted ?? false

      // 🧭 Profile incomplete → force profile page
      if (!isProfileComplete && pathname !== "/dashboard/profile") {
        router.replace("/dashboard/profile")
        return
      }

      // ✅ Profile complete but still on profile page → go dashboard
      if (isProfileComplete && pathname === "/dashboard/profile") {
        router.replace("/dashboard")
        return
      }

      // 📦 Load subscription data (non-blocking)
      if (business?._id && !loading) {
        try {
          await fetchBusinessSubscription(business._id)
          await fetchSubscriptionStatus(business._id)
        } catch (err) {
          console.error("Subscription load failed", err)
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [
    isHydrated,
    user,
    pathname,
    loading,
    business?._id,
    profileCompleted,
    fetchBusinessSubscription,
    fetchSubscriptionStatus,
  ])

  if (isLoading) {
    return <LoadingOverlay isVisible message="Loading..." />
  }

  return <>{children}</>
}
