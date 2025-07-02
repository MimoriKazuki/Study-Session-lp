'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface StudySession {
  id: string
  subject: string
  startTime: Date
  endTime?: Date
  duration: number
}

interface TimerState {
  isRunning: boolean
  startTime: number | null
  elapsedTime: number
}

export default function StudyTracker() {
  const [currentSubject, setCurrentSubject] = useState('')
  const [timer, setTimer] = useState<TimerState>({
    isRunning: false,
    startTime: null,
    elapsedTime: 0
  })
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    const savedSessions = localStorage.getItem('studySessions')
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined
      })))
    }
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (timer.isRunning && timer.startTime) {
      intervalId = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          elapsedTime: Date.now() - prev.startTime!
        }))
      }, 100)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [timer.isRunning, timer.startTime])

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const startTimer = useCallback(() => {
    if (!currentSubject.trim()) {
      alert('科目を入力してください')
      return
    }

    setTimer({
      isRunning: true,
      startTime: Date.now(),
      elapsedTime: 0
    })
  }, [currentSubject])

  const stopTimer = useCallback(() => {
    if (timer.startTime) {
      const newSession: StudySession = {
        id: Date.now().toString(),
        subject: currentSubject,
        startTime: new Date(timer.startTime),
        endTime: new Date(),
        duration: timer.elapsedTime
      }

      const updatedSessions = [...sessions, newSession]
      setSessions(updatedSessions)
      localStorage.setItem('studySessions', JSON.stringify(updatedSessions))

      setTimer({
        isRunning: false,
        startTime: null,
        elapsedTime: 0
      })
      setCurrentSubject('')
    }
  }, [currentSubject, timer.startTime, timer.elapsedTime, sessions])

  const getTodayStats = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todaySessions = sessions.filter(session => {
      const sessionDate = new Date(session.startTime)
      sessionDate.setHours(0, 0, 0, 0)
      return sessionDate.getTime() === today.getTime()
    })

    const totalTime = todaySessions.reduce((acc, session) => acc + session.duration, 0)
    const subjectTime = todaySessions.reduce((acc, session) => {
      if (!acc[session.subject]) acc[session.subject] = 0
      acc[session.subject] += session.duration
      return acc
    }, {} as Record<string, number>)

    return { totalTime, subjectTime, sessionCount: todaySessions.length }
  }

  const stats = getTodayStats()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          学習時間トラッカー
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              科目
            </label>
            <input
              type="text"
              value={currentSubject}
              onChange={(e) => setCurrentSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="例: 数学、英語、プログラミング"
              disabled={timer.isRunning}
            />
          </div>

          <div className="text-center mb-6">
            <div className="text-6xl font-mono font-bold text-gray-800 mb-4">
              {formatTime(timer.elapsedTime)}
            </div>
            
            {!timer.isRunning ? (
              <button
                onClick={startTimer}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                開始
              </button>
            ) : (
              <button
                onClick={stopTimer}
                className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                停止
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">今日の統計</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">総学習時間</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatTime(stats.totalTime)}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">セッション数</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.sessionCount}回
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">科目数</p>
              <p className="text-2xl font-bold text-purple-600">
                {Object.keys(stats.subjectTime).length}科目
              </p>
            </div>
          </div>

          {Object.keys(stats.subjectTime).length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">科目別時間</h3>
              <div className="space-y-2">
                {Object.entries(stats.subjectTime).map(([subject, time]) => (
                  <div key={subject} className="flex justify-between items-center">
                    <span className="text-gray-600">{subject}</span>
                    <span className="font-medium">{formatTime(time)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">学習履歴</h2>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              {showHistory ? '非表示' : '表示'}
            </button>
          </div>

          {showHistory && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {sessions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  まだ学習記録がありません
                </p>
              ) : (
                [...sessions].reverse().map((session) => (
                  <div
                    key={session.id}
                    className="border-b border-gray-200 pb-2 last:border-0"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{session.subject}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          {session.startTime.toLocaleDateString('ja-JP')}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono">
                          {formatTime(session.duration)}
                        </span>
                        <div className="text-xs text-gray-500">
                          {session.startTime.toLocaleTimeString('ja-JP', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {' - '}
                          {session.endTime?.toLocaleTimeString('ja-JP', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}