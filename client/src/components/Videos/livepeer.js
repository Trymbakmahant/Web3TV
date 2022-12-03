import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import * as React from "react";

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

// Pass client to React Context Provider
function App() {
  return (
    <LivepeerConfig client={livepeerClient}>
      <CreateAndViewAsset />
    </LivepeerConfig>
  );
}
