const backendDomain = 'http://localhost:3000'
const backendRegisterDomain = `${backendDomain}/register`

export const endpoints = {
    signUp: {
        url: `${backendRegisterDomain}/signup`,
        method: 'POST'
    },
    login : {
        url: `${backendRegisterDomain}/login`,
        method: 'POST'
    },
    user: {
        url: `${backendDomain}`,
        method: 'GET' 
    }
}