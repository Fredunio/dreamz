import zxcvbn from 'zxcvbn'

export const passwordMeter = (password: string) => {
    const { score, feedback } = zxcvbn(password)
    const strength = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong']

    return {
        score,
        strength: strength[score],
        feedback: feedback.warning || feedback.suggestions[0],
    }
}
