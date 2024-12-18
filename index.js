import pw from "playwright";
import fs from 'fs';
import Job from "./models/JobModel.js";
import mongoose from "mongoose";
import 'dotenv/config';


const SBR_CDP = `wss://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}`
console.log("🟢 Connecting to CDP:", SBR_CDP);


const connectToDatabase = async () => {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
};


const takeScreenshot = async (page, log) => {
    console.log(log ? log + " 📸 " : "Taking a screenshot to page.png");
    if (page) {
      await page.screenshot({ path: "page.png", fullPage: true });
    } else {
      console.error("Page is already closed. Cannot take screenshot.");
    }
  };

const searchJobs = async ( page, jobTitle, location)=>{
 
    await page.getByPlaceholder('Job title, keywords, or').click();
    await page.getByPlaceholder('Job title, keywords, or').fill(jobTitle);
    await page.getByPlaceholder('City, state, zip code, or "').fill(location);
    await page.getByRole('button', { name: 'Search' }).click();

    // Wait for results to load
    await page.waitForSelector('.job_seen_beacon'); 
    const jobCards = await page.$$(".job_seen_beacon");
    
    let jobs = [];
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let card of jobCards) {
        const title = await card.$eval(".jobTitle", (el) => el.innerText.trim());
        await delay(2000);
        const company = await card.$eval(".css-1h7lukg", (el) => el.innerText.trim());
        const location = await card.$eval(".css-1restlb", (el) => el.innerText.trim());
        const description = await card.$eval(".underShelfFooter", (el) => el.innerText.trim());
        const link = await card.$eval("a[data-jk]", (el) => `https://www.indeed.com${el.getAttribute("href")}`);
        // extract the image url
        // const image = await card.$eval('.css-1er9dh7.eu4oa1w0', (img) => img.src);

        jobs.push({ title, company, location, link, description});
      }
    return jobs

}  


const jobScraper = async ()=>{
    console.log("Connecting to Scraping Browser...");
const browser = await pw.chromium.connectOverCDP(SBR_CDP, {headless: false})
// const browser = await pw.chromium.launch({headless:false})

console.log("✅ Connected! Navigating...");
const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    locale: 'en-US',
    viewport: { width: 1920, height: 1080 },
    permissions: ['geolocation'],
});
const page = await context.newPage();


try { 
    console.log('🔍 Navigating to Indeed...');

    await page.goto('https://www.indeed.com/?from=jobsearch-empty-whatwhere', { timeout: 2 * 60 * 1000 })
    console.log("Navigated! Scraping page content...");
    await takeScreenshot(page, "Loaded Indeed homepage");

 

    const jobs = await searchJobs(page, 'Junior Developer', 'Oakland,Ca');
    console.log(jobs);


    await takeScreenshot(page, "Scraped job details");

      console.log("Scraping completed!");
      fs.writeFileSync("jobs.json", JSON.stringify(jobs, null, 2));
      console.log("Data saved to jobs.json");


    //   save to MongoDB
    await connectToDatabase();
    for(let job of jobs){
        const exsitingJob = await Job.findOne({link:job.link})
        if(!exsitingJob){

    
        try {
            await Job.create(job);
            console.log(`Job added: ${job.title}`);
        } catch (error) {
            if(error.code === 11000){
                console.log(`Duplicate job skipped: ${job.title}`); 
            }else{
                throw error;
            }
           
        }
        }else{
            console.log(`Job already exists: ${job.title}`);
        }
    }

} catch (error) {
    await takeScreenshot(page, "🔴 Error");
    throw error;
}finally{

    await browser.close();
}

};

// jobScraper()

export { jobScraper };

