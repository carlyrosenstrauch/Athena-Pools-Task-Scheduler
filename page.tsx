export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Athena Pools Task Scheduler</h1>
      <a 
        href="/jobs"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        View Jobs
      </a>
    </div>
  )
}
