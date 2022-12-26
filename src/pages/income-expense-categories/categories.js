import { useEffect } from "react";
import { API_PATH } from "../../config/api";
import { OPERATION_TYPE_CODE } from "../../config/constant";
import { warningToast, successToast } from "../../common/toast";
import { getApiAuth, postApiAuth } from "../../common/apiCaller";
import { useState } from "react";
import Modal from "../../components/modal";
import { AddButton } from "../../components/button";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

const Form = ({ parentCategoryJson, operationType }) => {
  console.log("Expense form: ", parentCategoryJson)

  const [name, setName] = useState("");
  const [parentCategoryNo, setParentCategoryNo] = useState("");
  const [description, setDescription] = useState("");

  const save = async () => {
    if (!(name)) {
      warningToast("Tên hạng mục không được để trống");
      return;
    }

    const requestBody = {
      "name": name,
      "description": description,
      "operationTypeCode": operationType,
      "parentCategoryNo": parentCategoryNo
    }

    const response = await postApiAuth(API_PATH.NEW_CATEGORY, requestBody);
    if (response.ok) {
      successToast();
    } else {
      warningToast();
    }
  }

  return (
    <div>
      <div className='form-group'>
        <label>Tên hạng mục</label>
        <input type="amount" className="form-control" id="amount" placeholder="Tên hạng mục" onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className='form-group'>
        <label>Tên hạng mục cha</label>
        <select className="form-control mb-3" onChange={(e) => setParentCategoryNo(e.target.value)}>
          <option value={null}></option>
          {parentCategoryJson.map((object, id) => <option value={object["parentCategoryNo"]}>{object["parentCategoryName"]}</option>)}
        </select>
      </div>
      <div className='form-group'>
        <label>Mô tả</label>
        <input type="description" className="form-control" id="description" placeholder="Mô tả" onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary" onClick={save}>Lưu</button>
    </div>
  );
}

const ParentElement = ({ parentCategoryName, parentCategoryDescription, subCategories }) => {

  const [isShowSubCategories, setShowSubCategories] = useState(false);

  const SubCategoriesElement = ({ categoryName, categoryDescription }) => {

    return (
      <div className="row">
        <div className="col-6">+ {categoryName}</div>
        <div className="col-6">{categoryDescription}</div>
      </div>
    );
  }

  return (
    <div className="col" onClick={() => setShowSubCategories(!isShowSubCategories)}>
      <div className="row">
        <div className="col-6">- {parentCategoryName}</div>
        <div className="row" >
          <div className="col-6">{parentCategoryDescription}</div>
          <div className="col-6">
            <i className={isShowSubCategories ? "fas fa-angle-down" : "fas fa-angle-left"} />
          </div>
        </div>
      </div>
      {
        isShowSubCategories && subCategories.length > 0 && 
        <div className="px-5">
          <hr />
         {subCategories.map((object, id) => <SubCategoriesElement categoryName={object["name"]} categoryDescription={object["description"]} key={object["categoryNo"]} />)}
        </div>
      }
      <hr />
    </div>
  );
}

const Categories = () => {

  const [isOpenExpenseForm, setOpenExpenseForm] = useState(false);
  const [isOpenIncomeForm, setOpenIncomeForm] = useState(false);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  const expenseForm = <Form operationType={OPERATION_TYPE_CODE.EXPENSE} parentCategoryJson={expenseCategories.map((object, id) => {
    return {
      "parentCategoryNo": object["parentCategoryNo"],
      "parentCategoryName": object["parentCategoryName"]
    }
  })} />;

  const incomeForm = <Form operationType={OPERATION_TYPE_CODE.INCOME} parentCategoryJson={incomeCategories.map((object, id) => {
    return {
      "parentCategoryNo": object["parentCategoryNo"],
      "parentCategoryName": object["parentCategoryName"]
    }
  })} />;

  useEffect(() => {

    async function fetchData() {
      const expenseResponse = await getApiAuth(API_PATH.GET_ALL_EXPENSE_CATEGORIES);
      if (expenseResponse.ok) {
        const responseBody = await expenseResponse.json();
        setExpenseCategories(responseBody);
      }

      const incomeResponse = await getApiAuth(API_PATH.GET_ALL_INCOME_CATEGORIES);
      if (incomeResponse.ok) {
        const responseBody = await incomeResponse.json();
        setIncomeCategories(responseBody);
      }
    }

    fetchData();

  }, [isOpenExpenseForm, isOpenIncomeForm])

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        {isOpenExpenseForm && <Modal setOpenModal={setOpenExpenseForm} contentElement={expenseForm} />}
        {isOpenIncomeForm && <Modal setOpenModal={setOpenIncomeForm} contentElement={incomeForm} />}
        <section className="content-header">
          <div className="content-fluid">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5>Danh sách mục chi <AddButton onClickFunc={() => setOpenExpenseForm(true)} /></h5>
                  <div className="row mb-3">
                    <div className="col-6" style={{textAlign: "center"}}>Tên hạng mục</div>
                    <div className="col-6" style={{textAlign: "center"}}>Mô tả</div>
                  </div>
                  {expenseCategories.length === 0 ? <div>Không có dữ liệu</div> : expenseCategories.map((object, index) => <ParentElement key={object["parentCategoryNo"]} parentCategoryName={object["parentCategoryName"]} parentCategoryDescription={object["parentCategoryDescription"]} subCategories={object["subCategories"]} />)}
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h5>Danh sách mục thu <AddButton onClickFunc={() => setOpenIncomeForm(true)} /></h5>
                  <div className="row mb-3">
                    <div className="col-6" style={{textAlign: "center"}}>Tên hạng mục</div>
                    <div className="col-6" style={{textAlign: "center"}}>Mô tả</div>
                  </div>
                  {incomeCategories.length === 0 ? <div>Không có dữ liệu</div> : incomeCategories.map((object, index) => <ParentElement key={object["parentCategoryNo"]} parentCategoryName={object["parentCategoryName"]} parentCategoryDescription={object["parentCategoryDescription"]} subCategories={object["subCategories"]} />)}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Categories;