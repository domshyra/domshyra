import { about, skills, stations, work } from "@constants/routes";
import { aboutMeElevatorPitch, skillsAboutSection, workAboutSection } from "@constants/data";

import { HomeSection } from "@fragments/HomeSection";

export const workHistory = "Work History";
export const skillsTitle = "Skills";
export const aboutMeTitle = "About Me";

export const data: HomeSection[] = [
	{
		title: "Stations",
		description: `Radio stations I've curated on <b>Spotify</b> for different seasons, moods, and activities. 
			From hip hop to instrumentals, I have a love of music and sharing it is the oldest form of story telling.
			I've always had an affinity for music, and I tread each playlist sorta like a radio station.`,
		link: stations,
	},
	{
		title: aboutMeTitle,
		description: aboutMeElevatorPitch,
		link: about,
	},
	{
		title: `${workHistory} & ${skillsTitle}`,
		link: `${about}/${work}`,
		show: true,
		description: workAboutSection,
	},
	{
		title: skillsTitle,
		link: `${about}/${skills}`,
		show: false,
		description: skillsAboutSection,
	},
	{
		title: "Github Projects",
		link: `${about}#github-projects`,
		show: false,
		description: "msal-selenium, this site, link to the playgrounds/Poc's.",
	},
	{
		title: "Outside of work projects",
		link: `${about}#outside-of-work-projects`,
		show: false,
		description:
			"Coding, making music and listening to and music history, architecture, skateboarding, motorcycles, self help / betterment, fashion and style.",
	},
];
