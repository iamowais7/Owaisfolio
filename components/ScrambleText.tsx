"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>?/";

interface Props {
  text: string;
  trigger: boolean;
  className?: string;
  delay?: number;
}

export default function ScrambleText({ text, trigger, className, delay = 0 }: Props) {
  const [output, setOutput] = useState(text);
  const rafRef     = useRef(0);
  const timerRef   = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!trigger) return;
    cancelAnimationFrame(rafRef.current);
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      let iteration = 0;
      const FRAMES_PER_CHAR = 3;
      const totalFrames = text.replace(/ /g, "").length * FRAMES_PER_CHAR;

      const tick = () => {
        iteration++;
        const settled = Math.floor(iteration / FRAMES_PER_CHAR);

        setOutput(
          text.split("").map((char, i) => {
            if (char === " ") return " ";
            if (i < settled) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );

        if (iteration <= totalFrames + 3) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setOutput(text);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    };
  }, [trigger, text, delay]);

  return <span className={className}>{output}</span>;
}
