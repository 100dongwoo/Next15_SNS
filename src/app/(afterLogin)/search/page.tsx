import style from "./search.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Tab from "@/app/(afterLogin)/search/_component/Tab";
import SearchResult from "./_component/SearchResult";
import { Metadata, ResolvingMetadata } from "next";

type PageProps = {
  searchParams: Promise<{ q: string; f?: string; pf?: string }>;
};

export async function generateMetadata(
  { searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { q } = await searchParams;
  console.log("parent", parent);
  return {
    title: `${q} - 검색 / Z`,
    description: `${q} - 검색 / Z`,
  };
}

export default async function Search({ searchParams }: PageProps) {
  const query = await searchParams;

  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={query.q} f={query.f} pf={query.pf} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <SearchResult searchParams={query} />
      </div>
    </main>
  );
}
