/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useRef } from "react"
import { Skeleton } from "antd"
import { useAuthStore } from "@/store/auth-store"
import { CallLogRow } from "./CallLogRow"
import { ChevronLeft, ChevronRight, PhoneCall } from "lucide-react"

interface CallLog {
  id: string
  agent: string
  date: string
  time: string
  transcription: string
  audioAvailable: boolean
  agentId: string
  businessId: string
  duration: number
  transcript?: string
  recordingUrl: string
  status: string
  createdAt: string
  updatedAt: string
}

interface RecentCallLogsProps {
  businessId?: string
}

const ITEMS_PER_PAGE = 10

export function RecentCallLogs({ businessId }: RecentCallLogsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { callLogs, loading, error, fetchVapiCallLogs } = useAuthStore()
  const fetchCalledRef = useRef<string | null>(null)

  useEffect(() => {
    if (businessId && fetchCalledRef.current !== businessId) {
      fetchCalledRef.current = businessId
      fetchVapiCallLogs(businessId, 50)
    }
  }, [businessId])

  const displayedLogs = callLogs
    .map((log: any) => ({
      ...log,
      agent: "AI Agent",
      date: new Date(log.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "2-digit",
      }),
      time: new Date(log.createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      audioAvailable: !!log.recordingUrl,
      transcription: log.transcript || "No transcription available",
    }))
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const totalPages = Math.ceil(callLogs.length / ITEMS_PER_PAGE)

  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Recent Call Logs</h2>
        <button className="text-sm text-blue-600 hover:underline">See all</button>
      </div>

      {/* LOADING STATE — Ant Design Skeleton */}
      {loading && (
        <div className="space-y-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton active paragraph={{ rows: 1 }} />
            </div>
          ))}
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="text-center py-10">
          <p className="text-sm text-red-500">Error loading call logs: {error}</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && callLogs.length === 0 && !error && (
        <div className="text-center py-16">
          <PhoneCall className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="text-sm text-slate-600">No call logs yet</p>
        </div>
      )}

      {/* TABLE */}
      {!loading && callLogs.length > 0 && (
        <>
          <div className="hidden md:grid grid-cols-5 bg-slate-50 p-3 rounded-md text-xs text-slate-600 font-semibold sticky top-0 border mb-3">
            <span>Agent</span>
            <span>Date</span>
            <span>Time</span>
            <span>Transcription</span>
            <span>Audio</span>
          </div>

          {/* Rows */}
          <div className="flex flex-col divide-y">
            {displayedLogs.map((log) => (
              <CallLogRow
                key={log.id}
                log={{
                  id: log.id,
                  agent: log.agent,
                  date: log.date,
                  time: log.time,
                  transcription: log.transcription,
                  audioAvailable: log.audioAvailable,
                }}
              />
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <p className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
