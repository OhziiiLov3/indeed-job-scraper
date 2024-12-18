import { useState } from 'react'

import './App.css'
import JobList from './components/JobList'
import ScrapeButton from './components/ScrapeButton'
import AllJobs from './components/AllJobs';

function App() {
const [jobs, setJobs] = useState([]);


const scrapeJobs =  async ()=>{
try {
  const response = await fetch('/api/jobs/scrape', { method: 'POST' });
  if (!response.ok) {
    throw new Error("Failed to scrape jobs");
  }
  const data = await response.json();
  console.log("Scraped Jobs: ", data);
  setJobs(data)
} catch (error) {
  console.error("Error scraping jobs:", error);
}
};

const applyJob = async (id) =>{
 try {
  await fetch(`/api/job/${id}/apply`,{method: 'POST'})
  setJobs(jobs.map(job => job.id === id ? {...job, isApplied: true}: job))
  console.log(jobs)
 } catch (error) {
  console.error("Error applying to job:", error)
 }
}

  return (
    <div className='main-container'>
      <h1>Job Scraper</h1>
      <ScrapeButton onScrape={scrapeJobs}/>
      <AllJobs/>
      <JobList jobs={jobs} onApply={applyJob}/>
    </div>
  )
}

export default App
