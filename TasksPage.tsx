import Link from 'next/link';

export default function JobTasks({ params }: { params: { id: string } }) {
  const jobs = [
    {
      id: "1",
      jobName: "Lot 3",
      tasks: [
        {
          id: "1-1",
          title: "Excavation",
          description: "Test pH, chlorine, and alkalinity levels",
          completed: true,
          dueDate: "2025-06-04",
          notes: ""
        },
        {
          id: "1-2",
          title: "Steel",
          description: "Haime Steel",
          completed: false,
          dueDate: "2025-06-16",
          notes: ""
        },
        {
          id: "1-3",
          title: "Plumbing",
          description: "Abraham Plumbing",
          completed: false,
          dueDate: "2025-06-21",
          notes: ""
        }
      ]
    },
    {
      id: "2",
      jobName: "Monthly Maintenance - Smith Family Pool",
      tasks: [
        {
          id: "2-1",
          title: "Monthly cleaning",
          description: "Complete monthly cleaning routine",
          completed: false,
          dueDate: "2025-06-05",
          notes: "Check for algae growth"
        },
        {
          id: "2-2",
          title: "Check water levels",
          description: "Verify water level and refill if needed",
          completed: false,
          dueDate: "2025-06-05",
          notes: "Bring water level gauge"
        }
      ]
    }
  ];

  const job = jobs.find((j) => j.id === params.id);
  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl mb-8">
        <Link href="/jobs" className="flex items-center text-blue-500 hover:text-blue-600">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Jobs List
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">{job.jobName}</h1>
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {job.tasks.map((task) => (
              <div key={task.id} className="border-b py-4">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="mr-3"
                    readOnly
                  />
                  <h3 className="font-medium">{task.title}</h3>
                </div>
                <p className="text-gray-600 mb-2">{task.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  <span>Notes: {task.notes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
