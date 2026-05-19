"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FiClock, FiCalendar, FiUsers, FiArrowRight } from "react-icons/fi"

interface PPDBSettings {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  isActive: boolean
  registrationUrl?: string | null
  whatsappNumber?: string | null
  quota: number
  year: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function PPDBCountdown({ settings }: { settings: PPDBSettings }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [status, setStatus] = useState<"upcoming" | "ongoing" | "ended">("upcoming")

  useEffect(() => {
    function calculateTime() {
      const now = new Date().getTime()
      const start = new Date(settings.startDate).getTime()
      const end = new Date(settings.endDate).getTime()

      if (now < start) {
        // Countdown to start
        setStatus("upcoming")
        const diff = start - now
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        })
      } else if (now >= start && now <= end) {
        // Ongoing - countdown to end
        setStatus("ongoing")
        const diff = end - now
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        })
      } else {
        setStatus("ended")
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [settings.startDate, settings.endDate])

  const statusConfig = {
    upcoming: {
      badge: "Segera Dibuka",
      badgeColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
      subtitle: "Pendaftaran akan dibuka dalam",
      gradientFrom: "from-amber-500",
      gradientTo: "to-orange-600",
    },
    ongoing: {
      badge: "Sedang Berlangsung",
      badgeColor: "bg-green-100 text-green-700 border-green-200",
      subtitle: "Pendaftaran ditutup dalam",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-600",
    },
    ended: {
      badge: "Telah Ditutup",
      badgeColor: "bg-red-100 text-red-700 border-red-200",
      subtitle: "Pendaftaran telah berakhir",
      gradientFrom: "from-gray-500",
      gradientTo: "to-gray-600",
    },
  }

  const config = statusConfig[status]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className={`inline-flex items-center gap-2 ${config.badgeColor} border rounded-full px-4 py-1.5 mb-4`}>
              <span className="w-2 h-2 bg-current rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">{config.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{settings.title}</h2>
            <p className="text-gray-600">{settings.description}</p>
          </div>

          {/* Countdown Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/5 border border-white/50 p-8 md:p-10">
            {status !== "ended" && (
              <>
                <p className="text-center text-gray-500 text-sm mb-6 font-medium">{config.subtitle}</p>

                {/* Timer */}
                <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto mb-10">
                  <CountdownUnit value={timeLeft.days} label="Hari" />
                  <CountdownUnit value={timeLeft.hours} label="Jam" />
                  <CountdownUnit value={timeLeft.minutes} label="Menit" />
                  <CountdownUnit value={timeLeft.seconds} label="Detik" />
                </div>
              </>
            )}

            {status === "ended" && (
              <div className="text-center py-6 mb-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiClock className="text-gray-400" size={28} />
                </div>
                <p className="text-gray-500 text-lg">Periode pendaftaran telah berakhir.</p>
                <p className="text-gray-400 text-sm mt-1">Nantikan informasi PPDB periode berikutnya.</p>
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-2xl p-4 text-center hover:bg-green-50 transition-colors duration-300">
                <FiCalendar className="mx-auto text-green-600 mb-2" size={20} />
                <p className="text-xs text-gray-500 mb-0.5">Mulai</p>
                <p className="text-sm font-semibold text-gray-800">
                  {new Date(settings.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 text-center hover:bg-red-50 transition-colors duration-300">
                <FiCalendar className="mx-auto text-red-500 mb-2" size={20} />
                <p className="text-xs text-gray-500 mb-0.5">Berakhir</p>
                <p className="text-sm font-semibold text-gray-800">
                  {new Date(settings.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 text-center hover:bg-blue-50 transition-colors duration-300">
                <FiUsers className="mx-auto text-blue-600 mb-2" size={20} />
                <p className="text-xs text-gray-500 mb-0.5">Kuota</p>
                <p className="text-sm font-semibold text-gray-800">{settings.quota} Siswa</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/ppdb"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3.5 rounded-2xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Info Lengkap PPDB <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              {settings.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-2xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Hubungi via WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-3 md:p-5 shadow-lg group hover:from-green-800 hover:to-green-900 transition-all duration-500">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-emerald-400/0 group-hover:from-green-400/10 group-hover:to-emerald-400/10 rounded-2xl transition-all duration-500"></div>
        <span className="relative text-2xl md:text-4xl font-bold text-white tabular-nums block">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs md:text-sm text-gray-500 mt-2 block font-medium">{label}</span>
    </div>
  )
}
