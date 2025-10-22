import { Link } from 'react-router-dom'
import '../App.css'
import { useState, useEffect} from 'react'

export default function Settings() {
    const userId = 1

    const [backColor, setBackColor] = useState('white')
    const [font, setFont] = useState('Arial')

    useEffect(() => {
        fetch(`http://localhost:3001/api/accounts/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.background_color) setBackColor(data.background_color)
                if (data.font_family) setFont(data.font_family)
                document.body.style.backgroundColor = data.background_color || 'white'
                document.body.style.fontFamily = data.font_family || 'Arial'
            })
            .catch((err) => console.error('Failed to load settings:', err));
    }, []);

    function backgroundChange(event) {
        const val = event.target.value
        setBackColor(val)
        document.body.style.backgroundColor = val

        fetch(`http://localhost:3001/api/accounts/${userId}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ background_color: val }),
            })
        }
        
        function fontChange(event){
            const val = event.target.value
            
            setFont(val)

        document.body.style.fontFamily = val

        fetch(`http://localhost:3001/api/accounts/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ font_family: val }),
        })
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

                    
                    <option value = "#f77474"> Red </option>
                    <option value = "white"> White </option>
                    <option value = "#95fcbe"> Green </option>
                    <option value = "#75bdd9"> Blue </option>
                    <option value="yellow">Yellow</option>
                    <option value="purple">Purple</option>
                    <option value="gray">Gray</option>

                </select>
            </div>
            <div>
                <label> Choose font: </label>
                <select value = {font} onChange = {fontChange}>
                    <option value = "Arial"> Arial </option>
                    <option value = "Courier"> Courier </option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>

                </select>
            </div>
            </div>
	       )
}