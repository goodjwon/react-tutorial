// =======================================
// AdvancedExamples.jsx
// 고급 문제 예제 모음
// =======================================
import React, { useState } from 'react'

// 1. 중첩 리스트 렌더링
function NestedList({ categories }) {
  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          {category.name}
          <ul>
            {category.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

// 2. 리스트 페이징
function PagedList({ items }) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 5
  const pagedItems = items.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <div>
      <h3>리스트 페이징</h3>
      <ul>
        {pagedItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      <button
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        이전
      </button>
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={page * itemsPerPage >= items.length}
      >
        다음
      </button>
    </div>
  )
}

// 3. 리스트 검색
function SearchableList({ items }) {
  const [query, setQuery] = useState('')
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <h3>리스트 검색</h3>
      <input
        placeholder="검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

// 4. 리스트 항목 드래그 앤 드롭
function DraggableList() {
  const [items, setItems] = useState(['A', 'B', 'C', 'D'])
  const [draggedIndex, setDraggedIndex] = useState(null)

  const handleDragStart = (index) => {
    setDraggedIndex(index)
  }

  const handleDrop = (targetIndex) => {
    const newItems = [...items]
    const [draggedItem] = newItems.splice(draggedIndex, 1)
    newItems.splice(targetIndex, 0, draggedItem)
    setItems(newItems)
  }

  return (
    <div>
      <h3>드래그 앤 드롭</h3>
      <ul>
        {items.map((item, index) => (
          <li
            key={item}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            style={{
              cursor: 'move',
              opacity: draggedIndex === index ? 0.5 : 1
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function AdvancedExamples() {
  const categories = [
    {
      id: 1,
      name: '과일',
      items: ['사과', '바나나', '체리']
    },
    {
      id: 2,
      name: '야채',
      items: ['당근', '오이']
    }
  ]

  const itemsForPaging = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    text: `아이템 ${i + 1}`
  }))

  const searchableItems = ['React', 'Vue', 'Angular', 'Svelte', 'Next.js']

  return (
    <div>
      <NestedList categories={categories} />
      <PagedList items={itemsForPaging} />
      <SearchableList items={searchableItems} />
      <DraggableList />
    </div>
  )
}

export default AdvancedExamples