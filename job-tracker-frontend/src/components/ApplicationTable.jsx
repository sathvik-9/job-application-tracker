// const applications = [
//   {
//     companyName: 'Microsoft',
//     position: 'Software Engineer',
//     status: 'INTERVIEW',
//     applicationDate: '2026-10-10',
//   },
//   {
//     companyName: 'Amazon',
//     position: 'Frontend Developer',
//     status: 'APPLIED',
//     applicationDate: '2026-10-14',
//   },
//   {
//     companyName: 'Google',
//     position: 'Associate Software Engineer',
//     status: 'REJECTED',
//     applicationDate: '2026-10-17',
//   },
// ]

import { useEffect, useState } from 'react'
import { fetchApplications } from '../api/applications'
import { Pencil } from 'lucide-react'

export default function ApplicationTable() {

    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getApplications = async () => {
        try {
            const data = await fetchApplications()
            setApplications(data)
        } catch (error) {
            console.error('Error fetching applications:', error)
        } finally {
            setLoading(false)
        }
        }

        getApplications()
    }, [])

    if (loading) {
        return <div>Loading applications...</div>
    }

    if (applications.length === 0) {
        return <div>No applications found.</div>
    }

    const statusStyles = {
    APPLIED: 'bg-blue-50 text-blue-700',
    INTERVIEW: 'bg-purple-50 text-purple-700',
    OFFER: 'bg-green-50 text-green-700',
    REJECTED: 'bg-red-50 text-red-700',
    }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Applications
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Company</th>
              <th className="px-5 py-3 font-medium">Job Title</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Applied Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {applications.map((application) => (
              <tr key={`${application.companyName}-${application.position}`}>
                <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800">
                  {application.companyName}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                  {application.position}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[application.status] ??
                      'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {application.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                  {application.applicationDate}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <Pencil className="h-6 w-6 px-1 py-1 text-slate-500 hover:bg-amber-200 rounded-xl" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}