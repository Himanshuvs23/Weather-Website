import axios from "axios";
import { useState } from "react";

export function Weather(){

    const [Theme,setTheme]=useState('border border-2 p-4 rounded');
    const[btnTheme,setbtnTheme]=useState('bi bi-search btn btn-dark w-100')

    function handleThemeChange(e){
        if(e.target.checked){
            setTheme('border border-2 p-4 rounded bg-dark text-white');
            setbtnTheme('bi bi-search btn btn-info w-100')
        }else{
            setTheme('border border-2 p-4 rounded')
            setbtnTheme('bi bi-search btn btn-dark w-100')
        }
    }


    const ulr ="https://api.openweathermap.org/data/2.5/weather?";
    const api_key ='a7f98e186af7ed075c3b52ca14b8c0e9';
    
    const [cityName,setcityName]=useState('');
    const [weatherData,setweatherData]=useState({
       name:'',
       main : {temp:0},
       weather : [{description:''}]
    })

    function handleCityChange(e){
        setcityName(e.target.value);
    }
    function handleSearchClick(){
        axios.get(ulr,{params:{
            q:cityName,
            appid:api_key,
            units :'metric'
        }})
        .then(response =>{
            setweatherData(response.data);
            console.log(response.data)
        })
    }

 
    return(
        <div className="container-fluid" >
            <div className="mt-4 d-flex justify-content-center align-items-center " style={{marginTop:'10px'}}>
                <div className={Theme}>
                    <div className="input-group">

                        <div className="w-100 p-2 m-1">
                            <input type="checkbox" onChange={handleThemeChange} className="" />
                            <label>Dark Theme</label>
                        </div>
                    
                        <input type="text" onChange={handleCityChange} placeholder="Enter city Name" className="form-control"/>
                        <button onClick={handleSearchClick} className={btnTheme}></button>
                        
                    </div>
                    <div style={{marginTop:'50px',boxShadow:'2px 2px 2px black',padding:'20px',border:'1px solid black',textAlign:'center', backgroundColor:`${(weatherData.weather[0].description==='mist')?'yellow':'pink'}`}}>
                        <h2>{weatherData.name}-{weatherData.weather[0].description.toUpperCase()}</h2>
                        <p className="fs-4">{Math.round(weatherData.main.temp)} &deg; <span className="bi bi-sun"></span></p>
                    </div>
                </div>
            </div>

        </div>
    )
}