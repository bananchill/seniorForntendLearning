import FakeSubscription from './FakeSubscription.js';

class User {
    constructor(email, currentSubscription = null) {
        this.email = email;
       this.currentSubscription = currentSubscription ?? new FakeSubscription(this);
    }

    getCurrentSubscription() {
        return this.currentSubscription;
    }

    isAdmin() {
        return this.email === 'rakhim@hexlet.io';
    }
}

export default User;
