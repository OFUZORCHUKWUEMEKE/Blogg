import { createContext, useReducer } from "react";
import {EditReducer} from './Reducer'
export const EditorContext = createContext()

const INITIAL_STATE = {
    html:null
}



const EditorProvider= ({children})=>{
     const [state,dispatch] = useReducer(EditReducer,INITIAL_STATE)
    return (
        <EditorContext.Provider value={{dispatch,state}}>
            {children}
        </EditorContext.Provider>
    )
}

export default EditorProvider