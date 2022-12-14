import { useEffect } from "react";

const Sidebar = () => {

  const CustomIcon = () => {
    return <i className="fa-solid fa-circle-notch nav-icon" style={{fontSize: "1.0rem"}}/>;
  }
  const showOrHideDetails = (liId) => {
    const liElement = document.getElementById(liId);
    if (liElement != null) {
      if (!liElement.classList.contains("menu-open")) {
        liElement.classList.add("menu-is-opening");
        liElement.classList.add("menu-open");
      } else {
        liElement.classList.remove("menu-is-opening");
        liElement.classList.remove("menu-open");
      }
    }
    
  }

  useEffect(() => {
    document.body.classList.add("sidebar-mini");
    document.body.classList.add("layout-fixed");
  }, []);

  return (
    // < !--Main Sidebar Container-- >
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="/home" className="brand-link">
        <img src="../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
          </div>
          <div className="info">
            {/* TODO: Get user name from API */}
            <a href="#" className="d-block">admin</a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
            {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}

            <li id="income-expense" className="nav-item">
              <a href="#" className="nav-link" onClick={() => showOrHideDetails("income-expense")}>
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Qu???n l?? thu chi
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/income-expense/add-record" className="nav-link">
                    <CustomIcon />
                    <p>T???o m???i</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/income-expense/statistic" className="nav-link">
                    <CustomIcon />
                    <p>Th???ng k??</p>
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a href="#" className="nav-link">
                    <CustomIcon />
                    <p>K??? ho???ch</p>
                  </a>
                </li> */}
                <li className="nav-item">
                  <a href="/budget/general" className="nav-link">
                    <CustomIcon />
                    <p>H???n m???c chi</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/income-expense-categories/categories" className="nav-link">
                    <CustomIcon />
                    <p>H???ng m???c thu chi</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/recurring-transactions/transactions" className="nav-link">
                    <CustomIcon />
                    <p>Ghi ch??p ?????nh k??</p>
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a href="#" className="nav-link">
                    <CustomIcon />
                    <p>Ghi ch??p m???u</p>
                  </a>
                </li> */}
                <li className="nav-item">
                  <a href="/wallet/management" className="nav-link">
                    <CustomIcon />
                    <p>Qu???n l?? t??i kho???n</p>
                  </a>
                </li>
              </ul>
            </li>

            <li id="asset" className="nav-item">
              <a href="#" className="nav-link" onClick={() => showOrHideDetails("asset")}>
                <i className="nav-icon fas fa-copy" />
                <p>
                  Qu???n l?? t??i s???n
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <CustomIcon />
                    <p>B???ng c?? c???u t??i s???n</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <CustomIcon />
                    <p>B??o c??o</p>
                  </a>
                </li>
              </ul>
            </li>

            <li id="settings" className="nav-item">
              <a href="#" className="nav-link" onClick={() => showOrHideDetails("settings")}>
                <i className="nav-icon fas fa-chart-pie" />
                <p>
                  C??i ?????t
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
            </li>

          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}

export default Sidebar;