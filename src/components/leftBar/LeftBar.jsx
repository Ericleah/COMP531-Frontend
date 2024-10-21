import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../reducer/authReducer";

const MenuItem = ({ icon, label }) => (
  <div className="item">
    <img src={icon} alt={label} />
    <span>{label}</span>
  </div>
);

const LeftBar = () => {
  const currentUser = useSelector(selectUser);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={currentUser.profilePic} alt={currentUser.username} />
            <span>{currentUser.username}</span>
          </div>
          <MenuItem icon={Friends} label="Friends" />
          <MenuItem icon={Groups} label="Groups" />
          <MenuItem icon={Market} label="Market" />
          <MenuItem icon={Watch} label="Watch" />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;