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

const DropDownSelectBox = ({ setShowChart }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    var newShowChart = {month: false, quarter: false, year: false};
    newShowChart[value] = true;
    setShowChart(newShowChart);
  }

  return (
    <select id="select-chart" className="ml-1 card-title" style={{ color: "white", backgroundColor: "#28a745", borderRadius: 5 }} onChange={handleChange}>
      <option value={"month"}>theo tháng</option>
      <option value={"quarter"}>theo quý</option>
      <option value={"year"}>theo năm</option>
    </select>
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
              <DropDownSelectBox setShowChart={setShowChart} />
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
              <DropDownSelectBox setShowChart={setShowChart} />
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
              <DropDownSelectBox setShowChart={setShowChart} />
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
      </div>
    </div>
  );
}

export default Statistic;