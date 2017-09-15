import axios from 'axios'



export function getAllTuts(){
		return axios.get('http://localhost:3001/allTuts').then((response)=>{
            return response
        })
    }
    
export function byType(){
       return axios.get('http://localhost:3001/category/:tech').then((response)=>{
            return response
       })
}