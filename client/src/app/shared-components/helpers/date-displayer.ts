export function formatDate(userDate: Date | string): IDateDisplayer {
  const date = new Date(userDate);
  const day = date.getDate();
  const month = date.toLocaleString('en-us', { month: 'long' });
  const year = date.getFullYear();

  const suffix = getDaySuffix(day);

  // return `${day}${suffix} ${month} ${year}`;
  return {
    day,
    suffix,
    month,
    year,
  } as IDateDisplayer;
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return 'th';
  }

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export interface IDateDisplayer {
  day: number;
  suffix: string;
  month: string;
  year: number;
}
