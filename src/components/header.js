import { useEffect, useState } from "react";
import { getApiAuth, putApiAuth } from "../common/apiCaller";
import { warningToast } from "../common/toast";
import { API_PATH } from "../config/api";

const Header = () => {

  const [showNoti, setShowNoti] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);

  useEffect(() => {

    async function fetchData() {
      console.log("Fetch notifications");
      const response = await getApiAuth(API_PATH.GET_ALL_NOTIFICATION);
      if (response.ok) {
        const body = await response.json();
        setNotifications(body);
        const totalUnread = notifications.filter((e) => !e["read"]).length;
        setTotalUnreadNotification(totalUnread);
        console("Total unread noti: ", totalUnread);
      }
    }

    fetchData();

  }, []);

  const makeNotificationRead = async (notificationNo) => {

    const apiPath = API_PATH.READ_NOTIFICATION + "/" + notificationNo;
    const response = await putApiAuth(apiPath);
    if (response.ok) {
      window.location.reload();
    } else {
      warningToast("Có lỗi xảy ra khi đọc thông báo. Vui lòng thử lại sau");
    }
    
  }

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">Trang chủ</a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">Liên hệ</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Hỗ trợ
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
            <a className="dropdown-item" href="#">Câu hỏi</a>
            <a className="dropdown-item" href="#">Hỗ trợ</a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">Liên hệ</a>
          </div>
        </li>
      </ul>
      {/* SEARCH FORM */}
      <form className="form-inline ml-3">
        <div className="input-group input-group-sm">
          <input className="form-control form-control-navbar" type="search" placeholder="Tìm kiếm" aria-label="Search" />
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
      </form>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Notifications Dropdown Menu */}
        <li className={showNoti ? "nav-item dropdown show" : "nav-item dropdown"}>
          <a className="nav-link" data-toggle="dropdown" href="#" onClick={() => setShowNoti(!showNoti)}>
            <i className="far fa-bell" />
            <span className="badge badge-warning navbar-badge" style={totalUnreadNotification == 0 ? { display: "none" } : { display: "inline-block"}}>{totalUnreadNotification}</span>
          </a>
          <div className={showNoti ? "dropdown-menu dropdown-menu-lg dropdown-menu-right show" :
            "dropdown-menu dropdown-menu-lg dropdown-menu-right"} style={{ maxWidth: 10000 }}>
            <span className="dropdown-header">{notifications.length} thông báo</span>
            <div className="dropdown-divider" />

            <>
              {notifications.length !== 0 &&
                notifications.map((object, index) =>
                  <a className="dropdown-item" onClick={() => makeNotificationRead(object["notificationNo"])}>
                    <i className="fas fa-envelope mr-2" style={object["read"] ? { display: "none" } : { display: "inline-block", color: "green" }} />{object["message"]}
                    <span className="float-right text-muted text-sm">{object["timeAgo"]}</span>
                  </a>)
              }
            </>

            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item dropdown-footer">Xem tất cả thông báo</a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Header;