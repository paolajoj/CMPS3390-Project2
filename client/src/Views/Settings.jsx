import { Link } from 'react-router-dom'
import '../App.css'
import { useState } from 'react'

function getSavedBackColor()
{
    return localStorage.getItem("backgroundColor")
}

function getSavedFont()
{
    return localStorage.getItem("fontFamily")
}

function saveBackColor()
{
    return localStorage.setItem("backgroundColor", val)
}

function saveFont()
{
    return localStorage.setItem("fontfamily", val)
}



export default function Settings() {

	const[backColor, setBackColor] = useState(getSavedBackColor)
	const[font, setFont] = useState(getSavedFont)

	function backgroundChange(event)
	{
       const val = event.target.value
       setBackColor(val)
       localStorage.setItem("backgroundColor", val)
    }

    function fontChange(event)
    {
       const val = event.target.value
       setFont(val)
       localStorage.setItem("fontFamily", val)
    }


	return (
            <div
            style =
            {{
                backgroundColor: backColor,
                fontFamily: font,
                height: 'auto',
                width: 'auto',

            }}
            >
			<div className="home">
			<h1 className="title">Finance Tracker Settings Page</h1>
			<div className="links">      
			<Link to="/" className="link">Home</Link>
			</div>
			</div>
			<div>
                <label> Choose background color: </label>
                <select value = {backColor} onChange = {backgroundChange}>
                    <option value = "red"> Red </option>
                    <option value = "white"> White </option>
                    <option value = "green"> Green </option>
                    <option value = "blue"> Blue </option>
                </select>
            </div>
            <div>
                <label> Choose font: </label>
                <select value = {font} onChange = {fontChange}>
                    <option value = "Arial"> Arial </option>
                    <option value = "Courier"> Courier </option>
                </select>
            </div>
            </div>
	       )
}
