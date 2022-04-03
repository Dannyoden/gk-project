
export default function validateEmail(email: string | undefined) {
    if (email === undefined) {
        return false;
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}