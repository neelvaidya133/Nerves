import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDate, formatDistanceToNowStrict } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeDate(from: Date){
  const current = new Date()

  if(current.getTime() - from.getTime() < 24 * 60 * 60 * 1000){
    return formatDistanceToNowStrict(from, { addSuffix: true })
  }{
    if(current.getFullYear() === from.getFullYear()){
      return formatDate(from, "MMM d, yyy")
  }


}
}

export function formateNumber(n: number): string{
  return Intl.NumberFormat("en-US",{
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n)
  
}