import { createContext, useContext,useState } from "react";



export const AppContext = createContext()



export const AppProvider = ({ children }) => {
    const [product, setProduct] = useState([]);
    
   
    

    return(
       
        <AppContext.Provider value={{ product, setProduct }}>
        {children}
      </AppContext.Provider>
    )
}
export const useAppContext  = () =>{
    return useContext(AppContext)
}
