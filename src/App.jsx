import "./App.css";
import Widget from "./components/Widget";

function App() {
  return (
    <div className="flex justify-center w-full">
      <Widget projectId={"1"} loop={true} autoplay={true} delay={2000} />
    </div>
  );
}

export default App;
