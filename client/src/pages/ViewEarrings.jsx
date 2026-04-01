import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllEarrings, deleteEarring } from '../services/EarringsAPI'
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

const getTotalPrice = (earring) => {
    return customizationCategories.reduce((sum, category) => {
        const selectedValue = earring[category.feature]
        if (!selectedValue) {
            return sum
        }

        const selectedOption = category.options.find((option) => option.option === selectedValue)
        return sum + (selectedOption ? selectedOption.price : 0)
    }, 0)
}

const EarringCard = ({ earring, onDelete, deleting }) => {
    const totalPrice = getTotalPrice(earring)

    return (
        <div className="earring-card">
            <h3>Earring #{earring.id}</h3>
            <p><strong>Metal:</strong> {getDisplayName('metal', earring.metal)}</p>
            <p><strong>Clasp:</strong> {getDisplayName('clasp', earring.clasp)}</p>
            <p><strong>Gemstone:</strong> {getDisplayName('gemstone', earring.gemstone)}</p>
            <p><strong>Charm:</strong> {getDisplayName('charm', earring.charm)}</p>
            <p><strong>Bead:</strong> {getDisplayName('bead', earring.bead)}</p>
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
            <div className="card-actions">
                <Link className="details-btn" to={`/customearrings/${earring.id}`}>
                    Details
                </Link>
                <Link className="update-btn" to={`/edit/${earring.id}`}>
                    Update
                </Link>
                <button
                    type="button"
                    className="delete-btn"
                    onClick={() => onDelete(earring.id)}
                    disabled={deleting}
                >
                    {deleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    )
}

const ViewEarrings = () => {
    const [earrings, setEarrings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deletingId, setDeletingId] = useState(null)

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

    const handleDelete = async (id) => {
        setError('')
        try {
            setDeletingId(id)
            const deleted = await deleteEarring(id)
            if (!deleted) {
                setError('Failed to delete earring')
                return
            }
            setEarrings((prev) => prev.filter((earring) => earring.id !== id))
        }
        catch (err) {
            setError('Failed to delete earring')
        }
        finally {
            setDeletingId(null)
        }
    }

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
                    <EarringCard
                        earring={earring}
                        onDelete={handleDelete}
                        deleting={deletingId === earring.id}
                    />
                </div>
            ))}
        </div>
    )
}

export default ViewEarrings