import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEarring, deleteEarring } from '../services/EarringsAPI'
import { customizationCategories } from '../../../server/data/data.js'
import '../App.css'
import '../css/EarringDetails.css'

const EarringDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [earring, setEarring] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

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

    useEffect(() => {
        const loadEarring = async () => {
            try {
                const data = await getEarring(id)
                setEarring(data)
            } catch (err) {
                setError('Failed to load earring details.')
            } finally {
                setLoading(false)
            }
        }

        loadEarring()
    }, [id])

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await deleteEarring(id)
            navigate('/customearrings')
        } catch (err) {
            setError('Failed to delete this earring.')
        } finally {
            setIsDeleting(false)
        }
    }

    const handleUpdate = () => {
        navigate(`/edit/${id}`)
    }

    if (loading) {
        return <div>Loading earring details...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!earring) {
        return <div>Earring not found.</div>
    }

    return (
        <div className="earring-details-card">
            <h2>Earring #{earring.id}</h2>
            <p><strong>Metal:</strong> {getDisplayName('metal', earring.metal)}</p>
            <p><strong>Clasp:</strong> {getDisplayName('clasp', earring.clasp)}</p>
            <p><strong>Gemstone:</strong> {getDisplayName('gemstone', earring.gemstone)}</p>
            <p><strong>Charm:</strong> {getDisplayName('charm', earring.charm)}</p>
            <p><strong>Bead:</strong> {getDisplayName('bead', earring.bead)}</p>

            <div className="earring-details-actions">
                <button type="button" className="earring-update-btn" onClick={handleUpdate}>Update</button>
                <button type="button" className="earring-delete-btn" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    )
}

export default EarringDetails