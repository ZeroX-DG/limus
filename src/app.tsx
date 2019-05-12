import React, { useState } from "react";
import BackgroundDisplay from "./components/background-display";
import ImageDisplay from "./components/image-display";
import PropertyController, { IPropertyList } from "./components/property-controller";

export default () => {
  const [properties, setProperties] = useState({} as IPropertyList);

  const handlePropertyChange = (newProperties: IPropertyList) => {
    setProperties(newProperties);
  }

  return (
    <>
      <div
        id="export-region"
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: "0",
          left: "0"
        }}>
        <BackgroundDisplay
          backgroundType={properties.backgroundType}
          src={properties.backgroundSource}
        />
        <ImageDisplay
          image="https://res.cloudinary.com/practicaldev/image/fetch/s--Sb970a_9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://huytd.github.io/img/custom-emacs.png"
          properties={properties} />
      </div>
      <PropertyController onPropertyChange={handlePropertyChange} />
    </>
  )
}
