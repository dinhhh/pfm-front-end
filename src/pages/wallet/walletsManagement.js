import { convertToVNDFormat } from "../../common/stringFormat";
import { AddButton } from "../../components/button";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

const WalletGeneralElement = ({ name, description, balance, history }) => {

  return (
    <div className="col">
      <div className="row">
        <div>Tên ví {name}</div>
        <div>Số dư {convertToVNDFormat(balance)}</div>
        <div>Miêu tả {description}</div>
      </div>


    </div>
  );
}

const WalletsManagement = () => {

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="content-wrapper">
        <section className="content-header">
          <div className="content-fluid">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5>Tài khoản <AddButton /></h5>
                  <p>Tổng tiền hiện tại: TODO</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5>Sổ tiết kiệm</h5>
                  <p>Tổng tiền hiện tại: TODO</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5>Tích lũy</h5>
                  <p>Tổng tiền hiện tại: TODO</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}

export default WalletsManagement;