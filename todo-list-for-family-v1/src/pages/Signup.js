import React from 'react';
import Layout from '../components/Layout';

const Signup = () => (
  <Layout title="회원가입">
    <div className="flex flex-col items-center p-4">
      <h3 className="text-xl font-bold mb-4">계정 만들기</h3>
      <div className="flex flex-col items-center w-full max-w-md">
        <img
          src="assets/images/depth-4-frame-0@2x.png"
          alt="SignUp Banner"
          className="object-cover w-full h-60 mb-4"
        />
        <form className="w-full">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">이름</label>
            <input
              type="text"
              placeholder="이름"
              className="w-full h-12 px-4 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">성</label>
            <input
              type="text"
              placeholder="성"
              className="w-full h-12 px-4 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full h-12 px-4 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              패스워드를 입력해주세요 (8자 이상)
            </label>
            <input
              type="password"
              placeholder="패스워드"
              className="w-full h-12 px-4 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            가입 및 동의 버튼을 누름으로써 개인정보 처리방침을 읽었음을 인정하고 이용 약관에 동의함을 확인.
          </p>
          <button className="w-full h-12 bg-yellow-400 text-white font-bold rounded">
            회원가입 및 승인하기
          </button>
        </form>
      </div>
    </div>
  </Layout>
);

export default Signup;
