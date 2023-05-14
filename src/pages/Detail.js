import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import productList from "../__mock__/products.json";
import styled from "styled-components";

//상품 클릭하면 이동되는 디테일 페이지
function DetailPage() {
  const params = useParams();
  const products = productList.products;

  const [data, setData] = useState();

  //params가 바뀌면 (url에서 해당 상품번호가 바뀌면) 해당 param과 produceNumber가
  //일치하는 product의 data를 앞에서 선언한 data라는 state에 넣어줌
  useEffect(() => {
    const targetProduct = products.find((product) => {
      return product.productNumber === params.productNumber;
    });
    setData(targetProduct);
  }, [params]);

  //상세페이지에 렌더링 되는 ui
  return (
    data && (
      <Wrapper>
        <Title>Detail Info</Title>
        <InfoContainer>
          <div>name : {data.productName}</div>
          <div>number : {data.productNumber}</div>
          <div>price : {data.productPrice}</div>
          <div>size : {data.productSize}</div>
          <div>rating : {data.productRating}</div>
          <div>review : {data.productReview}</div>
        </InfoContainer>
        <Title>Review</Title>
        {data.Review.map((review) => {
          return (
            <ReviewContainer>
              <div>{review.reviewer}</div>
              <div>{review.review}</div>
              <div>{review.rating}</div>
            </ReviewContainer>
          );
        })}
      </Wrapper>
    )
  );
}
export default DetailPage;

const ReviewContainer = styled.div`
  height: 30px;
  width: 300px;
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: black;
  margin: 0 auto;
`;

const InfoContainer = styled.div`
  height: 200px;
  width: 300px;
  margin: 0 auto;
  font-size: 20px;
  margin-top: 20px;
`;

const Title = styled.div`
  font-size: 30px;
`;

const Wrapper = styled.div`
  margin-top: 40px;
`;

{
  /* 
      상세 페이지는 자유롭게 꾸미시면 됩니다.
      아직 해당 부분의 진도가 나가지 않았기 때문에 주소의 파람을 가지고 올 수 있는 방법은
      미리 콘솔에 찍어두었습니다.

      단, 없는 번호 상품으로 접근 시 state페이지로 돌아가도록 구현해주세요
    */
}
