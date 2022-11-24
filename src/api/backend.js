const url = 'http://localhost:8080';//"http://samuele.ddns.net:8080";
const loginUrl = `${url}/authenticate`;
const dataUrl = `${url}/api/data`;
const dataFrequencyUrl = `${url}/api/datacount`;

export async function login(username, password) {
    let data = {
        username: username,
        password: password
    };
    return await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
export async function getData() {
    return await fetch(dataUrl, {
        method: 'GET',
        credentials: 'include',
    });
}
export async function getDataFrequency() {
    return await fetch(dataFrequencyUrl, {
        method: 'GET',
        credentials: 'include',
    });
}