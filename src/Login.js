import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login =()=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const [error, setError] = useState('');
    
    const{storetokenInLs}=useAuth();
    let navigate=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const response=await fetch("http://localhost:5270/api/SuperUserLogin/login", {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username,password})
            });
            if(response.ok){ 
                const data=await response.json();
                alert("Login Successfull..!!");
                const{accessToken,refreshToken}=data;
                storetokenInLs(accessToken, refreshToken);
                navigate('/employeedetails')

            }else{
                setError("Invalid Credentials.")
            }

        }catch(error){
            setError("An error occurred while logging in.");
            console.error("Error:", error);
        }
        
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={e=>setUsername(e.target.value)}
                    required

                    />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        required
                        onChange={e =>setPassword(e.target.value)}
                    />
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <button type="submit">
                    Login
                </button>
            </form>


        </div>
    )
}

export default Login;