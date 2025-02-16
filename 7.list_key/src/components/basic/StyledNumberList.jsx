import PropTypes from 'prop-types'

function StyledNumberList({ numbers }) {
  return (
    <ul>
      {numbers.map((number) => (
        <li
          key={number}
          style={{
            color: number % 2 === 0 ? 'blue' : 'red'
          }}
        >
          {number}
        </li>
      ))}
    </ul>
  )
}

StyledNumberList.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default StyledNumberList
