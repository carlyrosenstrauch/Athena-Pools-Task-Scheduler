// pages/jobs/[id]/edit.tsx (or .js)
'use client'; // KEEP THIS LINE AT THE VERY TOP

import { useRouter, usePathname } from 'next/navigation'; // ADD usePathname
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Job {
  id: string;
  jobName: string;
  clientName: string;
  status: string;
  gateCode: string;
  notes: string;
  tasks: string[];
}

const allJobs: Job[] = [
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

// We will no longer rely on 'params' prop directly for 'id'
export default function EditJob() { // Removed { params } from here
  const router = useRouter();
  const pathname = usePathname(); // Get the current URL path

  // Extract the ID from the pathname (e.g., /jobs/1/edit -> 1)
  const id = pathname.split('/')[2]; // This assumes URL structure /jobs/[id]/edit

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundJob = allJobs.find((j) => j.id === id);
      if (foundJob) {
        setJob(foundJob);
      } else {
        console.error("Job not found for ID:", id);
        router.push('/404');
      }
      setLoading(false);
    } else {
      setLoading(false); // If no ID is found in the URL, stop loading
    }
  }, [id, router, pathname]); // Added pathname to dependency array

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJob((prevJob) => {
      if (!prevJob) return null;
      return {
        ...prevJob,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Saving changes for job:", job);
    alert("Job updated! (Simulated save)");
    router.push('/jobs');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading job details...</div>;
  }

  if (!job) {
    return <div className="flex justify-center items-center min-h-screen">Job not found. Please check the URL.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl mb-8">
        <Link href="/jobs" className="flex items-center text-blue-500 hover:text-blue-600">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Jobs
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Edit Job: {job.jobName}</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="jobName" className="block text-sm font-medium text-gray-700">Job Name</label>
            <input
              type="text"
              id="jobName"
              name="jobName"
              value={job.jobName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={job.clientName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="gateCode" className="block text-sm font-medium text-gray-700">Gate Code</label>
            <input
              type="text"
              id="gateCode"
              name="gateCode"
              value={job.gateCode}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={job.notes}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              value={job.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
