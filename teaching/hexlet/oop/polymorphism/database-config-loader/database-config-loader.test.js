import { describe, expect, it } from "@jest/globals";
import path from "path";
import DatabaseConfigLoader from "./database-config-loader";

describe('DatabaseConfigLoader', () => {
    const pathToConfigs = path.join('__fixtures__');
    const loader = new DatabaseConfigLoader(pathToConfigs);

    it('load 1', () => {
        const expected = {
            host: 'google.com',
            username: 'postgres',
        };
        expect(loader.load('production')).toEqual(expected);
    });

    it('load 2', () => {
        const expected = {
            username: 'mysupername',
        };
        expect(loader.load('custom')).toEqual(expected);
    });

    it('load with extend', () => {
        const expected = {
            host: 'localhost',
            username: 'postgres',
            port: 5000,
        };
        expect(loader.load('development')).toEqual(expected);
    });

    it('load with deep extend', () => {
        const expected = {
            host: 'dev.server',
            username: 'postgres',
            port: 5000,
            password: 'admin',
        };
        expect(loader.load('preproduction')).toEqual(expected);
    });
});
