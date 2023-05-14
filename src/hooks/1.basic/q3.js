import Q3components from "../../components/1.basic/q3components";
import { useState, useEffect } from "react";
function Q3() {
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);

  //타이머 시작하는 함수
  //각각 시작 중지 버튼에 해당 함수에 넣음
  const onClickStart = () => {
    setStart((prev) => !prev);
    setCount(0);
  };

  let timer;

  //start가 가동되면 setInterval에 의해 1초에 count가 1씩 올라감
  useEffect(() => {
    if (start) {
      timer = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [start]);

  return (
    <>
      <h1>문제3</h1>
      <div>
        <p> 줄넘기 횟수 : {count} </p>
        {start && <Q3components />}
        <p>
          <button onClick={onClickStart}>줄넘기 시작</button>
        </p>
        <p>
          <button onClick={onClickStart}>줄넘기 중지</button>
        </p>
      </div>
    </>
  );
}
export default Q3;

/* 
    문제3
    useEffect useState에 관련한 문제입니다
    단체 줄넘기 대회에 출전하였습니다

    줄넘기 시작 버튼을 누르면 
    Q3components 컴포넌트가 보입니다.

    Q3components 내부에는

    해당 컴포넌트가 보이기 시작한 시점부터
    2초마다 줄넘기 횟수가 1회 씩 증가하는 비즈니스 로직이 존재합니다

    또한, 이러한 줄넘기 횟수 증가는 q3.js(index)에서도 확인할 수 있도록
    <p> 줄넘기 횟수 : 0 </p> 에 횟수로 표시됩니다

    줄넘기 중지 버튼을 누르면
    해당 컴포넌트는 보이지 않아야하며, 줄넘기 횟수도 더이상 증가해서는 안됩니다.
    또한, 줄넘기 횟수는 0으로 고정되어야합니다.
  */
