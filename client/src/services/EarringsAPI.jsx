const API_BASE_URL = '/api'

const getAllEarrings = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/customearrings`, { method: 'GET' })
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText || 'Failed to fetch earrings')
        }
        return response.json()
    } catch (error) {
        console.error(error.message || 'Failed to fetch earrings')
    }
}

const getEarring = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/customearrings/${id}`, { method: 'GET' })
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText || `Failed to fetch earring ${id}`)
        }
        return response.json()
    } catch (error) {
        console.error(error.message || `Failed to fetch earring ${id}`)
    }
}

const createEarring = async (earringData) => {
    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(earringData),
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText || 'Failed to create earring')
        }

        return response.json()
    } catch (error) {
        console.error(error.message || 'Failed to create earring')
    }
}

const editEarring = async (id, earringData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(earringData),
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText || `Failed to update earring ${id}`)
        }

        return response.json()
    } catch (error) {
        console.error(error.message || `Failed to update earring ${id}`)
    }
}

const deleteEarring = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/edit/${id}`, { method: 'DELETE' })
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText || `Failed to delete earring ${id}`)
        }
        return response.json()
    } catch (error) {
        console.error(error.message || `Failed to delete earring ${id}`)
    }
}

export {
    getAllEarrings,
    getEarring,
    createEarring,
    editEarring,
    deleteEarring
}