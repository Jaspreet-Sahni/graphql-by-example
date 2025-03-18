import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { formatDate } from '../lib/formatters';
import { jobs } from '../lib/fake-data';
import { useEffect, useState } from 'react';
import { getJobById } from '../lib/graphql/queries';

function JobPage() {
  const { jobId } = useParams();

  const [job, setJob] = useState();
  useEffect(() =>{
    getJobById(jobId).then((result) => setJob(result))
  },[jobId])
 // const job = jobs.find((job) => job.id === jobId);
 console.log('[JobPage]', job)
 if(!job){
  return <div>Loading</div>
 }
  return (
    <div>
      <h1 className="title is-2">
        {job.title}
      </h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job.company.id}`}>
          {job.company.name}
        </Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          {/* Posted: {formatDate(job.date, 'long')} */}
          Posted: {job.date}
        </div>
        <p className="block">
          {job.description}
        </p>
      </div>
    </div>
  );
}

export default JobPage;
