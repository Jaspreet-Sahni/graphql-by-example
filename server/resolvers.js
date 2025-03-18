// import { connection } from './connection.js';
import { getJobs , getJob, getJobsByCompany} from './db/jobs.js'
import {getCompany} from './db/companies.js'
import { GraphQLError } from 'graphql'
export const resolvers = {
   
    Query :{
         greeting:() => [null],
        // job: (_root, args) => {
        job: (_root, {id}) => {
          //  console.log('[Query.job] args:', args)
          // console.log("_root", _root); // undefined in this case
           console.log('[Query.job] id:', id)
         return getJob(id)
        },
        company: async (_root, {id}) =>{
        const company = await getCompany(id)
            if(!company){
                // to throw custom error msg and custom error code we use GraphQLError
                throw new GraphQLError('No company found with id'+id, {
                    extensions: {code : 'NOT_FOUND'}
                })
            }
            return company
        },
        jobs: () => {
            return  getJobs(); 
        }, 
          
    },
// Job will always be updated when the above query gets called
    Job: {
        // to see the harcoded retun uncomment below code
        // company: () =>{
        //     return {
        //         id:test-id',
        //         name:'facebook',
        //         description: 'Good company'
        //     }
        // },
        
        company : (ele) =>{
            console.log('ele', ele)
            return getCompany(ele.companyId)
        },
        date: (jobele) => {
            
            console.log('jobbbss', jobele);
            //return "10-09-2015"
            return jobele.createdAt
        } 
    },
    Company: {
        jobs: (company) => getJobsByCompany(company.id),
      },
    
    
}