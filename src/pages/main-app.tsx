import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import store from "../store";
import BackgroundDisplay from "../components/background-display";
import ImageDisplay from "../components/image-display";
import PropertyController, {
  IPropertyList
} from "../components/property-controller";

export default () => {
  const [properties, setProperties] = useState({} as IPropertyList);

  const handlePropertyChange = (newProperties: IPropertyList) => {
    setProperties(newProperties);
  };

  if (!store.state.image) {
    return <Redirect to="/" />;
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
        }}
      >
        <BackgroundDisplay
          backgroundType={properties.backgroundType}
          src={properties.backgroundSource}
        />
        <ImageDisplay image={store.state.image} properties={properties} />
      </div>
      <PropertyController onPropertyChange={handlePropertyChange} />
    </>
  );
};
