import argon2 from 'argon2'

export async function hashPassword(password: string) {
    try {
        // Generate a hash for the given password
        const hash = await argon2.hash(password)
        return hash
    } catch (error) {
        // Handle errors, e.g., invalid password
        console.error('Error hashing password:', error)
        throw error
    }
}

export async function verifyPassword(hash: string, enteredPassword: string) {
    try {
        // Verify the entered password against the hash
        const isPasswordValid = await argon2.verify(hash, enteredPassword)
        return isPasswordValid
    } catch (error) {
        // Handle errors, e.g., invalid hash or password
        console.error('Error verifying password:', error)
        throw error
    }
}
