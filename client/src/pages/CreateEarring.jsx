import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEarring } from '../services/EarringsAPI'
import { customizationCategories } from '../../../server/data/data.js'
import '../App.css'
import '../css/CreateEarring.css'

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

const CreateEarring = () => {
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
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

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

    const isCharmOrBeadDisabled = formData.clasp === 'friction-back'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!formData.metal || !formData.clasp || !formData.gemstone) {
            setError('Metal, clasp, and gemstone are required.')
            return
        }

        if (formData.clasp === 'friction-back' && (formData.charm || formData.bead)) {
            setError('Earrings with friction backs cannot have charms or beads.')
            return
        }

        try {
            const result = await createEarring(formData)
            setSuccess('Earring created successfully!')
            setFormData({
                metal: '',
                clasp: '',
                gemstone: '',
                charm: null,
                bead: null,
            })
            setTotalPrice(0)
            navigate('/customearrings')
        } catch (error) {
            setError('Failed to create earring. Please try again.')
        }
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

    return (
        <div className="create-earring-container">
            <h2>Create Custom Earring</h2>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

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
                                    required={isRequired && !selectedOption}
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

                <button type="submit" className="submit-btn">
                    Create Earring
                </button>
            </form>

            {/* Modal for option selection */}
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

export default CreateEarring