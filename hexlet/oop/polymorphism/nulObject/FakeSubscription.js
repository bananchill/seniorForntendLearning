export default class FakeSubscription {
    /**
     * @param {User} user
     * */
    constructor(user) {
        this.user = user;
    }

    hasPremiumAccess() {
        return this.user.isAdmin()
    }

    hasProfessionalAccess() {
        return this.user.isAdmin()
    }
}