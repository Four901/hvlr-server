import React ,{useState}from 'react';

import { useNavigate} from 'react-router-dom';


const SignUp = (props) => {
       
      //const {showAlert}=props
    
    const navigate=useNavigate()
    const [credentials,setcredentials]=useState({email:"",Password:""})

      const host="http://localhost:5000"

    //const host="https://sangrahalaya.herokuapp.com"
    
    
    const handleSubmit=async(e)=>{
      
        e.preventDefault();
        if(!credentials.Password||!credentials.email)
        {
         // showAlert("Not registered","error")
          alert("Please Enter Required Details")
        }
        else{
          //console.log("submit")
          //console.log(credentials)
          const response=await fetch(`${host}/api/auth/createuser`,{
            method:"POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email,Password:credentials.Password})
          
        
          });
          //console.log("p"+response)
          const json=await response.json();
        
        //  dispatch(register(credentials.name,credentials.email,credentials.Type,credentials.empNo,credentials.userName,credentials.dobDate,credentials.dateOfJoining,credentials.password))
          if(json.Success)
          {
            //showAlert("Registered Successfully Please Sing-in","success")
            navigate('/sign-in')
          }
          else 
          {
            //showAlert("Not registered","error")
            alert("xfvfbgf")
          }
        }
       
          
    }
    
    const onChange=(e)=>{
        //console.log("ohkhhh")
        
        setcredentials({...credentials,[e.target.name]:e.target.value});
       
        //console.log(credentials)
      }
  return (

  <div className='container' style={{backgroundColor:'#e6ffee'}}>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="exampleInputemail1" className="form-label">Email</label>
    <input type="email" name='email' className="form-control" onChange={onChange} value={credentials.email} required={true} />
  </div>
  

    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='Password' className="form-control" onChange={onChange} value={credentials.Password} required={true} minLength={5}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
<div>
<button type="submit" className="btn btn-primary my-5" onClick={()=>{navigate('/sign-in')}}>Already Have An Account?</button>

</div>

</div>)
};

export default SignUp;
