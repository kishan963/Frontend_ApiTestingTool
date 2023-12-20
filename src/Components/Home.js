import React from "react";
import logo from '../Images/Logo.jpg';


const Home = () => {
  
   // const logo="https://cdn.shopify.com/s/files/1/0057/5668/2355/files/Postman-logo-orange-2021_1155x.png?v=1637252529";
  return (
    <div> 
        <img src={logo} alt='logo' style={{ width: '70px', height: 'auto', marginLeft: '20px' }} />
    </div>
  )
}

export default Home