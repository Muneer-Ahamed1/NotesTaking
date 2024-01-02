import axios from "axios"
let config = {
    headers: {
        'Content-Type': 'application/json',
        'withCredentials': true,

    },
}

export const register=(value)=>{
    return new Promise(async (resolve,reject)=>{
        console.log(value)
        try{
            const user=await axios.post("http://localhost:3001/api/user/register",value,config); 
            const data=user.data;
            if(data.status==200) {
            resolve({status:"success",message:"User Registered Successfully!",data});
            }
            else{
                throw new Error();
            }
        }
        catch(e){
            reject(e);
        }
    })
}

export const login=(value)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const user=await axios.post("http://localhost:3001/api/user/login",value,config); 
            const data=user.data;
            if(user.status==200) {
                console.log(user);

                resolve({status:"Success",message:"User Login Successfully!",data})
            }
            else{
                console.log("i am here")
                throw new Error();
            }
        }
            catch(e){
                reject(e);
            }


        
        
    })
}