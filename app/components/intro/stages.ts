export type SightStage = {
  /** Stage applies while the sight-loss value is above this number (100 -> 0). */
  above: number;
  label: string;
  /** Plain-language explanation, written for a general audience. */
  description: string;
};

export const SIGHT_STAGES: SightStage[] = [
  {
    above: 75,
    label: "Total Blindness",
    description:
      "No useful vision at all: everything is dark. People who are totally blind get around using touch, hearing, and memory, often with a cane, a guide dog, or braille.",
  },
  {
    above: 50,
    label: "Advanced Glaucoma",
    description:
      "Glaucoma damages the nerve that carries images from the eye to the brain. It usually takes away side vision first, so the world looks like it's being seen through a narrow tube, while central vision can remain for longer.",
  },
  {
    above: 25,
    label: "Cataract",
    description:
      "A cataract is a clouding of the eye's naturally clear lens. It makes everything look blurry, hazy, or dim, similar to looking through a foggy window. Cataracts usually develop slowly and can often be treated with surgery.",
  },
  {
    above: 0,
    label: "Macular Degeneration",
    description:
      "This condition damages the macula, the part of the eye responsible for sharp, central vision. It creates a blurred or missing patch right in the middle of view, while side vision usually stays normal.",
  },
  {
    above: -1,
    label: "Full Sight",
    description: "Vision without impairment: clear and complete, in both the centre and the sides of view.",
  },
];

export function stageForValue(value: number): SightStage {
  return (
    SIGHT_STAGES.find((stage) => value > stage.above) ??
    SIGHT_STAGES[SIGHT_STAGES.length - 1]
  );
}
