
export const EditReducer = (state,action)=>{
    switch(action.type){
        case "SUBMIT":
            return{
                ...state,
                html:action.payload
            }
    }
}