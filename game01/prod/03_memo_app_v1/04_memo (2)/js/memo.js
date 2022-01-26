"use strict";
window.addEventListener("DOMContentLoaded",
function(){
    if(typeof localStorage==="undefined"){
        window.alert("このブラウザはLocal Storage機能が実装されていません");
        return;
    }else{
        viewStorage();//localStorageからデータの取得とテーブル表示
        saveLocalStorage();
        selectTable();
        delLocalStorage();
        allClearLocalStorage();
         }     
    },false
);
function saveLocalStorage(){
    const save=document.getElementById("save");
    save.addEventListener("click",
    function(e){
        e.preventDefault();
        const key =document.getElementById("textKey").value;
        const value =document.getElementById("textMemo").value;

        if(key==""|| value==""){
            window.alert("Key,Memoはいずれも必須（ひっす）です。");
            return;
        }else{
            let w_confirm=window.confirm("LocalStorageに"+key+"\n "+value+"\nを保存（ほぞん）しますか。");
            if(w_confirm===true){
            localStorage.setItem(key,value);
            viewStorage();//localStorageからデータの取得とテーブル表示
            let w_msg="LocalStorageに" + key + "" +value + "を保存（ほぞん）しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value="";
            document.getElementById("textMemo").value="";
            }
        }
    },false
   );
};
function delLocalStorage() {
    const del=document.getElementById("del");//要素を取得しセットdinh nghia ra bien bang cai gi do
    del.addEventListener("click",
    function(e) {
        e.preventDefault();
        let w_sel="0";//選択されていれば、”1”が返却される
        w_sel=selectCheckBox();//テーブルからデータ選択（関数呼びだし）

        if(w_sel==="1"){
            const key =document.getElementById("textKey").value;//要素を取得し、値をセット lay gia tri .value
            const value =document.getElementById("textMemo").value;//document.getElementById() lay the trong file html
            let w_confirm=window.confirm("LocalStorageに"+key+"\n "+value+"\nを削除（さくじょ）しますか。");
            if(w_confirm===true){
            localStorage.removeItem(key);//localStorage kara 削除
            viewStorage();//localStorageからデータの取得とテーブル表示
            let w_msg="LocalStorageから" +key + "" +value + "を削除（delete）しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value="";
            document.getElementById("textMemo").value="";
            }
         }
       },false
    );
}
function allClearLocalStorage() {
    const allClear=document.getElementById("allClear");
    allClear.addEventListener("click",
      function(e) {
          e.preventDefault();
          let w_confirm = confirm("LocalSorageのデータをすべて削除（all clear) します。\nよろしですか？");

          if(w_confirm===true){
              localStorage.clear();
              viewStorage();//「照会処理」の関数呼出し[localStorageからデータの取得とテーブル表示]
              let w_msg = "LocalStorageのデータをすべて削除（all clear) しました。";
              window.alert(w_msg);
              document.getElementById("textKey").value="";
              document.getElementById("textMemo").value="";

          }
      },false
    );
};
function selectTable(){
    const select = document.getElementById ("select");
    select.addEventListener ("click" ,
    function(e) {
        e.preventDefault();
        selectCheckBox();
       } , false
    ) ;
}

function selectCheckBox(){
    let w_sel ="0";//let la so co the thay doi
    let w_cnt =0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey="";
    let w_textMemo="";

    for(let i=0; i<chkbox1.length; i++){
        if(chkbox1[i].checked){
            if(w_cnt===0){               
            w_textKey= table1.rows[i+1].cells[1].firstChild.data;
            w_textMemo=table1.rows[i+1].cells[2].firstChild.data;
            
        }
        w_cnt++;
    }
}
    document.getElementById("textKey").value=w_textKey;
    document.getElementById("textMemo").value=w_textMemo;
    if(w_cnt===1){
        return w_sel="1";
    }else{
    window.alert("１つ選択 (select) してください。");
    }
}

function viewStorage(){
    const list=document.getElementById("list");//list 定義
    while(list.rows[0]) list.deleteRow(0);
    for(let i=0;i<localStorage.length;i++){
        let w_key=localStorage.key(i);
    
        let tr=document.createElement("tr");
        let td1=document.createElement("td");
        let td2=document.createElement("td");
        let td3=document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
    
        td1.innerHTML ="<input name='chkbox1' type='checkbox'>";
        td2.innerHTML =w_key;
        td3.innerHTML =localStorage.getItem(w_key);

    }
    $("#table1").tablesorter({
        sortList:[[1,0]]
    });
    $("#table1").trigger("update");//tablesort add
};


