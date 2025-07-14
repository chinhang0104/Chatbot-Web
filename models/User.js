const bcrypt = require('bcryptjs');

// In a real application, this would connect to a database
const users = [
    {
        id: 1,
        username: 'admin',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password: 'password'
    }
];

class User {
    static async findByUsername(username) {
        return users.find(user => user.username === username);
    }

    static async create(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = {
            id: users.length + 1,
            username: userData.username,
            password: hashedPassword
        };
        users.push(newUser);
        return newUser;
    }
}

module.exports = User;
