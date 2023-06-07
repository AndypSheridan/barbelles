import { rest } from "msw"

const baseURL = 'https://barbelles-api.herokuapp.com/'

export const handlers = [
    rest.get(`${baseURL}dj-rest/auth/user/`)
]