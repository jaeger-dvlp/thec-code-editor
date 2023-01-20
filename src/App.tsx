import React from "react";
import { useIntl } from "react-intl";

function App() {
  const { formatMessage } = useIntl();
  return (
    <div className="bg-black flex justify-center items-center h-screen text-white">
      <h1>{formatMessage({ id: "helloworld" })}</h1>
    </div>
  );
}

export default App;
