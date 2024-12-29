import React from 'react';
import Layout from '../components/Layout';

const InputTask = () => (
  <Layout title="새 할일 입력">
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">새 할일</h3>
      <form className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">할일 제목</label>
          <input
            type="text"
            placeholder="Title"
            className="w-full h-12 px-4 border border-gray-300 rounded bg-amber-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">카테고리</label>
          <div className="flex flex-wrap gap-2">
            {['생일모임', '여행', '장례식장', '명절모임', '결혼모임'].map((category) => (
              <button
                key={category}
                type="button"
                className="border border-indigo-200 rounded bg-transparent px-4 py-2 text-sm text-gray-600"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">참여 요청</label>
          <div className="h-12 px-4 border border-gray-300 rounded bg-amber-50 flex items-center">
            <span className="text-sm text-gray-700">이채훈, 이채연, 박은서, 모두</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">메모</label>
          <textarea
            rows="4"
            placeholder="메모를 입력하세요."
            className="w-full px-4 py-2 border border-gray-300 rounded bg-amber-50 text-sm"
          />
        </div>
        <button className="w-full h-12 bg-yellow-400 text-white font-bold rounded">
          저장하기
        </button>
      </form>
    </div>
  </Layout>
);

export default InputTask;
