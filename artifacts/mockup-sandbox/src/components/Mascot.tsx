// Pure-CSS Rita mascot — two sizes of the exact same character.
//
// LogoMascot replaces the letter "O" in the TELOS wordmark (topbar, chat head).
// Avatar is the large breathing centrepiece used on welcome / results / chat
// with optional talk + scan states driven by the speech engine.
//
// Absolutely no raster assets — the shipped demo identity is 100% CSS and we
// want the exact same look pixel-for-pixel, so colours and geometry here
// mirror the tokens and structure defined in index.css.

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface LogoMascotProps {
  speaking?: boolean;
  size?: number;
}

/** Mini mascot — sits inside the TELOS wordmark as the "O". */
export function LogoMascot({ speaking = false, size = 34 }: LogoMascotProps) {
  const style = useMemo(
    () => ({ width: size, height: size }),
    [size]
  );
  return (
    <span
      className={cn("logo-mascot", speaking && "speaking")}
      style={style}
      aria-hidden="true"
    >
      <span className="m-face">
        <span className="m-plate" />
        <span className="m-eye left" />
        <span className="m-eye right" />
        <span className={cn("m-mouth", speaking && "talking")} />
      </span>
      <span className="m-scan" />
    </span>
  );
}

interface AvatarProps {
  speaking?: boolean;
  levelUp?: boolean;
  scan?: boolean;
  compact?: boolean;
}

/** The full centrepiece avatar — rings + breathing head + optional talking mouth. */
export function Avatar({
  speaking = false,
  levelUp = false,
  scan = true,
  compact = false,
}: AvatarProps) {
  return (
    <div
      className="avatar-shell"
      style={compact ? { padding: "10px 0" } : undefined}
      aria-hidden="true"
    >
      <span className="ring" />
      <span className="ring2" />
      <span className="ring3" />
      <div
        className={cn(
          "avatar",
          speaking && "speaking",
          levelUp && "level-up"
        )}
        style={compact ? { width: 120, height: 120 } : undefined}
      >
        {scan && <span className="scan" />}
        <div className="face">
          <span className="head-plate" />
          <span className="eye left" />
          <span className="eye right" />
          <span className={cn("mouth", speaking && "talking")} />
        </div>
      </div>
    </div>
  );
}
