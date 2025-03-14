// import { connection } from './connection.js';
import { getJobs } from './db/jobs.js'
import {getCompany} from './db/companies.js'

export const resolvers = {
   
    Query :{
        // greeting:() => 'Hello World'
        jobs: () => {
            return  getJobs(); 
        },    
    },

    Job: {
        // to see the harcoded retun uncomment below code
        // company: () =>{
        //     return {
        //         id:'test-id',
        //         name:'facebook',
        //         description: 'Good company'
        //     }
        // },
        company : (ele) =>{
            return getCompany(ele.companyId)
        },
        date: (jobele) => {
            
            console.log('jobbbss', jobele);
            //return "10-09-2015"
            return jobele.createdAt
        } 
    }
}