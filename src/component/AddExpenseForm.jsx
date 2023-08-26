import React, { useEffect, useState } from "react";

import TableOfData from "./TableOfData";
import { useDispatch, useSelector } from "react-redux";
import ExpenseSlic, { ExpenseAction } from "../reduxStore/ExpenseSlic";

const AddExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Movie");
  const [disp, setdisp] = useState("");

 const idForEditing=useSelector((state)=>state.ExpenseSlic.idForEdit)
  const emailGetItem=localStorage.getItem("Email")

  const selectedItemGet = useSelector(
    (state) => state.ExpenseSlic.selectedItem
  );
  const isEditing = useSelector((state) => state.ExpenseSlic.isEditing);

  const dispatch = useDispatch();
  let url;
  const postData = async () => {
    url =
      `https://expense-tracker-c3bf5-default-rtdb.firebaseio.com/${emailGetItem}.json`;
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          Amount: amount,
          Category: category,
          Discription: disp,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        alert(data.error.message);
      } else {
        alert("Your data updated");

        dispatch(ExpenseAction.callGetDataFun());
        setAmount("");

        setdisp("");
      }
    } catch (e) {
      console.log(e);
    }
  };
const EditeAPI=async(id)=>{
  url=`https://expense-tracker-c3bf5-default-rtdb.firebaseio.com/${emailGetItem}`;
  try{
    const res=await fetch(url+"/"+id +".json",{
      method:"PUT",
      body:JSON.stringify({
      Amount: amount,
      Category: category,
      Discription: disp,
      }),
      headers:{
        "Content-type":"application/json"
      }
    });
    const data=await res.json();
    console.log(data);
    if(data.error){
      alert(data.error.message);
    }else{

      alert("updated");
      setAmount("");
      setCategory("");
      setdisp("");
      dispatch(ExpenseAction.isEdited(false));
      dispatch(ExpenseAction.callGetDataFun());
      
    }
  }
  catch(e){
    console.log(e);
  }
}
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(amount, category, disp);
    if(!isEditing){
      postData();
    }
    else{
      EditeAPI(idForEditing);
    }
  
    dispatch(ExpenseAction.isEdited(false));

  };
  useEffect(() => {
   if(isEditing)
   {
    setAmount(selectedItemGet?.Amount);
    setCategory(selectedItemGet?.Category);
    setdisp(selectedItemGet?.Discription);
   }
   
  }, [isEditing]);
  return (
    <>
      <form
        class=" m-5 p-3 d-flex flex-column w-50 border border-2-solid border-primary needs-validation"
        onSubmit={submitHandler}
        novalidate
      >
        <div className="row g-3 my-5  container">
          <div class="col-md-6 ">
            <label for="validationCustomUsername" class="form-label">
              Amount
            </label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend">
                <b>₹</b>
              </span>
              <input
                type="number"
                class="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <div class="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div class="col-md-6">
            <label for="validationCustom04" class="form-label">
              Category
            </label>
            <select
              class="form-select"
              id="validationCustom04"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {/* <option selected disabled>
              Choose...
            </option> */}
              <option>Movie</option>
              <option>Food</option>
              <option>Grocery</option>
            </select>
            <div class="invalid-feedback">Please select a valid state.</div>
          </div>
        </div>
        <div className="row mb-4">
          <div class="col-12">
            <label for="validationCustom03" class="form-label">
              Short Discription
            </label>
            <textarea
              class="form-control"
              id="validationCustom03"
              value={disp}
              onChange={(e) => setdisp(e.target.value)}
              required
            />
          </div>
        </div>

        <div class="col-12">
          <button class="btn btn-primary" type="submit" >
            {isEditing ? "Update":"AddExpense"}
          </button>
        </div>
      </form>
      <TableOfData />
    </>
  );
};
export default AddExpenseForm;
