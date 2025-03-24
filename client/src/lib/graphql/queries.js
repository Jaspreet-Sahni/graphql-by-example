import { GraphQLClient, gql } from 'graphql-request';
import { getAccessToken } from '../auth';

const client = new GraphQLClient('http://localhost:9000/graphql',{
    headers: () =>{
        const accessToken = getContext();
        if(accessToken){
            return {'Authorization' :  `Bearer ${accessToken}`}
        }
        return {}
    },
})

export async function getJobById(idVal) {
    console.log('passed idVal',idVal)
    const queryGetJobById =gql `           
        query JobById ($idVal:ID!){
        job(id: $idVal) {
            id
            title
            description
            date
            company {
            id
            name
            }
        }
        }
    `;
    const {job} = await client.request(queryGetJobById, {idVal})
    return job
}
export async function getJobs() {
    const query1 = gql`
        query {
            jobs {
                id
                date
                title
                company {
                    id
                    name
                }
            }
        }
    `;
    const data = await client.request(query1);

    console.log("data",data)
    return data.jobs
} 
   
export async function getCompany(companyId) {
    const queryGetbyCompanyId = gql`    
    query companyById ( $companyId: ID!){
    company(id: $companyId) {
    id
    name
    description 
    jobs {
          id
          date
          title
        }
    }
    }
    `
    const {company} = await client.request(queryGetbyCompanyId,{companyId})
    //console.log('data',data)
     return company
}

export async function createJobM({title, description}) {
    const mutations = gql`
    mutation createJobNew($input: CreateJobInput!) {
  joob: createJobM(input: $input) {
    id
    title
    description
    date
    company {
      id
      name
    }
  }
}
    `
    const data = await client.request(mutations, {
        input: {title, description}
    });
    return data.joob;
    
}

