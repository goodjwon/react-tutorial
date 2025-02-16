function ColorList() {
  const colors = ['Red', 'Green', 'Blue']
  return (
    <ul>
      {colors.map((color) => (
        <li key={color}>{color}</li>
      ))}
    </ul>
  )
}

export default ColorList
