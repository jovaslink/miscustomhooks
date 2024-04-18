import { useEffect, useState } from "react";
const localCache={};

export const useFetch = (url) => {
    

    const [state, setState] = useState({
        data:null,
        isLoading:true,
        hasError:false,
        error:null
    });

    const setLoadingState = () => {
        setState({
          data: null,
          isLoading: true,
          hasError: false,
          error: null,
        });
      }

    const getFetch=async (url)=>{
        
        if ( localCache[url] ) {
            console.log('Usando caché');
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            });
            return;
          }    

        setLoadingState();
        const response = await fetch(url);
         // sleep
        //await new Promise( resolve => setTimeout(resolve, 1500) );
        
        if ( !response.ok ) {
            setState({
              data:null,
              isLoading: false,
              hasError: true,
              error: {
                code: resp.status,
                message: resp.statusText,
              }
            });
            return;
          }
        const data = await response.json();
        setState({
            data,
            isLoading:false,
            hasError:false,
            error:null
        });
        localCache[url]=data;
    }
    
    useEffect(() => {
        getFetch(url);
    }, [url]);

  
    return {...state};
}
