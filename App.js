
import './App.css';
import { useState } from 'react';

function App(){
 
  let [글제목, 글변경] = useState( ['남자코트 추천', '강남 우동맛집', '파이썬 독학'] );
  let [ 따봉, 따봉변경 ] = useState([0,0,0,]);
  let [modal, setModal] = useState(false);
// 동적인 UI만들기
// 1. html css로 미리 디자인해놓고 
// 2. 현재 UI의 상태를 state로 만들어두고
// 3. state 종류에 따라서 UI가 어떻게 보일지 작성 
// 이제 나중에 필요할 때 스위치 (state) 조작만 하면됨
  let [title, setTitle] = useState(0);
  //모달창에 각 다른 제목 나오게 하려면 ->바뀌니까 동적인 UI
  let [입력값 , 입력값변경] = useState('');

  


  return (

    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>

      <div className="button">
      <button onClick={()=>{
        let copy = [...글제목];
        copy.sort();
        글변경(copy)}}>글정렬</button>

      <button onClick={()=>{
        let copy = [...글제목];
        copy[0]='여자코트추천';
        글변경(copy)}}>글변경</button>
      </div>
{/* 
      <div className="list">
        <h4>{글제목[0]}
        <span onClick={()=>{따봉변경(따봉+1)}}>👍🏻</span> {따봉} </h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={()=>{ setModal(true)} }>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}


          { //map함수 - 1.왼쪽 array 자료만큼 내부코드 실행해줌 /  2.return오른쪽에 있는걸 array로 담아줌 / 3.유용한 파라미터 2개 사용가능 (a,i)
    
            글제목.map(function(a , i ){ //글제목 state만큼 반복 , a는 파라미터, array안에 있던 데이터,i는 반복문 돌 떄마다 0부터 1씩 증가하는 정수
              return(
              <div className="list" key={i}>
              <h4 onClick={()=>{ setModal(true); setTitle(i); } }>{ 글제목[i]} <span onClick={(e)=>{ e.stopPropagation(); //상위 html로 퍼지는 이벤트 버블링 막고싶을떄,👍🏻누르면 모달창안뜨게
                let copy = [...따봉]; //state가 array자료일 경우 복사부터 하고 수정
                copy[i]++;
                따봉변경(copy);
                }}>👍🏻</span> {따봉[i]} </h4>
              <p>2월 17일 발행</p>

              <button onClick={()=>{
                let copy = [...글제목];
                copy.splice(i,1);//splice() 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경, splice(A,B) : A번 인덱스 요소부터 B개를 삭제
                글변경(copy);
                }}>삭제</button>


            </div>
              )
            })
          }

            <input onChange={(e)=>{입력값변경(e.target.value);
              console.log(입력값)}}/>

              <button onClick={()=>{
                let copy = [...글제목];
                copy.unshift(입력값);//배열 맨앞 추기
                글변경(copy);
              }}>글발행</button>
            {/* onChange -> <input>에 입력시 코드 실행이 되게 하고 싶을떄 */}
      {
        modal == true ? <Modal title={title} 글변경={글변경} 글제목={글제목} /> : null
      }
          {/* 부모->자식 state전송하는 법 1.<자식컴포넌트 작명={state이름}> / 2.자식함수 props파라미터 등록 후 props.작명 사용 */}
    </div>
  );
}


function Modal(props){
  // 자식함수 props파라미터 등록 
  return (
    <div className="modal">
      {/* 다양한 색의 모달창이 필요하면 props로 구멍을 뚫어놓는다  */}
      <h4>  {props.글제목[props.title]} </h4>  
      {/* {글제목[0]}하면 에러나는 이유 -> 해당함수는 함수 밖을 빠져나올 수 없다 ->이떄 props써준다 -> 자식이 부모가 가지고 있던 state 사용가능*/}
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{props.글변경(['여자코트 추천', '강남 우동맛집', '파이썬 독학'])}}>글수정</button>
      {/* 글수정 버튼을 누르면 남자코트 추천 -> 여자코트 추천으로 바뀌도록 */}








    </div>
  )
}

export default App;
