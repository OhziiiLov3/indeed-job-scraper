import {useState, useEffect} from 'react';
import JobCard from './JobCard';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(()=>{
        const fetchJobs = async  ()=>{
            try {
                const response = await fetch('/api/jobs');
                const data = await response.json();
                console.log(data)
                setJobs(data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        }
        fetchJobs()
    },[]);
  return (
    <div>
        {jobs.map((job, index)=>(
            <JobCard key={index} job={job}/>
        ))}
    </div>
  )
}

export default AllJobs