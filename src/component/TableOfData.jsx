import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json } from "react-router-dom";
import { ExpenseAction } from "../reduxStore/ExpenseSlic";

const TableOfData = () => {
  const [data, setData] = useState(null);
  const reRender=useSelector((state)=>state.ExpenseSlic.reRender);

  const emailToBeSave=localStorage.getItem("Email");

  const dispatch=useDispatch();
  const handelEditClick=(item)=>{
    dispatch(ExpenseAction.setSelectedItem(item));
    // dispatch(ExpenseAction.isEdited());
    dispatch(ExpenseAction.isEdited(true));
    dispatch(ExpenseAction.setEditData(item.id));
  }
  let url;
  let arr ;
  const getData = async () => {
   url=`https://expense-tracker-c3bf5-default-rtdb.firebaseio.com/${emailToBeSave}.json`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      arr=[];
      console.log("get data", data);
      for (let key in data) {
        arr.push({
          id: key,
          ...data[key],
        });
      }
      console.log(arr);
      setData(arr);
    } catch (e) {
      console.log(e);
    }
    
  };
  const deleteItem=async (id)=>{
    url=`https://expense-tracker-c3bf5-default-rtdb.firebaseio.com/${emailToBeSave}`;
    try{
      const resp= await fetch(url + '/'+ id + ".json",{
        method:"DELETE",
        headers:{
          "Content-type":"application/json"
        }
      })
      getData();
    }
    catch(e){
      console.log(e);
    }
  }
useEffect(()=>{
  getData();
  
},[reRender])
  return (
    <div className=" container p-3 ">
    <h3>Table Of Data</h3> 
      
     
      <div className="container p-3 my-5 d-flex flex-column border border-2-solid border-primary">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col">Discription</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item,count) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{count+1}</th>
                  <td>{item.Amount}</td>
                  <td>{item.Category}</td>
                  <td>{item.Discription}</td>
                  <td><button className="btn btn-primary"  onClick={()=>handelEditClick(item)}>Edit</button></td>
                  <td><button className="btn btn-primary" onClick={()=>deleteItem(item.id)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOfData;
