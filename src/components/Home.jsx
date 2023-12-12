
import "./Home.css"
import Data from "../database/DataBase"
import { Button, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const storedData = JSON.parse(localStorage.getItem('data')) || Data;

function HomePage(){
    return <div className="main-container">
        
        {/* heading  or nain div */}
    
         <Typography variant="h2" style={{fontWeight:"bolder",color:"white",textAlign:"center"}}>450 DSA <span style={{color:"#32CD32"}}>MASTER</span></Typography>
        <Typography variant="body1" style={{color:"white",fontSize:"1.5rem",textAlign:"center"}}>Your Gateway to crack DSA 🔥</Typography>
        <Typography variant="body1" color="white" fontSize={'1.2rem'}> Start Solving </Typography>

       {/* card displaying section */}
       

         <TopicDiv  storedData={storedData}/>

    </div>
}

function TopicDiv({storedData}){
  return  <div className="topicBox">
    {storedData.map((topic)=>{
     return <Link  className="link-tab" to={`/${topic.topicName}`}>
            <CardComp data={topic}/>
           </Link>
    })
    }
 </div>
}

function getCount(topic) {
  let count = localStorage.getItem(topic);

  if (count) {
    let pop = JSON.parse(count)
    if (pop < 0) return 0;
    return pop;
  }
  else {
    return 0;
  }

}
function CardComp({data}){

  let count = getCount(`${data.topicName}`);
  let status = count>0?"Progress":"Start Now";

     return <Card style={{height:"100%",padding:"10px",backgroundColor:"#aad0f6"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <Typography variant="body1"fontWeight={'bolder'} color="black">{data.topicName}</Typography>
          <Typography  color="white" style={{background:'#007BFF',width:"100px", borderRadius:"10px", textAlign:"center"}}>{status}</Typography>
        </div>
     
        <Typography variant="body1" color="black"  style={{marginTop:"10px"}}>{`Total Questions ${data.questions.length}`}</Typography>


        {count>0 &&  <div className="progress">
        <div className="progress-done"
          style={{ width: `${(count/data.questions?.length) * 100}%` }}>{Math.floor((count / data.questions?.length) * 100)}%</div>
      </div>}
       
     </Card>
}
export default HomePage