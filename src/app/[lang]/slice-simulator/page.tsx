"use client";

import { SliceSimulator } from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { components as componentsHeros } from "@/sections/heroes";
import { components as componentsSlices } from "@/sections/slices";
import { components as componentsBoiler } from "@/sections/boiler";

export default function SliceSimulatorPage() {
  return (
    <SliceSimulator
      sliceZone={props => (
        <SliceZone
          {...props}
          components={{
            ...componentsHeros,
            ...componentsSlices,
            ...componentsBoiler
          }}
        />
      )}
    />
  );
}
