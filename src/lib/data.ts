export const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12; // Convert 0-23 to 12-hour format
  const period = i < 12 ? 'am' : 'pm';
  return `${hour}:00 ${period}`;
});
