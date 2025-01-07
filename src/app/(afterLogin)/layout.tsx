export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>애프트로그인 로그아웃</div>
      {children}
    </div>
  );
}
