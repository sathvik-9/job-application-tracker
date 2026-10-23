
import Sidebar from './components/Sidebar'
import StatCard from './components/Cards'
import ApplicationTable from './components/ApplicationTable'

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

          <button className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold cursor-pointer text-white shadow-sm hover:bg-blue-700">
            + Add Application
          </button>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </section>

        <ApplicationTable />
      </main>
    </div>
  )
}
