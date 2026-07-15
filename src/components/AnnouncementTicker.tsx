"use client"

import { useEffect, useState } from "react"
import { FiBell, FiX } from "react-icons/fi"

interface Announcement {
  id: string
  title: string
  content: string
  priority: string
}

export default function AnnouncementTicker() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch("/api/announcements?active=true")
        if (res.ok) {
          const data = await res.json()
          setAnnouncements(data)
        }
      } catch {}
    }
    fetchAnnouncements()
  }, [])

  useEffect(() => {
    if (announcements.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [announcements.length])

  if (!isVisible || announcements.length === 0) return null

  const current = announcements[currentIndex]
  const priorityColors: Record<string, string> = {
    low: "bg-blue-600",
    normal: "bg-green-600",
    high: "bg-orange-500",
    urgent: "bg-red-600",
  }

  return (
    <div className={`${priorityColors[current.priority] || "bg-green-600"} text-white py-2 relative`}>
      <div className="container mx-auto px-4 flex items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <FiBell size={14} className="animate-bounce" />
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
            {current.priority === "urgent" ? "PENTING" : "INFO"}
          </span>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium truncate">
            <span className="font-bold">{current.title}</span>
            {" - "}
            <span className="opacity-90">{current.content}</span>
          </p>
        </div>
        {announcements.length > 1 && (
          <span className="text-xs opacity-75 shrink-0">
            {currentIndex + 1}/{announcements.length}
          </span>
        )}
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/20 rounded shrink-0"
        >
          <FiX size={14} />
        </button>
      </div>
    </div>
  )
}
