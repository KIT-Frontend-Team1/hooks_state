import styled from "styled-components";

function ProductCard(product) {
  const { onNavigate, name, price, size, rating, review, number } = product;

  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <S.Item onClick={onNavigate}>
      <h4>{name}</h4>
      <p>상품번호: {number}</p>
      <p>가격: {priceToString(price)}원</p>
      <p>사이즈: {size}</p>
      <p>평점: {rating}</p>
      <p>리뷰: {review}</p>
    </S.Item>
  );
}
export default ProductCard;

const Item = styled.li`
  border: 1px solid #000;
  cursor: pointer;
  width: 300px;
  margin: 16px auto;
`;

const S = {
  Item,
};
