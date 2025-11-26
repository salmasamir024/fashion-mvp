import React from "react";
import { RotateCcw, Info, Download } from "lucide-react";

export default function BodyShapeResult({
  imageSrc,
  measurements = {}, // { shoulders, bust, waist, hips, height, weight }
  shapeName = "Hourglass",
}) {
  return (
    <div
      className="relative w-full h-screen overflow-hidden flex items-center justify-center rounded-lg
      bg-gradient-to-b from-[#003049] via-[#006d77] to-[#00f5d4]"
    >
      {/* Neon Turquoise Glow */}
      <div className="absolute inset-0 bg-[#00fff2] opacity-20 blur-[120px]"></div>

      {/* GRID Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal Lines */}
        {Array.from({ length: 22 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 w-full border-t border-white/10"
            style={{ top: `${(i / 22) * 100}%` }}
          />
        ))}

        {/* Vertical Lines */}
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 h-full border-l border-white/10"
            style={{ left: `${(i / 16) * 100}%` }}
          />
        ))}
      </div>

      {/* Icons */}
      <div className="absolute top-6 left-6 text-white">
        <Info
          size={34}
          className="opacity-90 hover:opacity-100 cursor-pointer drop-shadow-[0_0_8px_#00eaff]"
        />
      </div>

      <div className="absolute top-6 right-6 text-white flex gap-5">
        {/* <RotateCcw
          size={34}
          className="opacity-90 hover:opacity-100 cursor-pointer drop-shadow-[0_0_8px_#00eaff]"
        /> */}
        <Download
          size={34}
          className="opacity-90 hover:opacity-100 cursor-pointer drop-shadow-[0_0_8px_#00eaff]"
        />
      </div>

      {/* TITLES (Neon Glow) */}
      <div className="absolute top-20 text-center">
        <h1 className="text-white text-4xl font-extrabold drop-shadow-[0_0_14px_#00faff] tracking-wide">
          Body Shape Result
        </h1>
        <p className="text-[#a8fff6] text-2xl mt-2 drop-shadow-[0_0_8px_#00faff]">
          {shapeName}
        </p>
      </div>

      {/* HEIGHT + WEIGHT */}
      <div className="absolute top-40 left-10 text-white/90 text-lg drop-shadow-[0_0_8px_#00eaff]">
        Height: {measurements.height} cm
      </div>

      <div className="absolute top-40 right-10 text-white/90 text-lg drop-shadow-[0_0_8px_#00eaff]">
        Weight: {measurements.weight} kg
      </div>

      {/* BODY IMAGE */}
      <div className="relative top-20 w-full max-w-[280px] flex justify-center items-center">
        <img
          src={imageSrc}
          alt="shape"
          className="w-full object-contain drop-shadow-[0_0_25px_white] border-white/0 border-[1.5px] rounded-xl"
        />

        {/* LABEL STYLE: ◉── 92cm */}
        {/* SHOULDER */}
        <div className="absolute right-0 top-[28%] flex items-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
          <div className="w-8 h-[2px] bg-white/70" />
          <span className="text-white text-sm drop-shadow-[0_0_6px_#00eaff]">
            {measurements.shoulders} cm
          </span>
        </div>

        {/* BUST */}
        <div className="absolute left-0 top-[41%] flex items-center gap-2">
          <span className="text-white text-sm drop-shadow-[0_0_6px_#00eaff]">
            {measurements.bust} cm
          </span>
          <div className="w-8 h-[2px] bg-white/70" />
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
        </div>

        {/* WAIST */}
        <div className="absolute right-0 top-[58%] flex items-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
          <div className="w-8 h-[2px] bg-white/70" />
          <span className="text-white text-sm drop-shadow-[0_0_6px_#00eaff]">
            {measurements.waist} cm
          </span>
        </div>

        {/* HIPS */}
        <div className="absolute right-0 top-[79%] flex items-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
          <div className="w-8 h-[2px] bg-white/70" />
          <span className="text-white text-sm drop-shadow-[0_0_6px_#00eaff]">
            {measurements.hips} cm
          </span>
        </div>
      </div>
    </div>
  );
}
