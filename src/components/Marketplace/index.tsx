import type { NextPage } from "next";
import { useState } from "react";
import { Container } from "../common/Container";
import { Feed } from "../shared/Feed";
import { GetBackToTop } from "../shared/GetBackToTop";
import { CreateOfert } from "./CreateOfert";
import { Filter, Filters } from "./Filter";

export const Marketplace: NextPage = () => {
  const [filters, setFilters] = useState<Filters>({
    title: undefined,
    condition: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    category: undefined,
  });

  return (
    <Container title="Marketplace">
      <div className="py-4">
        <GetBackToTop />
        <div className="mx-auto flex max-w-xl flex-col gap-4">
          <Filter data={filters} setData={(val: Filters) => setFilters(val)} />
          <CreateOfert />
        </div>
        <Feed type="ofert" filters={filters} />
      </div>
    </Container>
  );
};
