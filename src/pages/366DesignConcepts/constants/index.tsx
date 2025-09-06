/**
 * Constants for the 366 Design Concepts project
 *
 * This file serves as the central registry for all daily design concept components.
 * It exports an array of day components with their metadata including titles,
 * author information, and creation dates.
 *
 * The structure allows for easy addition of new design concepts as the project progresses
 * through the 366 days.
 */

import { author_rabithua } from "@/pages/366DesignConcepts/constants/author";
import DayZero from "@/pages/366DesignConcepts/dayZero";
import DayOne from "../dayOne";

/**
 * Array of day components used for rendering daily design concepts.
 * Each item in the array represents a specific day's content with associated metadata.
 *
 * @property {JSX.Element} component - React component to render for the day
 * @property {string} title - Title of the day's design concept
 * @property {Object} author - Author information object
 * @property {string} createAt - Creation date in YYYY-MM-DD format
 */
const daysComponents = [
  {
    component: <DayZero />,
    title: "Note",
    author: author_rabithua,
    createAt: "2024-09-05",
  },
  {
    component: <DayOne />,
    title: "Note",
    author: author_rabithua,
    createAt: "2024-09-05",
  }
];

export { daysComponents };
