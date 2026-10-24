const navItems = [
    {name: 'Dashboard'},
    {name: 'Applications'},
    {name: 'Interviews'},
]

export default function Sidebar() {


    return (
        <aside className="w-64 shrink-0 flex-col border-slate-200 h-screen text-black p-4 br-2">
            <h1 className="text-2xl font-bold mb-10">Job Tracker</h1>
            <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                    <a key={index} href="#" className="hover:bg-gray-600 hover:text-white p-2 rounded">
                        {item.name}
                    </a>
                ))}
            </nav>
        </aside>
    )
}