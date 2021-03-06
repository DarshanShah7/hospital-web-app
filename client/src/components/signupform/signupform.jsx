import React , {useState, useEffect} from "react";
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import Button from "@mui/material/Button"
import CircularProgress from '@mui/material/CircularProgress';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { validate } from 'react-email-validator'
import Axios from 'axios'



export const SignUp = () => {

    const [userEmail, setUserEmail] = useState("");
    const [isEmailInValid, setIsEmailInValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonText, setButtonText] = useState("Send OTP");
    const [OTPDisabled, setOTPDisabled] = useState(true);
    // const [variable_name, function_name] = useState(initializing data type)
    // function is used to manipulate data within variable. its paramters are values of variable of usestate
    

    //useeffect runs when all html components are rendered.....ie...at last if we use array
    // if we do not use empty array .....it runs indefinitely
    // array contains values which gonna update after which useeffect runs each time that value updated
    useEffect(()=>{

        document.title = "HealthAura Sign Up"

    },[]);

    //api calls are mostly invoked in useeffect


    //defining usestate function
    const setNewEmail = (e) => {
         
        if(validate(e.target.value)){
                setIsEmailInValid(false);
                setUserEmail(e.target.value);
        }
        else
        {
            setIsEmailInValid(true);
        }
        
    }

    const sendData = ()=> {
        
        setIsLoading(true);
        
        
        //this is same thing we were doing on thunderclient ie. making post request 
        Axios.post('http://localhost:5000/auth/verify/email',{
            userEmail:userEmail
        }).then(res=>{
            console.log(res)
            setIsLoading(false);
            setButtonText('Verify OTP');
            setOTPDisabled(false);
        }).catch(err=>{
            console.log(err)
        });
        
        
        // we are handling response sent by server in .then and .catch function
    }
    
    return (
        <div className="signUpform">
            {/*  */}

            <div className="SignupText">
                SignUp Form
            </div>
            <div className="textAndButtons">
                <FormControl
                    label="Email"
                    type="Email"
                    fullWidth
                    margin = "normal"
                    autoComplete="off"
                    error={isEmailInValid}
                    onChange={setNewEmail}
                    >
                        <TextField />
                </FormControl>
                <FormControl
                    label="OTP"
                    fullWidth
                    margin="normal"
                    type="text"
                    autoComplete="off"
                    error={false}
                    disabled={ OTPDisabled ? true : false}
                    >
                        <TextField />
                </FormControl>
                <Button
                fullWidth
                variant="contained"
                onClick = {sendData}
                sx={{
                    backgroundColor : "#2774f8",
                    padding:"10px 0",
                    margin: "15px 0",
                    textTransform: "none",
                    fontSize: "18px",
                    fontWeight:"300",

                }}>
                    
                    {isLoading ? <CircularProgress color="inherit" /> : buttonText}
                    </Button>
            </div>
        </div>

    )
}


// |  web app  | => email => onChange => OnChange={setEmail} =>