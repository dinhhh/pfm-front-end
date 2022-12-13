import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from "react-bootstrap/ProgressBar";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import CanvasJSReact from "../../plugins/canvasjs-non-commercial-3.7.2/canvasjs.react";
import { useState } from "react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const options = {
  animationEnabled: true,
  theme: "light2", //"light1", "dark1", "dark2"
  axisX: {
    includeZero: true
  },
  axisY: {
    title: "Đơn vị: Triệu",
    includeZero: true
  },
  data: [{
    type: "column", 
    indexLabelFontColor: "#5A5757",
    indexLabelPlacement: "outside",
  }]
};

const DropDownSelectBox = ({ setShowChart, backColor }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    var newShowChart = {month: false, quarter: false, year: false};
    newShowChart[value] = true;
    setShowChart(newShowChart);
  }

  const styles = {
    color: "white", backgroundColor: backColor, borderRadius: 5
  };

  return (
    <select id="select-chart" className="ml-1 card-title" style={styles} onChange={handleChange}>
      <option value={"month"}>theo tháng</option>
      <option value={"quarter"}>theo quý</option>
      <option value={"year"}>theo năm</option>
    </select>
  );
}

const SelectPeriodButton = ({ setShowChart }) => {
  const [localShowChart, setLocalShowChart] = useState({month: true, quarter: false, year: false});
  const handleChange = ( value ) => {
    var newShowChart = {month: false, quarter: false, year: false};
    newShowChart[value] = true;
    setShowChart(newShowChart);
    setLocalShowChart(newShowChart);
  } 

  return (
    <div className="row" >
      <div className="col-4"><button type='button' onClick={() => handleChange("month")} className={localShowChart["month"] ? "btn btn-block btn-success" : "btn btn-block btn-default"}>Theo tháng</button></div>
      <div className="col-4"><button type='button' onClick={() => handleChange("quarter")} className={localShowChart["quarter"] ? "btn btn-block btn-success" : "btn btn-block btn-default"}>Theo quý</button></div>
      <div className="col-4 mb-3"><button type='button' onClick={() => handleChange("year")} className={localShowChart["year"] ? "btn btn-block btn-success" : "btn btn-block btn-default"}>Theo năm</button></div>
    </div>
  );
}

