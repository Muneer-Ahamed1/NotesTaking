import instance from "../../../Proxy/ProxyBackend"
export const getCategory=(req,res)=>{
    return(
        new Promise(async (resolve,reject)=>{
            try{
            const res=await instance.get("/api/category/get")
            console.log(res);
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