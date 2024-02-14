import React, { useEffect, useState } from 'react';
import "./app.css";

const App = () => {
  const [heros, setHeros] = useState([]);
  const [showPower, setShowPower] = useState(false);
  const [showAppearance, setShowAappearance] = useState(false);
  const[biography, setBiography] = useState(false);
  const [query ,setQuery] = useState("")

  const fetchHeros = async () => {
    const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json");
    const data = await response.json();
    setHeros(data);
  }

  useEffect(() => {
    fetchHeros();
  }, []);

  const togglePower = () => {
    setShowPower(!showPower);
    setBiography(false)
    setShowAappearance(false)
  }

  const toggleAppearance = ()=>{
    setShowAappearance(!showAppearance)
    setBiography(false)
    setShowPower(false)
  }

  const toggleBiography= () => {
    setBiography(!biography)
    setShowPower(false)
    setShowAappearance(false)
  }


  return (
    <div>
      <div className="main">
        <div className="head">
          <center><h1>Hero's Api</h1></center>
        </div>
        <div className="input">
        <label htmlFor="">Search</label> <input type="text" onChange={(e)=>setQuery(e.target.value)} />
        </div>

        <div className="heros">
          {heros.filter((myHero)=>{
            return myHero.name.toLowerCase().startsWith(query)
          }).map((myHero) => {
            return (
              <div className='card' key={myHero.id}>
                <div className="power" style={{ display: showPower ? 'block' : 'none' }}>
                  <center><h2>PowerStats</h2></center>
                  <h3>Intelligence : <span> {myHero.powerstats.intelligence}</span></h3>
                  <h3>Strength : <span> {myHero.powerstats.strength}</span></h3>
                  <h3>Speed : <span> {myHero.powerstats.speed}</span></h3>
                  <h3>Durability : <span> {myHero.powerstats.durability}</span></h3>
                  <h3>Power : <span> {myHero.powerstats.power}</span></h3>
                  <h3>Combat : <span> {myHero.powerstats.combat}</span></h3>
                </div>
                <div className="appearance" style={{display:showAppearance?'block': 'none'}}>
                  <center><h2>Appearance</h2></center>
                  <h3>Gender : <span>{myHero.appearance.gender}</span></h3>
                  <h3>Race : <span>{myHero.appearance.race}</span></h3>
                  <h3>Height : <span>{myHero.appearance.height}</span></h3>
                  <h3>Weight : <span>{myHero.appearance.weight}</span></h3>
                  <h3>Eye Color : <span>{myHero.appearance.eyeColor}</span></h3>
                  <h3>Hair Color : <span>{myHero.appearance.hairColor}</span></h3> 
                </div>
                <div className="biography" style={{display: biography?'block':'none'}}>
                  <center><h2>Biography</h2></center>
                  <h3>Full Name : <span>{myHero.biography.fullName}</span></h3>
                  <h3>Aliases : <span>{myHero.biography.aliases}</span></h3>
                  <h3>Place of Birth : <span>{myHero.biography.placeOfBirth}</span></h3>
                  <h3>First Appearance : <span>{myHero.biography.firstAppearance}</span></h3>
                  <h3>Publisher : <span>{myHero.biography.publisher}</span></h3>
                  <h3>Alignment : <span>{myHero.biography.alignment}</span></h3>
                </div>
                <img src={myHero.images.lg} alt="" />
                <div className="content">
                  <h3>Name : <span> {myHero.name}</span></h3>
                  <h3>Slug : <span> {myHero.slug}</span></h3>
                  <h3>Work : <span> {myHero.work.occupation.substring(0, 25)}...</span></h3>
                </div>
                <div className="btn">
                  <button onClick={togglePower}>PowerStats</button>
                  <button onClick={toggleAppearance}>Appearance</button>
                  <button onClick={toggleBiography}>Biography</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App;
