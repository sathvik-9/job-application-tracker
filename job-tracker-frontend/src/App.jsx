
import Sidebar from './components/Sidebar'
import StatCard from './components/Cards'
import ApplicationTable from './components/ApplicationTable'
import { useState } from 'react'
import ApplicationForm from './components/ApplicationForm'
import { createApplication } from './api/applications'

const stats = [
  {
    title: 'Total Applications',
    value: '24',
    color: 'text-slate-900',
  },
  {
    title: 'Interviews',
    value: '5',
    color: 'text-purple-600',
  },
  {
    title: 'Offers',
    value: '2',
    color: 'text-green-600',
  },
  {
    title: 'Rejected',
    value: '4',
    color: 'text-red-600',
  },
]

export default function App() {

  const [showForm, setShowForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  async function handleSave(application) {
    await createApplication(application)
    setRefreshKey((prevKey) => prevKey + 1)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1 p-6 md:p-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Application Dashboard
            </h2>
          </div>

          <button onClick={() => setShowForm(true)} className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold cursor-pointer text-white shadow-sm hover:bg-blue-700">
            + Add Application
          </button>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </section>

        <ApplicationTable key={refreshKey} />

        {showForm && (
          <ApplicationForm 
            onClose={() => setShowForm(false)}
            onSave={handleSave}
            />
        )}
      </main>
    </div>
  )
}
