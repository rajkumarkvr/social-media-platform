import Button from "../../components/Button/Button";
import "./settings.css"

const Settings = () => {
       const handleLogout = () => {
        localStorage.removeItem("_auth");
        localStorage.removeItem("_user");
        window.location.reload();
      };
  return (
    <div>
      <Button className="btn-logout btn-success" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Settings;
