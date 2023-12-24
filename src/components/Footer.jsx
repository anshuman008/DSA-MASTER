import React from 'react'
import "./footer.css"
const Footer = () => {
  return (
    <a  href='https://github.com/anshuman008/DSA-MASTER' target='_blank' style={{position:"absolute",bottom:"20px",cursor:"pointer",textDecoration:"none"}}>
     <div className='footer' style={{height:"30px",width:"150px",background:"white",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:"bolder"}}>
     ⭐ This Project
    </div>
    </a>
  )
}

export default Footer
