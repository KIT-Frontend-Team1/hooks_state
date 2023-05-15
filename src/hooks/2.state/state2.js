import { useState } from "react";
import styled from "styled-components";
import Comment from "../../components/2.state/comment";

// ➡️ 수정, 보완 코드
// ⭐ 이전 코드의 경우 하단 주석 처리
function State2() {
  /*  
    문제 2.

    Q1. 아래 작성된 state의 mock data를 활용하여
        댓글 목록을 화면에 랜더링 해보세요 :)
        Components는 src/components/state/comment.js를 활용하세요
        
    Q2. 댓글 작성 수정 삭제 기능을 구현해보세요 :)
            1. 댓글 작성 기능
            2. 댓글 수정 기능
            3. 댓글 삭제 기능 ( 본인이 작성한 댓글만 삭제할 수 있습니다, myComment 활용 )
    */

  const [post, setPost] = useState({
    title: "안녕하세요 여러분 김성용 강사입니다 :)",
    content: "오늘도 모두 화이팅입니다!",
    User: {
      nickname: "김성용",
      age: 20,
      height: 190,
    },
    Comments: [
      {
        User: {
          nickname: "김사과",
        },
        content: "오늘도 화이팅입니다!",
        myComment: false,
      },
      {
        User: {
          nickname: "반하나",
        },
        content: "오늘도 화이팅입니다!",
        myComment: false,
      },
      {
        User: {
          nickname: "오렌지",
        },
        content: "오늘도 화이팅입니다!",
        myComment: false,
      },
      {
        User: {
          nickname: "이멜론",
        },
        content: "오늘도 화이팅입니다!",
        myComment: false,
      },
      {
        User: {
          nickname: "박수박",
        },
        content: "오늘도 화이팅입니다!",
        myComment: false,
      },
    ],
  });

  /**
   * 수정 보완 코드 1 ~ 8 넘버링
   */

  const [newCo, setNewCo] = useState({
    nickname: "",
    content: "",
  });

  // 1. onChangeNicknameInput, onChangeContentInput 동일한 로직, 하나의 함수로 모듈화하여 재사용성 높임.
  const onChangeCommentInfoValue = (e, value) => {
    setNewCo({
      ...newCo,
      [value]: e.target.value,
    });
  };

  // Comment 추가 함수
  const onAddComment = (e) => {
    // 2. input 값 비어있으면 추가할 수 없게 ealry return 추가
    if (newCo.nickname === "" && newCo.content) return;
    // 새로운 댓글 객체
    const newCom = {
      User: {
        nickname: newCo.nickname, // input 입력값
      },
      content: newCo.content, // input 입력값
      myComment: true, // 자신이 쓴 댓글 조건 생성
    };

    // 새로운 댓글 앞에 추가하여 post 업데이트
    setPost((prevPost) => ({
      ...prevPost,
      Comments: [newCom, ...prevPost.Comments],
    }));
  };

  // 수정함수
  const onUpdateComment = (index, updateContent) => {
    // 수정한 댓글
    const updateComment = {
      ...post.Comments[index], // content 이외의 값은 그대로 복사
      content: updateContent,
    };
    // 댓글 목록 깊은 복사
    const updateComments = [...post.Comments];
    // 수정한 댓글 객체로 댓글 목록 변경, index로 확인하여 변경
    updateComments[index] = updateComment;

    // post 업데이트
    setPost((prevPost) => ({
      ...prevPost,
      Comments: updateComments,
    }));
  };

  // 삭제함수
  const onDeleteComment = (index) => {
    if (post.Comments[index].myComment === true) {
      // 3. 삭제 클릭 시 확인 메세지로 재확인 (UX 고려)
      if (window.confirm("정말 삭제하시겠습니까?")) {
        setPost((prevPost) => ({
          ...prevPost,
          Comments: prevPost.Comments.filter((_, i) => i !== index),
        }));
      }
    }
  };

  return (
    <S.Wrapper>
      <h1>문제2</h1>
      <S.PostBox>
        <S.PostTitle>제목: {post.title}</S.PostTitle>
        <S.PostContent>내용: {post.content}</S.PostContent>
      </S.PostBox>
      <S.PostInfo>
        <p>
          작성자: <span>{post.User.nickname}</span>
        </p>
        <p>
          작성자 나이: <span>{post.User.age}</span>
        </p>
        <p>
          작성자 키: <span>{post.User.height}</span>
        </p>
      </S.PostInfo>
      <div>
        <p>
          댓글 수: <span>{post.Comments.length}</span>
        </p>
        <input
          placeholder="작성자"
          value={newCo.nickname}
          onChange={(e) => onChangeCommentInfoValue(e, "nickname")}
        />
        <input
          placeholder="댓글 내용"
          value={newCo.content}
          onChange={(e) => onChangeCommentInfoValue(e, "content")}
        />
        <button onClick={onAddComment}>댓글 작성</button>
      </div>
      <S.CommentList>
        {/* list */}
        {post.Comments.map((item, index) => (
          <Comment
            key={index}
            name={item.User.nickname}
            content={item.content}
            onUpdate={(updateContent) => onUpdateComment(index, updateContent)}
            onDelete={() => onDeleteComment(index)}
          />
        ))}
      </S.CommentList>
    </S.Wrapper>
  );
}
export default State2;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div`
  background-color: #999;
  width: 360px;
  padding: 10px;
`;

const PostTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const PostContent = styled.p`
  color: #fff;
`;

const PostInfo = styled.div`
  width: 360px;
  border: 3px solid #f00;
  padding: 10px;
  margin: 10px;

  p {
    display: flex;
    justify-content: space-around;
  }

  span {
    font-weight: bold;
  }
`;

const CommentList = styled.ul`
  width: 960px;
`;

const S = {
  Wrapper,
  PostBox,
  PostTitle,
  PostContent,
  PostInfo,
  CommentList,
};

// ⭐ 기존 코드
// 새로운 댓글 초기값 newCo 라는 객체로 설정, 상태값 업데이트 위해 useState 사용
// const [newCo, setNewCo] = useState({
//   nickname: "",
//   content: "",
// });

// // 작성자 input 값 변경(입력)시 실행, newCo의 나머지 값은 유지, nickname만 입력값으로 변경
// const onChangeNicknameInput = (e) => {
//   setNewCo({
//     ...newCo,
//     nickname: e.target.value,
//   });
// };

// // 작성 댓글 input 값 변경(입력)시 실행, newCo의 나머지 값은 유지, content만 입력값으로 변경
// const onChangeContentInput = (e) => {
//   setNewCo({
//     ...newCo,
//     content: e.target.value,
//   });
// };

// // 댓글 작성 버튼 누르면 기존 post 객체에 새로운 Comment 객체값 추가 함수
// const onAddComment = () => {
//   // 새로운 댓글 객체
//   const newCom = {
//     User: {
//       nickname: newCo.nickname, // input 입력값
//     },
//     content: newCo.content, // input 입력값
//     myComment: true, // 자신이 쓴 댓글 조건 생성
//   };

//   // post 업데이트, 새로운 댓글 앞에 추가하고 나머지는 그대로 복사
//   setPost((prevPost) => ({
//     ...prevPost,
//     Comments: [newCom, ...prevPost.Comments],
//   }));
// };

// // 수정함수, 인덱스와 수정한 댓글의 내용을 인자로 받는다
// const onUpdateComment = (index, updateContent) => {
//   // 수정한 댓글
//   const updateComment = {
//     ...post.Comments[index], // content 이외의 값은 그대로 복사
//     content: updateContent,
//   };
//   // 댓글 목록 깊은 복사
//   const updateComments = [...post.Comments];
//   // 수정한 댓글 객체로 댓글 목록 변경, index로 확인하여 변경
//   updateComments[index] = updateComment;

//   // post 업데이트
//   setPost((prevPost) => ({
//     ...prevPost,
//     Comments: updateComments,
//   }));
// };

// // 삭제함수
// const onDeleteComment = (index) => {
//   // index를 인자로 받아와, post 객체의 Comments 배열에서 해당 인덱스와 맞지 않는 것만 필터링
//   if (post.Comments[index].myComment === true) {
//     // myComment가 true인 것만 삭제할 수 있는 기능
//     setPost((prevPost) => ({
//       ...prevPost,
//       Comments: prevPost.Comments.filter((_, i) => i !== index),
//     }));
//   }
// };

// return (
//   <S.Wrapper>
//     <h1>문제2</h1>
//     <S.PostBox>
//       <S.PostTitle>제목: {post.title}</S.PostTitle>
//       <S.PostContent>내용: {post.content}</S.PostContent>
//     </S.PostBox>
//     <S.PostInfo>
//       <p>
//         작성자: <span>{post.User.nickname}</span>
//       </p>
//       <p>
//         작성자 나이: <span>{post.User.age}</span>
//       </p>
//       <p>
//         작성자 키: <span>{post.User.height}</span>
//       </p>
//     </S.PostInfo>
//     <div>
//       <p>
//         댓글 수: <span>{post.Comments.length}</span>
//       </p>
//       <input
//         placeholder="작성자"
//         name="User.nickname"
//         value={newCo.nickname}
//         onChange={onChangeNicknameInput}
//       />
//       <input
//         placeholder="댓글 내용"
//         name="content"
//         value={newCo.content}
//         onChange={onChangeContentInput}
//       />
//       <button onClick={onAddComment}>댓글 작성</button>
//     </div>
//     <S.CommentList>
//       {/* list */}
//       {/* Q1. 댓글 목록을 컴포넌트로 가져오기, 컴포넌트에서 props로 속성을 전달하여 데이터를 map으로 순회하여 리턴하여 보여줌. */}
//       {post.Comments.map((item, index) => (
//         <Comment
//           key={index}
//           name={item.User.nickname}
//           content={item.content}
//           onUpdate={(updateContent) => onUpdateComment(index, updateContent)}
//           onDelete={() => onDeleteComment(index)}
//         />
//       ))}
//     </S.CommentList>
//   </S.Wrapper>
// );
// }
