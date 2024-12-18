

const JobCard = ({job, onApply}) => {
  return (
    <div className='job-card'>
        <h3>{job.title}</h3>
        <p>{job.company}</p>
        <p>{job.location}</p>
        <p>{job.description}</p>
        <a href={job.link} target="_blank">Link</a>
        <button className="scrape-btn" onClick={() => onApply(job.id)}>Mark as Applied</button>
    </div>
  )
}

export default JobCard