export type EntryType = 'Debit'|'Dep';

export type EntryBase = {
    description: String;
    category: String;
    amount: number;
};

export type EntryOptions = EntryBase & {
    entryDate: Date;
};

export type FrequencyOptions = {
    duration: string;
    start?: Date;
    end?: Date;
};

export type EntriesOptions = {
    frequencyOptions: FrequencyOptions;
    entryOptions: EntryBase;
};
