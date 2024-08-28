import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch } from 'react-redux';
import { getAllJobs, listUsers } from '../../../redux/slice/adminSlice';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();
  const [candidates, setCandidates] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const candidateResponse = await dispatch(listUsers({ role: "USER" }));
        setCandidates(candidateResponse.payload);

        const recruiterResponse = await dispatch(listUsers({ role: "RECRUITER" }));
        setRecruiters(recruiterResponse.payload);

        const jobResponse = await dispatch(getAllJobs());
        setJobs(jobResponse.payload);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const generateChartData = (candidates) => {
    const monthlyRegistrations = {};

    candidates.forEach(candidate => {
      const registrationDate = new Date(candidate.registrationDate);
      const month = registrationDate.toLocaleString('default', { month: 'short' });
      const year = registrationDate.getFullYear();
      const monthYear = `${month} ${year}`;

      if (!monthlyRegistrations[monthYear]) {
        monthlyRegistrations[monthYear] = 0;
      }

      monthlyRegistrations[monthYear]++;
    });

    const sortedMonths = Object.keys(monthlyRegistrations).sort((a, b) => {
      const [aMonth, aYear] = a.split(' ');
      const [bMonth, bYear] = b.split(' ');
      return new Date(aYear, new Date(`${aMonth} 1`).getMonth()) - new Date(bYear, new Date(`${bMonth} 1`).getMonth());
    });

    return {
      labels: sortedMonths,
      datasets: [
        {
          label: 'Users Registered',
          data: sortedMonths.map(month => monthlyRegistrations[month]),
          borderColor: 'rgba(99, 102, 241, 1)', // Indigo color
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          fill: true,
        },
      ],
    };
  };

  const chartData = generateChartData(candidates);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly User Registrations',
      },
    },
  };

  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Dashboard / Overview</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl font-bold">{candidates.length}</p>
            </div>
            <div className="text-indigo-500">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422A12.083 12.083 0 0121 12.136C21 17.207 16.97 21 12 21c-4.97 0-9-3.793-9-8.864a12.083 12.083 0 012.84-1.558L12 14z"></path>
              </svg>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Total Recruiters</h3>
              <p className="text-3xl font-bold">{recruiters.length}</p>
            </div>
            <div className="text-indigo-500">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 01-8 0 4 4 0 018 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v6m8-2a8 8 0 10-16 0"></path>
              </svg>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Total Jobs</h3>
              <p className="text-3xl font-bold">{jobs.length}</p>
            </div>
            <div className="text-indigo-500">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A10.95 10.95 0 0112 14.95a10.95 10.95 0 016.879 2.854M15 10h3.337a1 1 0 01.949.684l.848 2.536a1 1 0 01-.683 1.265l-1.382.461m-2.292 5.094A10.949 10.949 0 0112 21c-2.586 0-4.969-.874-6.879-2.332"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 10V8a5 5 0 10-10 0v2"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Latest Activity</h3>
          <ul>
            <li className="mb-2">User John Doe registered</li>
            <li className="mb-2">Recruiter Jane Smith posted a new job</li>
            <li className="mb-2">User Michael Johnson applied for a job</li>
            <li className="mb-2">Recruiter Emma Brown updated a job listing</li>
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <ul>
            <li className="mb-2">System maintenance scheduled for tomorrow</li>
            <li className="mb-2">New features coming soon</li>
            <li className="mb-2">Weekly report available</li>
            <li className="mb-2">Don't miss our upcoming webinar</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
