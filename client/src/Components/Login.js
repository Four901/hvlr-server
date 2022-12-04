import React ,{useState}from 'react';
import { useNavigate} from 'react-router-dom';

const Login =  (props) => {
 
    const navigate=useNavigate()
    const [credentials,setcredentials]=useState({email:"",Password:""})
    const host="http://localhost:5000"
   //const host="https://sangrahalaya.herokuapp.com";
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch(`${host}/api/auth/loginuser`,{
            method:"POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email,Password:credentials.Password})
          });
          const json=await response.json();
          //console.log(json)
          if(json.Success)
          {
            // props.showAlert("Login was Successfull","success")
             localStorage.setItem('token',json.AuthToken)
             //console.log("yehhhhhh")
             //console.log(json)
             navigate('/hvlr')//just like history if we want to go to another page automatically
          }
          else{
            //props.showAlert("Can't Login","error")
                alert("nghjm")
          }
    }
    const onChange=(e)=>{
        //console.log("ohkhhh")
        setcredentials({...credentials,[e.target.name]:e.target.value});
        //console.log(credentials)
      }
  return (
    <div className='container' style={{backgroundColor:'#e6ffee'}} >
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputCode1" className="form-label">Email</label>
    <input type="email" className="form-control"   name='email'  value={credentials.email} onChange={onChange}  />
    </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="Password" name='Password' className="form-control" onChange={onChange} value={credentials.Password} required={true} minLength={5} />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
<div>
<button type="submit" className="btn btn-primary my-5" onClick={()=>{navigate('/sign-up')}}>Register!</button>

</div>
</div>


);
};

export default Login;
