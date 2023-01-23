import "../index.css";
import React, { useState, useEffect, useDidMountEffect } from "react";
import { QrReader } from "react-qr-reader";
import { gapi } from "gapi-script";
import Login from "../Component/Login";
import Logout from "../Component/Logout";
import { Navigate } from "react-router-dom";

const CLIENT_ID =
  "443266690930-4rlcdgcll13taeqm3ik5btkafof8k0vs.apps.googleusercontent.com";
const API_KEY = "AIzaSyA2bKCTPX9vSZgod4YjosVrzJzubl3O25k";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

function Home() {
  const [table, setTable] = useState("");
  const [data, setData] = useState("");
  const [loadTable, setLoadTable] = useState(false);
  const [loadGapi, setLoadGapi] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [delayScan, setDelayScan] = useState(500);
  const refresh = () => window.location.reload(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      });
    }
    let promise = new Promise((resolve, reject) => {
      gapi.load("client:auth2", start);
    });
    promise.then(() => {
      setLoadGapi(true);
    });
  });

  useEffect(() => {
    if (loadGapi || data !== "") {
        getTable();
        setIsRecording(false);
  }}, [data]);

  function getTable() {
    var access_token = gapi.auth.getToken().access_token;
    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1r2YZUHUiaxTe2P4ipFoha_YgbbgVv67a1T1IN4QAdFU/values/Sheet1!A2:D20?majorDimension=ROWS",
      {
        method: "GET",
        headers: new Headers({ Authorization: "Bearer " + access_token }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTable(data.values);
      });
  }

  function updateTable() {
    var access_token = gapi.auth.getToken().access_token;
    console.log(access_token);
    var index = table.findIndex((a)=>a[0]===data);
    if(table[index][2] === "TRUE")
    {
      window.location.href = "/badresponse";
    }else{
      const body = {
        "values": [[true]]
      };
      try {
        gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId: '1r2YZUHUiaxTe2P4ipFoha_YgbbgVv67a1T1IN4QAdFU',
          range: `Sheet1!C${index+2}`,
          valueInputOption: 'RAW',
          resource: body,
        }).then((response) => {
          const result = response.result;
          console.log(`${result.updatedCells} cells updated.`);
          window.location.href = "/goodresponse";
        });
      } catch (err) {
        console.error(err);
        alert("error");
        return;
      }
    }
    // fetch(
    //   "https://sheets.googleapis.com/v4/spreadsheets/1r2YZUHUiaxTe2P4ipFoha_YgbbgVv67a1T1IN4QAdFU/values/C19?valueInputOption=RAW&includeValuesInResponse=true",{
    //     method: "PUT",
    //     headers: new Headers({ Authorization: "Bearer " + access_token,  'Content-Type': 'application/json' }),
    //     // body: JSON.stringify({ values: ['true']})
    //   }
    // ).then((res) => {
    //   console.log(res);
    // });
    };
  return (
    <div className="bg-[#FFF8EB]">
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <header className="flex flex-col items-center justify-center h-1/4">
          <h1 className="h-auto text-4xl font-serif text-center font-extrabold text-[#0E4068]">
            Bazar Ramadhan Teknik
          </h1>
        </header>
        <div className="flex w-screen flex-col items-center justify-start h-2/4">
          <h1 className="text-xl font-sans-serif  text-center font-bold text-[#FFA500]">
            {isRecording ? "Scan the QR code" : "Confirmation"}
          </h1>
          {isRecording && (
            <div className="w-2/3 md:w-1/3 lg:w-1/4 border-8 overflow-hidden rounded-3xl object-fill border-[#FFA500]">
              <QrReader
                scanDelay={delayScan}
                constraints={{ facingMode: "environment" }}
                onResult={(result, error) => {
                  if (!!result) {
                    if (result.text !== data) {
                      setData(result.text);
                    }
                  }

                  if (!!error) {
                    //console.info(error);
                  }
                }}
                videoStyle={{ objectFit: "cover", borderRadius: "14px" }}
              />
            </div>
          )}
          {!isRecording && (
            <div className="flex flex-col justify-center h-screen absolute top-0 w-screen p-4 md:w-1/3 lg:w-1/4 bg-black bg-opacity-40">
              <div className="p-8 flex flex-col bg-[#FFF8EB] rounded-3xl items-center justify-center h-1/4">
                <h1 className="w-full text-md font-sans-serif text-left font-bold text-[#0E4068]">
                  Kupon id:
                </h1>
                <h1 className="w-full text-md font-sans-serif text-left font-normal text-[#0E4068]">
                  {data}
                </h1>
                <h1 className="w-full text-md font-sans-serif text-left font-bold text-[#0E4068]">
                  Makanan:
                </h1>
                {!table && (<h1 className="w-full text-md font-sans-serif text-left font-normal text-[#0E4068]">
                  Loading...
                </h1>)}
                {table && (<h1 className="w-full text-md font-sans-serif text-left font-normal text-[#0E4068]">
                  {table[table.findIndex((a)=>a[0]===data)][1]}
                </h1>)}
                <div className="flex flex-row justify-center w-full">
                  <button
                    className="w-1/2 p-2 m-2 text-md font-sans-serif text-center font-bold text-[#FFF8EB] bg-[#00A19D] rounded-3xl"
                    onClick={updateTable}
                  >
                    Redeem
                  </button>
                  <button
                    className="w-1/2 p-2 m-2 text-md font-sans-serif text-center font-bold text-[#FFF8EB] bg-[#E05D5D] rounded-3xl"
                    onClick={() => {
                      refresh();
                    }}
                  >
                    Re-scan
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="h-auto w-full mt-4">
            <h1 className=" text-md font-sans-serif text-center font-normal text-[#0E4068]">
              Status :
            </h1>
          </div>
        </div>
        <footer className="flex flex-col content-between justify-between items-center h-1/4">
          <div className="flex flex-row w-2/3 justify-between content-between items-center ">
            <Login />
            <Logout />
          </div>
          <p className="text-md font-sans-serif text-center font-normal text-[#0E4068]">
            Scan the QR code using this app and click redeem to get your food.
          </p>
          <h1 className="text-md font-serif text-center font-bold text-[#0E4068]">
            Bazar Ramadhan Teknik
          </h1>
        </footer>
      </div>
    </div>
  );
}

export default Home;
