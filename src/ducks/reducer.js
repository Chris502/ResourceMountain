
const CREATE_AUTH = "CREATE_AUTH",
      GET_ID = "GET_ID",
      GET_TUTS = "GET_TUTS"



let intialState={
    tuts:[],
    userlist:[],
    authName:'',
    dbUserName:'',
    authPict:'',
    userID:''
}

export function authMe(user,pic,filteredID){
    return {
        type: CREATE_AUTH,
        payload: {user: user,
                  pic: pic,

    }
}

}
export function authID(id){
    return {
        type: GET_ID,
        payload: id
    }
}
export function getTuts(tuts){
    return{
        type: GET_TUTS,
        payload: tuts
    }
}

export default function reducer(state = intialState, action){
    switch(action.type){
        case CREATE_AUTH:
        let user =  Object.assign({}, state,  {
            authName: action.payload.user,
            authPict: action.payload.pic
            
            
        })
        localStorage.setItem("user",user.authName)
        localStorage.setItem("user-pic", user.authPict)
        
        return user


        case GET_ID:
     let persistID = Object.assign({}, state, {userID: action.payload})

  
  
        return persistID
        

        case GET_TUTS:
        
        let persistTuts = Object.assign({},state,{ tuts: action.payload})
        //localStorage.setItem("tutsLS", JSON.stringify(persistTuts.tuts))
        return persistTuts
        
         default:
        return state
        
    }   

}