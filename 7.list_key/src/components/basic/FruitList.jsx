
function FruitList() {
  const fruits = ['사과', '바나나', '체리']
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  )
}

export default FruitList
