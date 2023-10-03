import jwtDecode from 'jwt-decode'
import React from 'react'
import {createContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const AuthContext = createContext()
export default AuthContext;


export const AuthProvider=({children})=>
{
    const history = useHistory()
    const [user, setUser] = useState(()=>localStorage.getItem('tokens') ? jwtDecode(localStorage.getItem('tokens')) : null)
    const [tokens, setTokens] = useState(()=>localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    // Login a user
    const loginUser = async(e) =>
    {   e.preventDefault()
        let res = await fetch('http://localhost:8000/api/token/',{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username":e.target.username.value, "password":e.target.password.value})

        })
        let data = await res.json()
        if(res.status === 200)
        {
            setTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('tokens', JSON.stringify(data))
            history.push('/')
        }
        else if(res.status === 401 || res.status === 400)
        {
            setError("User does not exist")
        }
    }

    // Logout a user
    const logoutUser = () =>
    {
        setUser(null)
        setTokens(null)
        localStorage.removeItem('tokens')
        history.push('/login')
    }

    // Update token
    const updateToken=async ()=>{
        let res = await fetch('http://localhost:8000/api/token/refresh/',{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"refresh": tokens.refresh})
        })
        let data = await res.json()
        if(res.status === 200)
        {
            setTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('tokens', JSON.stringify(data))
            console.log("Token set")
        }else{
            logoutUser()
        }
        if(loading){
            setLoading(false)
        }
    }

    useEffect(()=>{
        // if(loading){
        //     updateToken()
        // }

        let interval = setInterval(() =>{
            if(tokens){updateToken()}
        }, 240000)
        return ()=>clearInterval(interval)
    }, [tokens])


    let registerUser=async(e)=>{
        e.preventDefault()
        if(e.target.password.value !== e.target.re_password.value){
            setError("Password different")
            return
        }
        let res = await fetch('http://127.0.0.1:8000/register/', {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"username":e.target.username.value, "password":e.target.password.value, "email": e.target.email.value})
        })
        
        if(res.status == 201){
            loginUser(e)
        }
        else{
            let data = await res.json()
            console.log(data.username[0])
        }
      }

    let data = {
        user:user,
        error: error,
        tokens:tokens,
        login:loginUser,
        logout:logoutUser,
        register:registerUser
    }
    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
