import PropTypes from 'prop-types'

function NumberList({ numbers }) {
  return (
    <ul>
      {numbers.map((number) => (
        <li key={number.toString()}>{number}</li>
      ))}
    </ul>
  )
}

NumberList.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default NumberList
