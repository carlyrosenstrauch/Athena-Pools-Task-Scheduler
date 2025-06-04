import Link from 'next/link';

export default function Jobs() {
  const jobs = [
    {
      id: "1",
      jobName: "Lot 3",
      clientName: "Cindy McKinny",
      status: "In Progress",
      gateCode: "4729",
      notes: "",
      tasks: [
        "Install new filter",
        "Check water chemistry",
        "Clean pool",
        "Check equipment"
      ]
    },
    {
      id: "2",
      jobName: "Monthly Maintenance - Smith Family Pool",
      clientName: "Sarah Smith",
      status: "Scheduled",
      gateCode: "",
      notes: "",
      tasks: [
        "Monthly cleaning",
        "Check water levels",
        "Test chemicals"
      ]
    },
    {
      id: "3",
      jobName: "Emergency Repair - Wilson Pool",
      clientName: "Mike Wilson",
      status: "Overdue",
      gateCode: "",
      notes: "",
      tasks: [
        "Replace pump",
        "Check electrical connections",
        "Test system"
      ]
    }
  ];

  const statusColors = {
    "Scheduled": "bg-blue-500",
    "In Progress": "bg-yellow-500",
    "Completed": "bg-green-500",
    "Overdue": "bg-red-500"
  } as const;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      <div className="w-full max-w-2xl mb-8">
        <Link href="/" className="flex items-center text-blue-500 hover:text-blue-600">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Front Page
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Jobs</h1>
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          {jobs.map((job) => (
            <div key={job.id} className="border-b py-4 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{job.jobName}</h2>
                <p className="text-gray-600">Client: {job.clientName}</p>
                <p className="text-gray-600">Gate Code: {job.gateCode}</p>
                <p className="text-gray-600">Notes: {job.notes}</p>
                <div className="flex items-center mt-2">
                  {/*<span className={`inline-block w-2 h-2 rounded-full ${statusColors[job.status]} mr-2`} />
                  <span className="text-sm font-medium">{job.status}</span>*/}
                </div>
                <p className="mt-2 text-gray-600 cursor-pointer hover:underline">
                  Click to view attachments 
                </p>
              </div>
              {/* START: Added a div to contain both buttons */}
              <div className="ml-4 flex flex-col space-y-2"> {/* Added flex-col and space-y-2 for vertical stacking and spacing */}
                <Link
                  href={`/jobs/${job.id}/tasks`}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-center"
                >
                  View Tasks
                </Link>
                {/* START: Added the Edit Job button */}
                <Link
                  href={`/jobs/${job.id}/edit`} // This link will point to your "edit job" page for this specific job ID
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-center"
                >
                  Edit Job
                </Link>
                {/* END: Added the Edit Job button */}
              </div>
              {/* END: Added a div to contain both buttons */}
            </div>
          ))}
        </div>
      </div>

      {/* ADDED THE FOLLOWING LINK COMPONENT FOR THE BUTTON */}
      <Link
        href="/add-job" // This link should point to your "add new job" page
        className="fixed bottom-8 right-8 bg-green-500 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        Add New Job
      </Link>
    </div>
  );
}