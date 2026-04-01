import { pool } from '../config/database.js'

// GET /customearrings - get all earrings
const getAllEarrings = async (req, res) => {
    try {
        const query = 'SELECT * FROM CustomItems'
        const result = await pool.query(query)
        return res.status(200).json(result.rows)
    }
    catch (error) {
        return res.status(500).json({ error: `Failed to fetch earrings: ${error}` })
    }
}

// GET /customearrings/:id - get an earring (for individual details page)
const getEarring = async (req, res) => {
    const { id } = req.params
    try {
        const query = 'SELECT * FROM CustomItems WHERE id=$1'
        const result = await pool.query(query, [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: `Earring ${id} not found` })
        }
        return res.status(200).json(result.rows[0])
    }
    catch (error) {
        return res.status(500).json({ error: `Failed to fetch earring ${id}: ${error}` })
    }
}

// POST / - create an earring
const createEarring = async (req, res) => {
    const { metal, clasp, gemstone, charm = null, bead = null } = req.body

    if (!metal || !clasp || !gemstone) {
        return res.status(400).json({ error: 'Metal, clasp, and gemstone are required.' })
    }

    if (clasp === 'friction-back' && (bead || charm)) {
        return res.status(400).json({ error: 'Earrings with friction backs cannot have charms or beads.' })
    }

    try {
        const query = `
            INSERT INTO CustomItems (metal, clasp, gemstone, charm, bead)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `

        const result = await pool.query(
            query,
            [metal, clasp, gemstone, charm, bead]
        )

        return res.status(201).json(result.rows[0])
    }
    catch (error) {
        return res.status(500).json({ error: `Failed to create earring: ${error}` })
    }
}

// PATCH /edit/:id - edit/update an earring
const editEarring = async (req, res) => {
    const { id } = req.params
    const { metal, clasp, gemstone, charm = null, bead = null } = req.body

    if (!metal || !clasp || !gemstone) {
        return res.status(400).json({ error: 'Metal, clasp, and gemstone are required.' })
    }

    if (clasp === 'friction-back' && (bead || charm)) {
        return res.status(400).json({ error: 'Earrings with friction backs cannot have charms or beads.' })
    }

    try {
        const query = `
            UPDATE CustomItems
            SET metal = $1, clasp = $2, gemstone = $3, charm = $4, bead = $5
            WHERE id=$6
            RETURNING *
        `

        const result = await pool.query(
            query,
            [metal, clasp, gemstone, charm, bead, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: `Earring ${id} not found` })
        }

        return res.status(200).json(result.rows[0])
    }
    catch (error) {
        return res.status(500).json({ error: `Failed to update earring ${id}: ${error}` })
    }
}

// DELETE /edit/:id - delete an earring
const deleteEarring = async (req, res) => {
    const { id } = req.params
    try {
        const query = `
            DELETE FROM CustomItems
            WHERE id = $1
            RETURNING *
        `
        const result = await pool.query(query, [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: `Earring ${id} not found` })
        }

        return res.status(200).json(result.rows[0])
    }
    catch (error) {
        return res.status(500).json({ error: `Failed to delete earring ${id}: ${error}` })
    }
}

export {
    getAllEarrings,
    getEarring,
    createEarring,
    editEarring,
    deleteEarring
}