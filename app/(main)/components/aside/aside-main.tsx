import React from "react";
import AsideSearchComponent from "./search";
import PremiumAD from "./premium";
import WhatHappenig from "./what-is-happenig";
import OffersComponent from "./Offers";

function AsideComponent() {
  return (
    <div className="flex flex-col gap-6">
      <AsideSearchComponent />
      <PremiumAD />
      <WhatHappenig />
      <OffersComponent />
    </div>
  );
}

export default AsideComponent;
