// =======================================
// IntermediateExamples.jsx
// 중급 문제 예제 모음
// =======================================
import React, { useState } from 'react'

// 1. 동적 리스트 추가
function TodoAdder() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }])
      setInput('')
    }
  }

  return (
    <div>
      <h3>할 일 추가</h3>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>추가</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  )
}

// 2. 리스트 항목 삭제
function DeletableList({ initialItems }) {
  const [items, setItems] = useState(initialItems)

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div>
      <h3>항목 삭제</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => deleteItem(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// 3. 리스트 항목 수정
function EditableList({ initialItems }) {
  const [items, setItems] = useState(initialItems)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const saveEdit = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, text: editText } : item
      )
    )
    setEditingId(null)
  }

  return (
    <div>
      <h3>항목 수정</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editingId === item.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(item.id)}>저장</button>
              </>
            ) : (
              <>
                {item.text}
                <button
                  onClick={() => {
                    setEditingId(item.id)
                    setEditText(item.text)
                  }}
                >
                  수정
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// 4. 리스트 필터링
function FilteredList({ items }) {
  const [filter, setFilter] = useState('')
  const filteredItems = items.filter((item) =>
    item.toLowerCase().startsWith(filter.toLowerCase())
  )

  return (
    <div>
      <h3>리스트 필터링</h3>
      <input
        placeholder="검색"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

// 5. 리스트 정렬
function SortedList({ numbers }) {
  const sortedNumbers = [...numbers].sort((a, b) => a - b)

  return (
    <div>
      <h3>리스트 정렬</h3>
      <ul>
        {sortedNumbers.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
    </div>
  )
}

function IntermediateExamples() {
  const initialItems = [
    { id: 1, text: '첫 번째 아이템' },
    { id: 2, text: '두 번째 아이템' }
  ]
  const sampleItems = ['apple', 'banana', 'avocado', 'blueberry']
  const sampleNumbers = [42, 7, 15, 100, 56]

  return (
    <div>
      <TodoAdder />
      <DeletableList initialItems={initialItems} />
      <EditableList initialItems={initialItems} />
      <FilteredList items={sampleItems} />
      <SortedList numbers={sampleNumbers} />
    </div>
  )
}

export default IntermediateExamples