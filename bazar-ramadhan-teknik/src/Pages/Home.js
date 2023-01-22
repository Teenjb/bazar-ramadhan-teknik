import "../index.css";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
function Home() {
  const [data, setData] = useState("No result");

  return (
    <div className="bg-[#FFF8EB]">
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <header className="flex flex-col items-center justify-center h-1/4">
          <h1 className="h-auto text-4xl font-serif text-center font-extrabold text-[#0E4068]">
            Bazar Ramadhan Teknik
          </h1>
        </header>
        <body className="flex w-screen flex-col items-center justify-start h-2/4">
          <h1 className="text-xl font-sans-serif  text-center font-bold text-[#FFA500]">
            SCAN HERE
          </h1>
          <div className="w-2/3 md:w-1/3 lg:w-1/4 border-8 overflow-hidden rounded-3xl object-fill border-[#FFA500]">
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setData(result?.text);
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              videoStyle={{ objectFit: "cover" }}
            />
          </div>
        </body>
        <footer className="flex flex-col content-between justify-between h-1/4">
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
