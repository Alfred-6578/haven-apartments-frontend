import { StandardsCardProps } from "@/types/standards";

const standards: StandardsCardProps[] = [
  {
    tag: "Power",
    title: "Power cuts shouldn't decide your evening.",
    description: "Inverter and generator in every home. Tested before every check-in. The lights stay on, the AC keeps running, your work doesn't pause.",
    image: "standard-power.jpeg",
  },
  {
    tag: "Wi-Fi",
    title: "Fast enough to actually work.",
    description: "Fiber connection in every property. We run a speed test before you arrive — if it's below the bar, we fix it before you notice.",
    image: "standard-wifi.jpeg",
  },
  {
    tag: "Kitchen",
    title: "Stocked for a real meal.",
    description: "Coffee, salt, oil, basics. A working fridge, a clean stove, sharp knives. Walk in, exhale, settle in. Cook if you want to.",
    image: "standard-kitchen.jpeg",
  },
  {
    tag: "Security",
    title: "Verified, gated, watched.",
    description: "Every home sits in a gated estate or secured building. 24/7 guards on site. Your check-in code is yours alone.",
    image: "standard-security.jpeg",
  },
  {
    tag: "Host",
    title: "Real humans. Real response times.",
    description: "Whatever the question, however small, whenever it comes up. We answer. Even at 2am. Even if it's just where to find good suya.",
    image: "standard-host.jpeg",
  },
];

export default standards;