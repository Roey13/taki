export const landingsService = {
    getLandings,
    getLandingById,
    getRocketById,
    getLaunchpadById
}

async function getLandings() {
    const api = `https://api.spacexdata.com/v4/launches`
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(api)
            const item = await response.json()
            return res(item)
        } catch (err) {
            return rej(err)
        }
    })
}

async function getLandingById(id) {
    const api = `https://api.spacexdata.com/v4/launches/${id}`
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(api)
            const item = await response.json()
            return res(item)
        } catch (err) {
            return rej(err)
        }
    })
}

async function getRocketById(id) {
    const api = `https://api.spacexdata.com/v4/rockets/${id}`
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(api)
            const item = await response.json()
            return res(item)
        } catch (err) {
            return rej(err)
        }
    })
}

async function getLaunchpadById(id) {
    const api = `https://api.spacexdata.com/v4/launchpads/${id}`
    return new Promise(async (res, rej) => {
        try {
            const response = await fetch(api)
            const item = await response.json()
            return res(item)
        } catch (err) {
            return rej(err)
        }
    })
}