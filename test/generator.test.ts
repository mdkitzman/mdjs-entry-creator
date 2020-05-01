import * as chai from "chai";
import { DateTime } from "luxon";

import {
    generateEntry,
    generateEntries,
    FrequencyOptions
} from "../src/generator";

const { expect } = chai;

describe("Unit Tests", () => {

    describe("#gernateEntry", () => {
        it("should generate an entry", () => {
            const entry = generateEntry({
                entryDate: new Date("1983-12-13"),
                amount: -1,
                category: "category",
                description: "description"
            });
            expect(entry)
                .to.be.an("object")
                .to.deep.equal({
                    date:"12/13/1983", 
                    type: "Debit", 
                    description: "description", 
                    category: "category", 
                    amount:"-1.00"
                });
        })

        it("should generate an entry with a negative value for Debits", () => {
            const entry = generateEntry({
                entryDate: new Date("1983-12-13"),
                amount: -1,
                category: "category",
                description: "description"
            });
            expect(entry)
                .to.be.an("object");                
            expect(entry.type).to.equal("Debit");
            expect(entry.amount).to.equal("-1.00");
        });

        it("should generate an entry with a positive value for Deposits", () => {
            const entry = generateEntry({
                entryDate: new Date("1983-12-13"),
                amount: 1,
                category: "category",
                description: "description"
            });
            expect(entry)
                .to.be.an("object");                
            expect(entry.type).to.equal("Dep");
            expect(entry.amount).to.equal("1.00");
        });
    });

    describe("#generateEntries", () => {
        const entryOptions = {
            amount: -1,
            category: "category",
            description: "description"
        };

        it("should generate 2 entries given a daily frequency and a 2 day range.", () => {
            const frequencyOptions: FrequencyOptions = {
                frequency: "DAILY",
                start: new Date("1983-12-13"),
                end: new Date("1983-12-14")
            }
            const entries = generateEntries({
                frequencyOptions,
                entryOptions
            });
            expect(entries)
                .to.be.an("array");
            
            const dates = entries.map(e => e.date);
            expect(dates).to.deep.equal(["12/13/1983", "12/14/1983"]);                
        });

        it("should generate 1 entry given a weekly frenquency with a 2 day range", () => {
            const frequencyOptions: FrequencyOptions = {
                frequency: "WEEKLY",
                start: new Date("1983-12-13"),
                end: new Date("1983-12-14")
            };
            const entries = generateEntries({
                frequencyOptions,
                entryOptions
            });
            expect(entries)
                .to.be.an("array");
            
            const dates = entries.map(e => e.date);
            expect(dates).to.deep.equal(["12/13/1983"]);  
        });

        it("should generate entries for the year by default", () => {
            const frequencyOptions: FrequencyOptions = {
                frequency: "MONTHLY"
            };
            const entries = generateEntries({
                frequencyOptions,
                entryOptions
            });
            expect(entries)
                .to.be.an("array")
                .to.have.length(12);
        });

        it("should generate entries starting in the beginning of the year", () => {
            const currentYear = new Date().getFullYear();
            const frequencyOptions: FrequencyOptions = {
                frequency: "MONTHLY",
                end: new Date(`${currentYear}-04-02`) // April 1st
            };
            const entries = generateEntries({
                frequencyOptions,
                entryOptions
            });
            expect(entries)
                .to.be.an("array")
                .to.have.length(4);
        });

    });

});