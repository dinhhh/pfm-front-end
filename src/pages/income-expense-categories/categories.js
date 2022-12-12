import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

const Categories = () => {

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="content-fluid">
            <div className="row">
              <div className="col-6">
                <h3>Mục chi <button type="button" style={{borderWidth: 0, backgroundColor: "inherit"}} ><i class="fa-regular fa-circle-plus" style={{color: "#28a745"}} /></button></h3>
              </div>
              <div className="col-6">
                <h3>Mục thu <button type="button" style={{borderWidth: 0, backgroundColor: "inherit"}} ><i class="fa-regular fa-circle-plus" style={{color: "#28a745"}} /></button></h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Categories;