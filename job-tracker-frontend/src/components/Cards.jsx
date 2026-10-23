export default function Cards({title, value, color}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
    )
}