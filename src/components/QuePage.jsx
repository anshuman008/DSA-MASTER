import { useParams } from "react-router-dom";
import Data from "../database/DataBase";
import { useEffect, useState } from "react";
import { Card, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
let preData = Data;
let ind = 0;

function getLocalItem() {
  let list = localStorage.getItem('dsaData');

  if (list) {
    let pop = JSON.parse(list)
    return pop;
    // console.log(pop,'ppaaa');
  }
  else {
    return "";
  }

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

function QueList() {
  ;

  let dsaData = getLocalItem();
  if (dsaData === "") {
    dsaData = preData;
  }
  const value = useParams();
  const [storedData, setStoreddata] = useState(dsaData);
  const [topic, setTopic] = useState({});


  useEffect(() => {
    for (let i = 0; i < storedData.length; i++) {
      if (storedData[i].topicName === value.id) {
        setTopic(storedData[i]);
        ind = i;
        break;
      }
    }
  }, [value.id]);

  const [count, setCount] = useState(getCount(value.id));
  useEffect(() => {
    localStorage.setItem('dsaData', JSON.stringify(storedData))
    localStorage.setItem(`${value.id}`, JSON.stringify(count))
    // console.log(storedData,'looo')

  }, [count])

  return (
    <div className="main-container">
      <Typography variant="h2" style={{ fontWeight: "bolder", color: "white" }}>
        450 DSA <span style={{color:"#32CD32"}}>MASTER</span>
      </Typography>
      <Typography variant="body1" color="white" fontSize={'1.2rem'}>
        {topic.topicName}: {count}/{topic.questions?.length}
      </Typography>

      <div id="notification">

      </div>

      <div className="progress">
        <div className="progress-done"
          style={{ width: `${(count / topic.questions?.length) * 100}%` }}>{Math.floor((count / topic.questions?.length) * 100)}%</div>
      </div>

      <TopicDiv topic={topic.questions} count={count} setCount={setCount} />
    </div>
  );
}

function TopicDiv({ topic, count, setCount }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(topic);
  }, [topic]);



  function showNotification(msg) {
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = msg;

    let toastBox = document.getElementById('notification');
    toastBox.appendChild(toast);


    if (msg.includes('removed')) toast.classList.add('removed')

    setTimeout(() => {
      toast.remove();
    }, 2000)

  }
  //   console.log(data, 'lllll');
  const [changedData, setChaged] = useState([]);

  function showChange(index) {
    const updatedData = [...data];
    const [movedQuestion] = updatedData.splice(index, 1);
    movedQuestion.Done = !movedQuestion.Done;

    if (movedQuestion.Done) {
      showNotification(`<i class="fa-solid fa-circle-check"></i> ${count + 1} Done 🎉`);
      setCount(count + 1);
    } else {
      showNotification('<i class="fa-solid fa-circle-xmark"></i> removed');
      setCount(count - 1);
    }

    const newData = [...updatedData, movedQuestion];
    // console.log(newData, 'kkkkkkkkk')

    setData(newData);



    // Save the modified data to localStorage
    // preData[ind].questions = newData;
    // setChaged(preData)
    // localStorage.setItem('data', JSON.stringify(changedData));
  }


  if (data) {
    return (
      <div style={{ overflow: "scroll", overflowX: "hidden" }}>
        {data.map((top, index) => (
          <CardComp key={top.id} topic={top} index={index} showChange={showChange} />
        ))}
      </div>
    );
  }
}

function CardComp({ topic, index, showChange }) {

  const handleCheckboxChange = () => {
    showChange(index);
  };



  let link = "";
  let link2 = "";

  if (topic.URL) {
    if (topic.URL.includes('leetcode')) link = "https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/000000/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-color-tal-revivo.png";
    else link = "https://img.icons8.com/color/24/000000/GeeksforGeeks.png"
  }
  if (topic.URL2) {
    link2 = "https://i.ibb.co/RcQ5qLs/Coding-Ninjas-logo.jpg";
  }



  return (
    <Card style={{ backgroundColor: "#aad0f6", height: "100px", margin: "10px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexDirection: "column" }}>


      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FormControlLabel
          label=""
          control={
            <Checkbox
              value=""
              checked={topic.Done}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
        />
        <Typography variant="body1" fontWeight={'bolder'} style={{ marginRight: "10px" }} color="black">
          {topic.Problem}
        </Typography>
        <a href={topic.URL} target="_blank" style={{textDecoration
        :"none"}}>
        <Typography color="white" style={{ background: '#007BFF', width: "100px", height: "25px", borderRadius: "10px", textAlign: "center" }}>
            {topic.Done ? "Done" : "Start"}
          </Typography>
        </a>
         
      
      </div>

      <div style={{ display: "flex" }}>
        <a href={topic.URL} target="_blank" style={{ marginRight: "10px" }}><img src={link} width="30px" height="25px" alt="icon" /></a>
        {topic.URL2 && <a href={topic.URL2} target="_blank" ><img src={link2} width="30px" height="25px" alt="icon" /></a>}
      </div>

    </Card>
  );
}

export default QueList;
