import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const NotFound: NextPage = () => {
  return (
    <div>
      이 페이지는 존재하지 ㅇ낳습니다 .다른페이지를 검색해보세요
      <Link href="/">홈으로 돌아가기</Link>
    </div>
  );
};

export default NotFound;
