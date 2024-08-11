import { useState } from "react";

function heavyWork(){
  console.log("엄청 무거운 초기화 작업.. 데이터를 한 1000건 불려서 연산해 ㅎㅎ")
  return ["호랑이", "사자", "코끼리"];
}
function App() {
    const [name, setName] = useState(()=>{
      return heavyWork();
    });
    const [input, setInput] = useState('');

    const handleInput = (e) =>{
        setInput(e.target.value);
    }

    const handleUpdate = () => {
        setName((prevStat)=>{
            return [input, ...prevStat];
        });
    }

    return (
        <div>
            <input type="text" onChange={handleInput} />
            <button type="button" onClick={handleUpdate}>update</button>
            <div>
                {name.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </div>
    );
}

export default App;
