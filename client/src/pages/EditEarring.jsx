import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEarring, editEarring, deleteEarring } from '../services/EarringsAPI'
import { customizationCategories } from '../../../server/data/data.js'
import '../App.css'
import '../css/EditEarring.css'

const OptionModal = ({ category, onSelect, onClear, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                <h2>Select {category.display_name}</h2>
                {(category.feature === 'charm' || category.feature === 'bead') && (
                    <button
                        type="button"
                        className="clear-selection-btn"
                        onClick={onClear}
                    >
                        No {category.display_name}
                    </button>
                )}
                <div className="options-gallery">
                    {category.options.map((option) => (
                        <div
                            key={option.option}
                            className="option-card"
                            onClick={() => onSelect(option)}
                            title={option.display_name}
                        >
                            <img src={option.photo_url} alt={option.display_name} />
                            <div className="option-overlay">
                                <p className="option-name">{option.display_name}</p>
                                <p className="option-price">${option.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const EditEarring = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        metal: '',
        clasp: '',
        gemstone: '',
        charm: null,
        bead: null,
    })
    const [activeModal, setActiveModal] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState('')

    const calculatePrice = (data) => {
        let price = 0
        customizationCategories.forEach((category) => {
            const selectedOption = data[category.feature]
            if (selectedOption) {
                const option = category.options.find((opt) => opt.option === selectedOption)
                if (option) {
                    price += option.price
                }
            }
        })
        setTotalPrice(price)
    }

    useEffect(() => {
        const loadEarring = async () => {
            setLoading(true)
            setError('')
            try {
                const data = await getEarring(id)
                if (!data) {
                    setError('Failed to load earring details.')
                    return
                }

                const initialData = {
                    metal: data.metal || '',
                    clasp: data.clasp || '',
                    gemstone: data.gemstone || '',
                    charm: data.charm || null,
                    bead: data.bead || null,
                }

                setFormData(initialData)
                calculatePrice(initialData)
            } catch (err) {
                setError('Failed to load earring details.')
            } finally {
                setLoading(false)
            }
        }

        loadEarring()
    }, [id])

    const handleSelectOption = (category, option) => {
        const newData = {
            ...formData,
            [category.feature]: option.option,
        }
        setFormData(newData)
        calculatePrice(newData)
        setActiveModal(null)
    }

    const handleClearOption = (category) => {
        const newData = {
            ...formData,
            [category.feature]: null,
        }
        setFormData(newData)
        calculatePrice(newData)
        setActiveModal(null)
    }

    const getSelectedOption = (feature) => {
        if (!formData[feature]) {
            return null
        }
        const category = customizationCategories.find((cat) => cat.feature === feature)
        if (!category) {
            return null
        }
        return category.options.find((opt) => opt.option === formData[feature])
    }

    const isCharmOrBeadDisabled = formData.clasp === 'friction-back'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!formData.metal || !formData.clasp || !formData.gemstone) {
            setError('Metal, clasp, and gemstone are required.')
            return
        }

        if (formData.clasp === 'friction-back' && (formData.charm || formData.bead)) {
            setError('Earrings with friction backs cannot have charms or beads.')
            return
        }

        try {
            setSubmitting(true)
            const result = await editEarring(id, formData)
            if (!result) {
                setError('Failed to update earring.')
                return
            }
            navigate(`/customearrings/${id}`)
        } catch (err) {
            setError('Failed to update earring.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async () => {
        setError('')
        try {
            setDeleting(true)
            const result = await deleteEarring(id)
            if (!result) {
                setError('Failed to delete earring.')
                return
            }
            navigate('/customearrings')
        } catch (err) {
            setError('Failed to delete earring.')
        } finally {
            setDeleting(false)
        }
    }

    if (loading) {
        return <div>Loading earring details...</div>
    }

    return (
        <div className="create-earring-container edit-earring-page">
            <h2>Edit Earring #{id}</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="category-buttons-group">
                    {customizationCategories.map((category) => {
                        const selectedOption = getSelectedOption(category.feature)
                        const isDisabled = isCharmOrBeadDisabled && (category.feature === 'charm' || category.feature === 'bead')
                        const isRequired = category.feature === 'metal' || category.feature === 'clasp' || category.feature === 'gemstone'

                        return (
                            <div key={category.feature} className="button-group">
                                <button
                                    type="button"
                                    className={`category-button ${selectedOption ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                                    onClick={() => !isDisabled && setActiveModal(category.feature)}
                                    disabled={isDisabled}
                                >
                                    <span className="button-label">{category.display_name}</span>
                                    {selectedOption && (
                                        <span className="button-selected">
                                            <img src={selectedOption.photo_url} alt={selectedOption.display_name} />
                                            {selectedOption.display_name}
                                        </span>
                                    )}
                                    {!selectedOption && (
                                        <span className="button-placeholder">
                                            {isRequired && <span className="required">*</span>}
                                            Click to select
                                        </span>
                                    )}
                                </button>
                                {isDisabled && (
                                    <small className="disabled-note">Cannot select with friction-back clasp</small>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="price-display">
                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                </div>

                <div className="form-actions edit-form-actions">
                    <button type="submit" className="submit-btn" disabled={submitting || deleting}>
                        {submitting ? 'Updating...' : 'Update Earring'}
                    </button>
                    <button
                        type="button"
                        className="delete-btn edit-delete-btn"
                        onClick={handleDelete}
                        disabled={submitting || deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete Earring'}
                    </button>
                </div>
            </form>

            {activeModal && (
                <OptionModal
                    category={customizationCategories.find((c) => c.feature === activeModal)}
                    onSelect={(option) => handleSelectOption(customizationCategories.find((c) => c.feature === activeModal), option)}
                    onClear={() => handleClearOption(customizationCategories.find((c) => c.feature === activeModal))}
                    onClose={() => setActiveModal(null)}
                />
            )}
        </div>
    )
}

export default EditEarring