export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>홈레이아웃{children}</div>;
}
