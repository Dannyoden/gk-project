export default function authHeader() {
    const storedUser = localStorage.getItem('user');
    let user = JSON.parse(storedUser ? storedUser : "");

    if (user && user.accessToken) {
        return 'Bearer ' + user.accessToken ;
    } else {
        return '';
    }
}