const GeneralStatistic = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="card mt-3">
            <div className="card-header">
              <h5>Thống kê chung</h5>
            </div>
            <div className="card-footer" style={{ display: "block" }}>
              <div className="row">
                <div className="col-sm-4 col-6">
                  <div className="description-block border-right">
                    <h5 className="description-header">$35,210.43</h5>
                    <span className="description-text">TÀI CHÍNH HIỆN TẠI <span style={{ opacity: 0.5 }}>(1) - (2)</span></span>
                  </div>
                </div>
                <div className="col-sm-4 col-6">
                  <div className="description-block border-right">
                    <h5 className="description-header text-success">$10,390.90</h5>
                    <span className="description-text">TỔNG CÓ <span style={{ opacity: 0.5 }}>(1)</span></span>
                  </div>
                </div>
                <div className="col-sm-4 col-6">
                  <div className="description-block">
                    <h5 className="description-header text-danger">$24,813.53</h5>
                    <span className="description-text">TỔNG NỢ <span style={{ opacity: 0.5 }}>(2)</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ExpenseVsIncomeGraph = () => {
  const monthChart = <CanvasJSChart options={{
    ...options, axisX: { ...options.axisX, title: "Tháng" }, data: [{
      ...options.data, dataPoints: [
        { label: "1", y: -10 }, { label: "2", y: 15 }, { label: "3", y: 25 }, { label: "4", y: 30 }, { label: "5", y: 28 }, { label: "6", y: 10 }, { label: "7", y: 15 }, { label: "8", y: 25 }, { label: "9", y: 30 }, { label: "10", y: 28 }, { label: "11", y: 30 }, { label: "12", y: 28 },]
    }]
  }} />;
  const quarterChart = <CanvasJSChart options={{ ...options, axisX: { ...options.axisX, title: "Quý" }, data: [{ ...options.data, dataPoints: [{ label: "1-3", y: -10 }, { label: "4-6", y: 15 }, { label: "6-9", y: 25 }, { label: "9-12", y: 50 },] }] }} />;
  const yearChart = <CanvasJSChart options={{ ...options, axisX: { ...options.axisX, title: "Năm" }, data: [{ ...options.data, dataPoints: [{ label: "2020", y: -10 }, { label: "2021", y: 15 }, { label: "2022", y: 1000 },] }] }} />

  const [showChart, setShowChart] = useState({month: true, quarter: false, year: false});

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Tình hình thu chi</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove">
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <SelectPeriodButton setShowChart={setShowChart} />
              {showChart["month"] ? monthChart : null}
              {showChart["quarter"] ? quarterChart : null}
              {showChart["year"] ? yearChart : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ExpenseGraph = () => {
  const monthChart = <CanvasJSChart options={{
    ...options, axisX: { ...options.axisX, title: "Tháng" }, data: [{
      ...options.data, dataPoints: [
        { label: "1", y: -10 }, { label: "2", y: 15 }, { label: "3", y: 25 }, { label: "4", y: 30 }, { label: "5", y: 28 }, { label: "6", y: 10 }, { label: "7", y: 15 }, { label: "8", y: 25 }, { label: "9", y: 30 }, { label: "10", y: 28 }, { label: "11", y: 30 }, { label: "12", y: 28 },]
    }]
  }} />;
  const quarterChart = <CanvasJSChart options={{ ...options, axisX: { ...options.axisX, title: "Quý" }, data: [{ ...options.data, dataPoints: [{ label: "1-3", y: -10 }, { label: "4-6", y: 15 }, { label: "6-9", y: 25 }, { label: "9-12", y: 50 },] }] }} />;
  const yearChart = <CanvasJSChart options={{ ...options, axisX: { ...options.axisX, title: "Năm" }, data: [{ ...options.data, dataPoints: [{ label: "2020", y: -10 }, { label: "2021", y: 15 }, { label: "2022", y: 1000 },] }] }} />

  const [showChart, setShowChart] = useState({month: true, quarter: false, year: false});
  
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Tình hình chi</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove">
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <SelectPeriodButton setShowChart={setShowChart} />
              {showChart["month"] ? monthChart : null}
              {showChart["quarter"] ? quarterChart : null}
              {showChart["year"] ? yearChart : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const IncomeGraph = () => {
  const monthChart = <CanvasJSChart options={{
    ...options, axisX: { ...options.axisX, title: "Tháng" }, data: [{
      ...options.data, dataPoints: [
        { label: "1", y: -10 }, { label: "2", y: 15 }, { label: "3", y: 25 }, { label: "4", y: 30 }, { label: "5", y: 28 }, { label: "6", y: 10 }, { label: "7", y: 15 }, { label: "8", y: 25 }, { label: "9", y: 30 }, { label: "10", y: 28 }, { label: "11", y: 30 }, { label: "12", y: 28 },]
    }]
  }} />;
  const quarterChart = <CanvasJSChart options={{ ...options, axisX: { ...options.axisX, title: "Quý" }, data: [{ ...options.data, dataPoints: [{ label: "1-3", y: -10 }, { label: "4-6", y: 15 }, { label: "6-9", y: 25 }, { label: "9-12", y: 50 },] }] }} />;
  const yearChart = <CanvasJSChart options={{ ...options, axisX: { ...options.axisX, title: "Năm" }, data: [{ ...options.data, dataPoints: [{ label: "2020", y: -10 }, { label: "2021", y: 15 }, { label: "2022", y: 1000 },] }] }} />

  const [showChart, setShowChart] = useState({month: true, quarter: false, year: false});
  
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Tình hình thu</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove">
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <SelectPeriodButton setShowChart={setShowChart} />
              {showChart["month"] ? monthChart : null}
              {showChart["quarter"] ? quarterChart : null}
              {showChart["year"] ? yearChart : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LendGraph = () => {
  const primaryButtonClass = "btn btn-block btn-danger";
  const defaultButtonClass = "btn btn-block btn-default";

  const [lendButtonClass, setLendButtonClass] = useState(primaryButtonClass);
  const [borrowButtonClass, setBorrowButtonClass] = useState(defaultButtonClass);
  const [showLendStatistic, setShowLendStatistic] = useState(true);
  const [showBorrowStatistic, setShowBorrowStatistic] = useState(false);
  const [showListElement, setShowListElement] = useState(true);
  
  const lendButtonClick = () => {
    if (lendButtonClass !== primaryButtonClass) {
      setLendButtonClass(primaryButtonClass);
      setBorrowButtonClass(defaultButtonClass);
      // TODO: Update statistic here
    }
    setShowLendStatistic(true);
    setShowBorrowStatistic(false);
  }

  const borrowButtonClick = () => {
    if (borrowButtonClass !== primaryButtonClass) {
      setLendButtonClass(defaultButtonClass);
      setBorrowButtonClass(primaryButtonClass);
      // TODO: Update statistic here
      setShowLendStatistic(false);
      setShowBorrowStatistic(true);
    }
  }

  const LendStatistic = () => {
    const List = () => {
      return (
        <ListGroup as="ol" numbered>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Việt Anh</div>
            </div>
            <Badge bg="danger" pill>2.000.000</Badge>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Hoàng Long</div>
            </div>
            <Badge bg="danger" pill>800.000</Badge>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Duy Anh</div>
            </div>
            <Badge bg="danger" pill>200.000</Badge>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Việt Anh</div>
            </div>
            <Badge bg="danger" pill>2.000.000</Badge>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Hoàng Long</div>
            </div>
            <Badge bg="danger" pill>800.000</Badge>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Duy Anh</div>
            </div>
            <Badge bg="danger" pill>200.000</Badge>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Việt Anh</div>
            </div>
            <Badge bg="danger" pill>2.000.000</Badge>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Hoàng Long</div>
            </div>
            <Badge bg="danger" pill>800.000</Badge>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Duy Anh</div>
            </div>
            <Badge bg="danger" pill>200.000</Badge>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Việt Anh</div>
            </div>
            <Badge bg="danger" pill>2.000.000</Badge>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Hoàng Long</div>
            </div>
            <Badge bg="danger" pill>800.000</Badge>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Duy Anh</div>
            </div>
            <Badge bg="danger" pill>200.000</Badge>
          </ListGroup.Item>
        </ListGroup>
      );
    }

    const showListClick = () => {
      setShowListElement( !showListElement );
    }
    const now = 37.5;
    
    return (
      <div>
        <div className='mt-2'>Tổng cho vay:<div style={{fontWeight: "bold", display: "inline"}}> 8.000.000 VNĐ</div></div>
        <div className='mt-2'>Cần thu:<div style={{color: "#dc3545", display: "inline"}}> 5.000.000 VNĐ</div></div>
        <div className='mt-2'>Đã thu<div style={{color: "#28a745", display: "inline"}}> 3.000.000 VNĐ</div></div>
        <div className='mt-2'>
          <ProgressBar now={now} label={`${now}%`} />
        </div>
        <div className='mt-2 row' style={{justifyContent: "center"}}>
            <div><h5>Đang theo dõi</h5></div>
            <button type="button" className="btn btn-tool" data-card-widget="collapse" onClick={showListClick}>
              <i className={showListClick ? "fas fa-minus" : "fas fa-plus"} />
            </button>
        </div>
        {showListElement ? <List /> : null}
      </div>
    )
  }

  const BorrowStatistic = () => {

    return (
      <div>
        <div>Bạn không có khoản nợ nào</div>
      </div>
    )
  }
  
  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="card card-danger">
            <div className="card-header">
              <h3 className="card-title">Theo dõi nợ</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove">
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <button id="lend-button" type="button" className={lendButtonClass} onClick={lendButtonClick}>Cho vay</button>
                </div>
                <div className="col-6">
                  <button id="borrow-button" type="button" className={borrowButtonClass} onClick={borrowButtonClick}>Còn nợ</button>
                </div>
              </div>
              <div>
                {showLendStatistic ? <LendStatistic /> : null}
                {showBorrowStatistic ? <BorrowStatistic /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Statistic = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <GeneralStatistic />
        <ExpenseVsIncomeGraph />
        <div className="row">
          <div className="col-6">
            <ExpenseGraph />
          </div>
          <div className="col-6">
            <IncomeGraph />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <LendGraph />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Statistic;