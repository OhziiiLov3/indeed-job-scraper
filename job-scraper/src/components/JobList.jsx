

const JobList = ({jobs, onApply}) => {
  return (
    <div>
        {jobs.map(job=>(
            <JobList key={job.id} job={job} onApply={onApply}/>
        ))}
    </div>
  )
}

export default JobList