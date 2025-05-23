export default function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    currencyDisplay: 'symbol',
    trailingZeroDisplay: 'auto',
    roundingIncrement: 10,
  }).format(amount)
}
