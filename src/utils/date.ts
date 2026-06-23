export function parseUTCDate(dateInput: string | number | Date): Date {
  if (!dateInput) return new Date();
  if (dateInput instanceof Date) return dateInput;
  if (typeof dateInput === 'number') return new Date(dateInput);
  
  let timeStr = dateInput;
  if (typeof timeStr === 'string') {
    if (!timeStr.includes('T') && timeStr.includes(' ')) {
      timeStr = timeStr.replace(' ', 'T');
    }
    if (!timeStr.endsWith('Z') && !timeStr.includes('+')) {
      timeStr = `${timeStr}Z`;
    }
  }
  return new Date(timeStr);
}

export function formatThaiDate(date: Date | string | number): string {
  const d = parseUTCDate(date);
  return d.toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok", year: "numeric", month: "short", day: "numeric" });
}

export function formatThaiTime(date: Date | string | number): string {
  const d = parseUTCDate(date);
  return d.toLocaleTimeString("th-TH", { timeZone: "Asia/Bangkok", hour: "2-digit", minute: "2-digit" });
}

export function formatThaiDateTime(date: Date | string | number): string {
  return `${formatThaiDate(date)} ${formatThaiTime(date)}`;
}
