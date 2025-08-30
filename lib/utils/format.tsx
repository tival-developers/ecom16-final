// utils/format.tsx

  interface PriceProps {
    amount: number
  }
  
  export default function Price({ amount }: PriceProps) {
    // Format number with commas and prefix Ksh
    const formatted = new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  
    return <span>{formatted}</span>
  }
  