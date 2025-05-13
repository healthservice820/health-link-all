
/**
 * Format a number as Nigerian Naira currency
 * @param amount The amount to format
 * @param options Intl.NumberFormatOptions to customize the formatting
 * @returns Formatted currency string with ₦ symbol
 */
export const formatNaira = (
  amount: number, 
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    ...options,
  }).format(amount);
};

/**
 * Format a number as currency with the default currency symbol ($)
 * @param amount The amount to format
 * @param options Intl.NumberFormatOptions to customize the formatting
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    ...options,
  }).format(amount);
};
