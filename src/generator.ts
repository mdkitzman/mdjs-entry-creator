import { Rule, RuleOption } from "./rschedule";

export type EntryType = "Debit"|"Dep";

export type EntryBase = {
    description: String;
    category: String;
    amount: number;
}

export type EntryOptions = EntryBase & {
    entryDate: Date;
};

export type FrequencyOptions = {
    frequency: RuleOption.Frequency;
    interval?: RuleOption.Interval;
    byDayOfWeek?: RuleOption.ByDayOfWeek[];
    start?: Date;
    end?: Date;
}

export type EntriesOptions = {
    frequencyOptions: FrequencyOptions;
    entryOptions: EntryBase;
};

const thisYear = new Date().getUTCFullYear();
const BOY = () => new Date(thisYear, 0, 1);
const EOY = () => new Date(thisYear, 11, 31); 

export const generateEntry = ({entryDate, description, category, amount}: EntryOptions): String => { 
    const type: EntryType = amount > 0 ? "Dep" : "Debit";
    const dateStr = `${entryDate.getMonth()+1}/${entryDate.getDate()+1}/${entryDate.getFullYear()}`;
    return [dateStr,type,description,category,amount.toFixed(2)].join(',');
};

export const generateEntries = ({
    frequencyOptions: { frequency, interval, byDayOfWeek, start = BOY(), end = EOY() },
    entryOptions
}: EntriesOptions): String[] => {

    const rule = new Rule({
        frequency,
        interval,
        byDayOfWeek,
        start,
        end
    });
      
    const entries = rule
        .occurrences()
        .toArray()
        .map( ({ date }) => {
            return generateEntry( {entryDate:date, ...entryOptions });
        });
    return entries;
};
