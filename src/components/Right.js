import { React } from "react";
import { NavLink } from "react-router-dom";
import { UilCalendarAlt} from "@iconscout/react-unicons";

function Right({setDay}) {
  
  let defaultDashboard = "/dashboard/" +  new Date().toLocaleDateString().replace(/\//g,"")
  let list = [
      {
          id: new Date().toLocaleDateString(),
          day: "Today",
          to: defaultDashboard
      },
  ];
  const weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

  for (let i = 1; i <= 5; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      let day = weekday[date.getDay()];
      let obj = {
          id: date.toLocaleDateString(),
          day: day,
          to: "/dashboard/"+ date.toLocaleDateString().replace(/\//g,"") 
      };
      list.push(obj);
  }

  const DaysLink = ({id,day,to}) =>{
    return(
      <NavLink className= "nav-item px-5 py-3" to={to} onClick={() => {setDay(id.replace(/\//g,""))}}>
        <p className="link-text m-0 d-flex justify-content-between">
          <span>{day}</span>
          <span>{id}</span>
        </p>
      </NavLink>
    )
  }

  return (
    <div className="col-md-3 col-sm-3 p-0 pt-5">
      <div className="d-flex flex-column">
        <div className="logo-item px-5 pb-3 logo">
          <p className="link-text m-0 text-center">
            <span>
              <UilCalendarAlt size="30" color="#053742" /> This Week
            </span>
          </p>
        </div>
        {
          list.map((item)=>{
            return <DaysLink {...item} key={item.id} ></DaysLink>
          })
        } 

      </div>
    </div>
  );
}

export default Right;
