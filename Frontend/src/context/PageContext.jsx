import React, { createContext, useState, useContext} from "react";


const PageContext = createContext();

export const PageProvider = ({ children}) =>{
    const [pageSections, setPageSections] = useState([]);
    

    return (
        <PageContext.Provider value ={{pageSections,setPageSections}}>
            {children}
        </PageContext.Provider>
    );
};

export const usePageContext = () => {
    return useContext(PageContext);
}