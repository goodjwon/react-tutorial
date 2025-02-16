import NumberList from './components/basic/NumberList'
import FruitList from './components/basic/FruitList'
import UserList from './components/basic/UserList'
import ColorList from './components/basic/ColorList'
import StyledNumberList from './components/basic/StyledNumberList'

function BasicExamples() {
  const sampleNumbers = [1, 2, 3, 4, 5]
  const sampleUsers = [
    { id: 1, name: '홍길동' },
    { id: 2, name: '김철수' }
  ]

  return (
    <div>
      <h2>기본 리스트 렌더링</h2>
      <NumberList numbers={sampleNumbers} />

      <h2>키 사용</h2>
      <FruitList />

      <h2>객체 배열 렌더링</h2>
      <UserList users={sampleUsers} />

      <h2>인덱스를 키로 사용하지 않기</h2>
      <ColorList />

      <h2>리스트에 스타일 적용</h2>
      <StyledNumberList numbers={sampleNumbers} />
    </div>
  )
}

export default BasicExamples
