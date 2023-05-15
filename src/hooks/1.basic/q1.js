import { useState } from "react";
import styled from "styled-components";

// ➡️ 수정, 보완 코드
// ⭐ 이전 코드의 경우 하단 주석 처리
function Q1() {
  /* 수정 보완 사항
      1. state 값이 boolean일 때 변수 값 앞에 is 를 붙여 구분
      2. e.target.value === e.target.placeholder인 조건을 변수에 담아 가독성을 높임
      3. 함수명을 더 명확히 수정, prev값으로 이전 상태 가져옴으로써 최신 상태 안전성
  */

  // 1.
  const [isValid, setIsValid] = useState(false);
  const [isShow, setIsShow] = useState(true);

  const onChangeValue = (e) => {
    // 2.
    const isValueEqualPlaceholder = e.target.value === e.target.placeholder;
    if (isValueEqualPlaceholder) setIsValid(true);
    else setIsValid(false);
  };

  // 3.
  const onClickIsShow = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <>
      <h1>문제1</h1>
      <div>
        <h2>문제1-1.</h2>
        <input
          type="text"
          placeholder={"김성용"}
          style={{ textAlign: "center" }}
          onChange={onChangeValue}
        />
        <S.Message valid={isValid}>
          {isValid ? "올바르게 입력하셨습니다" : "올바르게 글을 작성해주세요"}{" "}
        </S.Message>
      </div>

      <div>
        <h2>문제1-2. </h2>
        <button onClick={onClickIsShow}>{isShow ? "보이기" : "숨기기"}</button>
        {isShow && <p> " 이 문구는 보이기 상태일 때만 볼 수 있습니다 " </p>}
      </div>
    </>
  );
}
export default Q1;

const Message = styled.p`
  color: ${(props) => (props.valid ? "green" : "red")};
`;

const S = {
  Message,
};

// ⭐ 이전 코드
// import { useState } from "react";
// import styled from "styled-components";

// function Q1() {
//   /*1-1.
//   1) valid state 값
//   1) input의 onChange 이벤트 발생시 onChangeValue 함수 실행, input 입력값과 placeholder 의 값이 같으면 valid 상태를 true 다르면 false
//   2) valid state 값을 이용하여 올바르게 입력하셨습니다 : 올바르게 글을 작성해주세요 문구 노출
//   3) valid state 값을 이용하여 color green : red 변경
//   */
//   const [valid, setValid] = useState(false);

//   const onChangeValue = (e) => {
//     if (e.target.value === e.target.placeholder) setValid(true);
//     else setValid(false);
//   };

//   /* 1-2.
//   1) onClick이벤트 함수, show state 값
//   2) !state로 토글, true일 때 보이기, false일 때 숨기기 text 변경
//   3) true일 때 p태그 "" 또는 null, false일 때 이 문구는 보이기 상태일 때만 볼 수 있습니다
//   */
//   const [show, setShow] = useState(true);

//   const onClickBtn = () => {
//     setShow(!show);
//   };

//   return (
//     <>
//       <h1>문제1</h1>
//       <div>
//         <h2>문제1-1.</h2>
//         <input
//           type="text"
//           placeholder={"김성용"}
//           style={{ textAlign: "center" }}
//           onChange={onChangeValue}
//         />
//         <S.Message valid={valid}>
//           {valid ? "올바르게 입력하셨습니다" : "올바르게 글을 작성해주세요"}{" "}
//         </S.Message>
//       </div>

//       <div>
//         <h2>문제1-2. </h2>
//         <button onClick={onClickBtn}>{show ? "보이기" : "숨기기"}</button>
//         {show && <p> " 이 문구는 보이기 상태일 때만 볼 수 있습니다 " </p>}
//       </div>
//     </>
//   );
// }
// export default Q1;

// const Message = styled.p`
//   color: ${(props) => (props.valid ? "green" : "red")};
// `;

// const S = {
//   Message,
// };
