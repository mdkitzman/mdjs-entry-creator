import createPeriod from 'date-period';

import { EntriesOptions, EntryOptions, EntryType } from './types';

const thisYear = new Date().getUTCFullYear();
const BOY = () => new Date(thisYear, 0, 1);
const EOY = () => new Date(thisYear, 11, 31);

export const generateEntry = ({ entryDate, description, category, amount }: EntryOptions): String => {
  const type: EntryType = amount > 0 ? 'Dep' : 'Debit';
  const dateStr = `${entryDate.getMonth() + 1}/${entryDate.getDate() + 1}/${entryDate.getFullYear()}`;
  return [dateStr, type, description, category, amount.toFixed(2)].join(',');
};

export const generateEntries = ({
  frequencyOptions: { duration, start = BOY(), end = EOY() },
  entryOptions
}: EntriesOptions): String[] => {
  end.setTime(end.getTime() + 1);
  return createPeriod({ start, duration, end })
    .map((date: Date) => generateEntry({ entryDate: date, ...entryOptions }));
};
