import { useState } from "react";

const initialFormData = {
    companyName: '',
    position: '',
    applicationDate: new Date().toISOString().slice(0,10),
    status: 'Applied'
}

export default function ApplicationForm({ onClose, onSave}) {
    const [formData, setFormData] = useState(initialFormData)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    function handleChange(event) {
        const {name, value} = event.target

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    async function handleSubmit(event) {
        event.preventDefault()
        setSaving(true)
        setError('')

        try{
            await onSave(formData)
            onClose()
        }
        catch(err) {
            setError(err.message)
        }
        finally {
            setSaving(false)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold mb-4">
                        Add Application
                    </h2>
                    <button type="button" onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>
                <div className="mb-3 w-full">
                    <label className="block mb-2">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        required
                        maxLength={100}
                        placeholder="Enter Company Name"
                        onChange={handleChange}
                        className="border border-gray-300 rounded max-w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2">Position</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        required
                        maxLength={100}
                        placeholder="Enter Position"
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2">Applied Date</label>
                    <input
                        type="date"
                        name="applicationDate"
                        value={formData.applicationDate}
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer Received">Offer Received</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="bg-gray-500 text-white py-2 px-2 rounded cursor-pointer hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    )
}