import { Rule, RuleOption } from "./rschedule";

export type EntryType = "Debit"|"Dep";

export type EntryOptionBase = {
    description: String;
    category: String;
    amount: number;
}

export type EntryOptions = EntryOptionBase & {
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
    entryOptions: EntryOptionBase;
};

export type Entry = {
    date: String;
    type: EntryType;
    description: String;
    category: String;
    amount: String;
};

const thisYear = new Date().getUTCFullYear();
const BOY = () => new Date(thisYear, 0, 1);
const EOY = () => new Date(thisYear, 11, 31); 

export const generateEntry = ({entryDate, description, category, amount}: EntryOptions): Entry => { 
    const type: EntryType = amount > 0 ? "Dep" : "Debit";
    const date = `${entryDate.getMonth()+1}/${entryDate.getDate()+1}/${entryDate.getFullYear()}`;
    return { 
        date, 
        type, 
        description, 
        category, 
        amount: amount.toFixed(2)
    };
};

export const generateEntries = ({
    frequencyOptions: { frequency, interval, byDayOfWeek, start = BOY(), end = EOY() },
    entryOptions
}: EntriesOptions): Entry[] => {

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
