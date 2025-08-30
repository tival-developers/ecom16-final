'use client'
import React, { useEffect, useState } from 'react'
import { differenceInSeconds, intervalToDuration, isBefore } from 'date-fns'

interface CountdownTimerProps {
  startAt?: Date | string
  endAt?: Date | string
}

export default React.memo(function CountdownTimer({
  startAt,
  endAt,
}: CountdownTimerProps) {
  const [durationStr, setDurationStr] = useState('')
  const [percentElapsed, setPercentElapsed] = useState(0)
  const [timeColor, setTimeColor] = useState('text-green-600')

  useEffect(() => {
    // Convert safely
    const startDate = startAt ? new Date(startAt) : null
    const endDate = endAt ? new Date(endAt) : null

    // If invalid, show placeholder
    if (
      !startDate ||
      isNaN(startDate.getTime()) ||
      !endDate ||
      isNaN(endDate.getTime())
    ) {
      setDurationStr('Loading countdown...')
      setPercentElapsed(0)
      setTimeColor('text-gray-400')
      return
    }

    const updateCountdown = () => {
      const now = new Date()

      if (isBefore(now, startDate)) {
        const diff = intervalToDuration({ start: now, end: startDate })
        setDurationStr(
          `Starts in: ${diff.days ?? 0}d ${diff.hours ?? 0}h ${
            diff.minutes ?? 0
          }m ${diff.seconds ?? 0}s`
        )
        setPercentElapsed(0)
        setTimeColor('text-blue-600')
        return
      }

      if (isBefore(endDate, now)) {
        setDurationStr('Ended')
        setPercentElapsed(100)
        setTimeColor('text-gray-500')
        return
      }

      const totalSeconds = Math.max(differenceInSeconds(endDate, startDate), 1)
      const remainingSeconds = Math.max(differenceInSeconds(endDate, now), 0)
      const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100

      const diff = intervalToDuration({ start: now, end: endDate })
      setDurationStr(
        `${diff.days ?? 0}d ${diff.hours ?? 0}h ${diff.minutes ?? 0}m ${
          diff.seconds ?? 0
        }s`
      )

      if (remainingSeconds <= 0) setTimeColor('text-gray-500')
      else if (remainingSeconds < 3600) setTimeColor('text-red-600')
      else if (remainingSeconds < 86400) setTimeColor('text-yellow-600')
      else setTimeColor('text-green-600')

      setPercentElapsed(progress)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [startAt, endAt])

  return (
    <div className='space-y-1'>
      <span className={`font-mono text-sm ${timeColor}`}>{durationStr}</span>
      <div className='h-1 bg-gray-200 rounded'>
        <div
          className='h-full bg-gradient-to-r from-green-400 to-red-500 rounded'
          style={{ width: `${percentElapsed}%`, transition: 'width 1s linear' }}
        />
      </div>
    </div>
  )
})
