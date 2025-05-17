const mapping = {
    guest: (guest) => `Nice to meet you ${guest.getName()}!`,
    user: (user) => `Hello ${user.getName()}!`,
};

export default (someUser) => (
    mapping[someUser.getTypeName()](someUser)
);