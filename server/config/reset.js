import dotenv from 'dotenv'
import pg from 'pg'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const pool = new pg.Pool({
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	host: process.env.PGHOST,
	port: process.env.PGPORT,
	database: process.env.PGDATABASE,
	ssl: {
		rejectUnauthorized: false
	}
})

const dropTableQuery = 'DROP TABLE IF EXISTS CustomItems;'

const createTableQuery = `
CREATE TABLE IF NOT EXISTS CustomItems (
	id SERIAL PRIMARY KEY,
	metal VARCHAR(20) NOT NULL CHECK (metal IN ('silver', 'gold')),
	clasp VARCHAR(20) NOT NULL CHECK (clasp IN ('french-clips', 'ear-wire', 'friction-back', 'clip-ons')),
	gemstone VARCHAR(20) NOT NULL CHECK (gemstone IN ('ruby', 'sapphire', 'emerald', 'topaz', 'opal', 'diamond', 'moonstone')),
	charm VARCHAR(20) CHECK (charm IN ('star', 'heart', 'peace')),
	bead VARCHAR(20) CHECK (bead IN ('square', 'round', 'oval')),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT clasp_accessory_compatibility CHECK (
		NOT (clasp = 'friction-back' AND (charm IS NOT NULL OR bead IS NOT NULL))
	)
);
`

const setupDatabase = async () => {
	try {
		await pool.query(dropTableQuery)
		await pool.query(createTableQuery)
		console.log('Database reset complete. Table "CustomItems" is ready.')
	} catch (error) {
		console.error('Database reset failed:', error)
	} finally {
		await pool.end()
	}
}

setupDatabase()
