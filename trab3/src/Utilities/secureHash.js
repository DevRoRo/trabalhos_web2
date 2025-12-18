import bcrypt from 'bcrypt';

export class secureHash {
    
    constructor (hash) {
        this.hash = hash
    }

    getHash() {
        return this.hash
    }

    static async create(password, saltRounds) {
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            return new secureHash(hash);
        } catch (err) {
            console.error('Error hashing password:', err);
        }
    }

    async verifyPassword(plainPassword) {
        try {
            const match = await bcrypt.compare(plainPassword, this.hash);
            if (match) {
                return true;
            } else {;
                return false;
            }
        } catch (err) {
            console.error('Error verifying password:', err);
            return false;
        }
    }
}