import instance from "../../../Proxy/ProxyBackend"

let config = {
    headers: {
        'Content-Type': 'application/json',
        'withCredentials': true,

    },
}
export const addLikedNotes=(value)=>{
    return(
        new Promise(async (resolve,reject)=>{
            try{
                const data=await instance.post("/api/likedNotes/addlikedNote",value,config);
                if(data.status=200) {
                   return  resolve(data);
                }
                throw Error("Something went wrong!!");

            }
            catch(e){
                reject({message:e.message});

            }
        })
    )
}

export const deleteLikedNotesById=(id)=>{
    console.log(id)
    return(
        new Promise(async (resolve,reject)=>{
            try{
            const data=await instance.delete("/api/likedNotes/deleteLikedNotesById/"+id,config);
            if(data.status===200){
            return resolve(data);
            }
            throw Error("Something went wrong!!");
            }
            catch(e){
                reject({message:e.message});
            }
        })
    )
    
}

export const getAllLikedNotes=()=>{
    return(
        new Promise(async(resolve,reject)=>{
            try{
            const data=await instance.get("/api/likedNotes/getAllLikedNotes");
            if(data.status===200){
                return resolve(data);
            }
            
            throw Error("Something went wrong!!");
        }
            catch(e){
                reject({message:e.message});


            }
        
        })
    )
}