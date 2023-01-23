import "../index.css";
import gagal from "../Img/gagal.png";

function ResponseBad() {
  return (
    <div className="h-screen w-screen bg-[#FFF8EB]">
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <header className="flex flex-col items-center justify-center h-1/4">
          <h1 className="h-auto text-4xl font-serif text-center font-extrabold text-[#0E4068]">
            Bazar Ramadhan Teknik
          </h1>
        </header>
        <div className="flex flex-col items-center justify-center h-2/4">
          <img src={gagal} className="h-1/2" />
        </div>
        <footer className="flex flex-col items-center justify-between h-1/4 pb-12">
          <h1 className="h-auto text-4xl font-sans-serif text-center font-bold text-[#E05D5D]">
            Redeem Failed
          </h1>
          <button className="h-auto w-1/2 p-2 m-2 text-md font-sans-serif text-center font-bold text-[#FFF8EB] bg-[#FFA500] rounded-3xl" onClick={()=>window.location.href="/home"}>
            Back to Home
            </button>
        </footer>
      </div>
    </div>
  );
}

export default ResponseBad;
