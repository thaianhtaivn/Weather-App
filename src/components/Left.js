import { React } from "react";
import { Link, NavLink, useMatch } from "react-router-dom";
import { UilApps, UilChatBubbleUser } from "@iconscout/react-unicons";

function Left() {
  
  const dashboardMap = useMatch("/dashboard/:date");

  let defaultDashboard = "/dashboard/" +  new Date().toLocaleDateString().replace(/\//g,"")

  const tabs = [
    {
      id: 1,
      tabTitle: "Dashboard",
      icon: "UilApps",
      to: dashboardMap == null ? defaultDashboard : dashboardMap.pathname,
    },
    {
      id: 2,
      tabTitle: "About",
      icon: "UilChatBubbleUser",
      to: "/about",
    },
  ];
  function renderIcon(name) {
    switch (name) {
      case "UilApps":
        return <UilApps size="25" color="#053742" />;
      case "UilChatBubbleUser":
        return <UilChatBubbleUser size="25" color="#053742" />;
      default:
        return "⚪️";
    }
  }
  const NavBar = ({ tabTitle, icon, to }) => {
    return (
      <NavLink className="nav-item px-5 py-4" to={to}>
        <p className="link-text m-0">
          {renderIcon(icon)} {tabTitle}
        </p>
      </NavLink>
    );
  };

  return (
    <div className="col-md-2 col-sm-2 p-0 pt-5">
      <div className="d-flex flex-column">
        <Link className="logo-item px-5 pb-3 logo" to="/">
          <img src="../../weather-icons/Logo.png" alt="Weather"></img>
        </Link>
        {tabs.map((item) => (
          <NavBar {...item} key={item.id}></NavBar>
        ))}
      </div>
    </div>
  );
}


export default Left;
