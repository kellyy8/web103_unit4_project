import React, { useState, useEffect } from 'react'
import { getAllEarrings } from '../services/EarringsAPI'
import { customizationCategories } from '../../../server/data/data.js'
import '../App.css'
import '../css/ViewEarrings.css'

const getDisplayName = (feature, selectedValue) => {
    if (!selectedValue) {
        return 'None'
    }

    const category = customizationCategories.find((item) => item.feature === feature)
    if (!category) {
        return selectedValue
    }

    const option = category.options.find((item) => item.option === selectedValue)
    return option ? option.display_name : selectedValue
}

const EarringCard = ({ earring }) => {
    return (
        <div className="earring-card">
            <h3>Earring #{earring.id}</h3>
            <p><strong>Metal:</strong> {getDisplayName('metal', earring.metal)}</p>
            <p><strong>Clasp:</strong> {getDisplayName('clasp', earring.clasp)}</p>
            <p><strong>Gemstone:</strong> {getDisplayName('gemstone', earring.gemstone)}</p>
            <p><strong>Charm:</strong> {getDisplayName('charm', earring.charm)}</p>
            <p><strong>Bead:</strong> {getDisplayName('bead', earring.bead)}</p>
        </div>
    )
}

const ViewEarrings = () => {
    const [earrings, setEarrings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadEarrings = async () => {
            try {
                const data = await getAllEarrings()
                setEarrings(Array.isArray(data) ? data : [])
            }
            catch (err) {
                setError('Failed to load earrings')
            }
            finally {
                setLoading(false)
            }
        }

        loadEarrings()
    }, [])

    if (loading) {
        return <div>Loading earrings...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            {earrings.length === 0 && <p>No earrings found.</p>}
            {earrings.map((earring) => (
                <div key={earring.id}>
                    <EarringCard earring={earring} />
                </div>
            ))}
        </div>
    )
}

export default ViewEarrings