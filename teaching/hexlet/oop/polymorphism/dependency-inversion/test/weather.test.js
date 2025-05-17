import { execSync } from 'child_process';
import { URL } from 'url';
import path from 'path';
import { describe, expect, test } from "@jest/globals";

describe("weather", () => {
    const pathToConfigs = path.join('hexlet/oop/polymorphism/dependency-inversion/bin/weather.js');
    test('berlin', () => {
        const expected = expect.stringMatching(/Temperature in berlin: \d+C/);
        const actual = execSync(`node ${ pathToConfigs } berlin`).toString();
        expect(actual).toEqual(expected);
    });

    test('monaco', () => {
        const expected = expect.stringMatching(/Temperature in monaco: \d+C/);
        const actual = execSync(`node ${ pathToConfigs } monaco`).toString();
        expect(actual).toEqual(expected);
    });
})
