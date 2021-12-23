function useCurrencyFormatter(amount, currency) {
  if (amount > 1000) {
    const rounded = `${Math.round(amount / 1000)}k ${currency !== 'Contributor Credits' ? currency : ''} `;
    return { amount, rounded };
  }
  const rounded = `${Math.round(amount / 1)} ${currency !== 'Contributor Credits' ? (currency ? currency : '') : ''}  `;
  return { amount, rounded };
}

export default useCurrencyFormatter;
