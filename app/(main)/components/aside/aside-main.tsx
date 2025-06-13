import React from "react";
import AsideSearchComponent from "./search";
import PremiumAD from "./premium";
import WhatHappenig from "./what-is-happenig";
import OffersComponent from "./Offers";
import JobsAside from "./jobs";

function AsideComponent() {
  return (
    <div className="flex flex-col gap-6">
      <AsideSearchComponent />
      <PremiumAD />
      <WhatHappenig />
      <OffersComponent />
      <JobsAside />
    </div>
  );
}

export default AsideComponent;
