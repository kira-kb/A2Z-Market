import { useState } from "react";
import {
  Slider,
  SliderThumb,
  SliderTrack,
  SliderRange,
} from "@radix-ui/react-slider";

export function DoubleSlider({
  min,
  max,
  step = 10,
}: {
  min: number;
  max: number;
  step?: number;
}) {
  const [values, setValues] = useState<[number, number]>([min, max]);
  const [hoveringThumb, setHoveringThumb] = useState<string | null>(null);

  const handleValueChange = (newValues: [number, number]) => {
    setValues(newValues);
  };

  return (
    <div className="w-full px-4 py-2">
      {/* Double slider with two handles */}
      <Slider
        value={values}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        className="relative flex items-center w-full h-10"
      >
        {/* Slider track: out-of-range areas will be dark gray */}
        <SliderTrack className="relative h-2 w-full rounded-full bg-gray-600">
          {/* Slider range: in-range area is blue */}
          <SliderRange className="absolute h-full rounded-full bg-blue-600" />
        </SliderTrack>

        {/* Left thumb */}
        <SliderThumb
          className="relative block w-5 h-5 bg-blue-500 rounded-full cursor-pointer shadow-lg"
          onMouseEnter={() => setHoveringThumb("Min")}
          onMouseLeave={() => setHoveringThumb(null)}
          aria-label="Minimum price"
        >
          {/* Hover effect for "Min" text */}
          {hoveringThumb === "Min" && (
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded">
              Min
            </span>
          )}
        </SliderThumb>

        {/* Right thumb */}
        <SliderThumb
          className="relative block w-5 h-5 bg-blue-500 rounded-full cursor-pointer shadow-lg"
          onMouseEnter={() => setHoveringThumb("Max")}
          onMouseLeave={() => setHoveringThumb(null)}
          aria-label="Maximum price"
        >
          {/* Hover effect for "Max" text */}
          {hoveringThumb === "Max" && (
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded">
              Max
            </span>
          )}
        </SliderThumb>
      </Slider>

      {/* Display the selected range */}
      <div className="flex justify-between">
        <span className="text-sm font-medium text-gray-100">
          Min: ${values[0]}
        </span>
        <span className="text-sm font-medium text-gray-100">
          Max: ${values[1]}
        </span>
      </div>
    </div>
  );
}
