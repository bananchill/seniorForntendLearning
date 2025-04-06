import Guest from '../Guest.js';
import User from '../User.js';
import getGreeting from '../helpers.js';
import { expect, it } from "@jest/globals";

it('getGreeting', () => {
    const guest = new Guest();
    expect(getGreeting(guest)).toBe('Nice to meet you Guest!');

    const user1 = new User('Petr');
    expect(getGreeting(user1)).toBe('Hello Petr!');

    const user2 = new User('Mark');
    expect(getGreeting(user2)).toBe('Hello Mark!');

    const user3 = new User('Guest');
    expect(getGreeting(user3)).toBe('Hello Guest!');
});
