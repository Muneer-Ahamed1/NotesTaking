 import instance from "../../../Proxy/ProxyBackend";
 

 let config = {
    headers: {
        'Content-Type': 'application/json',
        'withCredentials': true,

    },
}

 export const getAllNotes=()=>{
    console.log("idsa")
     return (
         new Promise(async (resolve,reject)=>{
             try{
             const data=await instance.get("/api/note/getAllNote");
             console.log(data)
             if(data.status=200) {
             return resolve(data);
             }
             throw new Error(data);
             }
             catch(e){
                return reject(e.message);
            }
         })
     )
}

export const editNotesById=(id,value)=>{
    
     return (
         new Promise(async (resolve,reject)=>{
             try{
             const data=await instance.patch(`/api/note/notesBy/${id}`,value,config);
             
             console.log(data)
             if(data.status=200) {
             return resolve(data);
             }
             throw new Error(data);
             }
             catch(e){
                return reject(e.message);
            }
         })
     )
}


export const addNote=(value)=>{
    return (
        new Promise(async (resolve,reject)=>{
            try{
                let res = await instance.post('/api/note/addNote', value , config);
                if(res.status==200) {
                return resolve(res);
                }
                throw Error(res);

            }
            catch(e){
                reject(res);

            }
        })
    )
}

export const deleteNoteById=(id)=>{
    return (new Promise(async (resolve,reject)=>{

        try{
            const res=await instance.delete(`/api/note/notesBy/${id}`,config);
            if(res.status==200) {
            return resolve(res);
            }
            throw Error(JSON.stringify(res));
        }
        catch(e){
            reject(JSON.parse(e.message));

        }
    }))
    
}