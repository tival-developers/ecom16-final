// lib/utils/order.ts


export function generateOrderNumber(): string {
    const now = new Date()
  
    // YYYYMMDD
    const year  = now.getFullYear().toString()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day   = String(now.getDate()).padStart(2, '0')
  
    // HHMMSS
    const hours   = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
  
    // a four‐digit random number
    const randomSuffix = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  
    return `ORD-${year}${month}${day}-${hours}${minutes}${seconds}-${randomSuffix}`
  }
  