import React from 'react';
import JobCard from './jobs/JobCard';

const JobList = ({jobs}) => {
  return (
    <div className="ml-16 mr-16">
      {jobs.map(job => (
        <JobCard
          key={job.id}
          id={job.id}
          company={job.company}
          title={job.jobTitle}
          type={job.jobType}
          date={job.postedTime}
          location={job.country}
          salary={job.salary}
        />
      ))}
    </div>
  );
};

export default JobList;
