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
        it("should generate an entry with a negative value for Debits", () => {
            const entry = generateEntry({
                entryDate: new Date("1983-12-13"),
                amount: -1,
                category: "category",
                description: "description"
            });
            expect(entry)
                .to.be.a("string")
                .to.equal("12/13/1983,Debit,description,category,-1.00");
        });

        it("should generate an entry with a positive value for Deposits", () => {
            const entry = generateEntry({
                entryDate: new Date("1983-12-13"),
                amount: 1,
                category: "category",
                description: "description"
            });
            expect(entry)
                .to.be.a("string")
                .to.equal("12/13/1983,Dep,description,category,1.00");
        });
    });

    describe("#generateEntries", () => {
        it("should generate multiple entires with a negative value for Debits", () => {
            const frequencyOptions: FrequencyOptions = {
                frequency: "DAILY",
                start: new Date("1983-12-13"),
                end: new Date("1983-12-14")
            }
            const entryOptions = {
                amount: -1,
                category: "category",
                description: "description"
            };
            const entries = generateEntries({
                frequencyOptions,
                entryOptions
            });
            expect(entries)
                .to.be.an("array")
                .to.deep.equal([
                    "12/13/1983,Debit,description,category,-1.00",
                    "12/14/1983,Debit,description,category,-1.00"
                ]);
        });

        it("should generate multiple entires with a positive value for Deposits", () => {
            const frequencyOptions: FrequencyOptions = {
                frequency: "DAILY",
                start: new Date("1983-12-13"),
                end: new Date("1983-12-14")
            };
            const entryOptions = {
                amount: 1,
                category: "category",
                description: "description"
            };
            const entries = generateEntries({
                frequencyOptions,
                entryOptions
            });
            expect(entries)
                .to.be.an("array")
                .to.deep.equal([
                    "12/13/1983,Dep,description,category,1.00",
                    "12/14/1983,Dep,description,category,1.00"
                ]);
        });

        it("should generate entries for the year by default", () => {
            const frequencyOptions: FrequencyOptions = {
                frequency: "MONTHLY"
            };
            const entryOptions = {
                amount: 1,
                category: "category",
                description: "description"
            };
            const entries = generateEntries({
                frequencyOptions,
                entryOptions
            });
            expect(entries)
                .to.be.an("array")
                .to.have.length(12);
        });

    });

});