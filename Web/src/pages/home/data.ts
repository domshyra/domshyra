import { about, skills, stations, work } from "@constants/routes";

import { HomeSection } from "@fragments/HomeSection";
import { aboutMeElevatorPitch } from "@constants/data";

export const workHistory = "Work History";
export const skillsTitle = "Skills";
export const aboutMeTitle = "About Me";

export const data: HomeSection[] = [
	{
		title: "Stations",
		description:
			"Radio stations I've curated on <b>Spotify</b> for different seasons, moods, and activities. From hip hop to instrumentals, I have a love of music and sharing it is the oldest form of story telling.",
		link: stations,
	},
	{
		title: aboutMeTitle,
		description: aboutMeElevatorPitch,
		link: about,
	},
	{
		title: workHistory,
		link: `${about}/${work}`,
		show: false,
		description:
			"Senior Full Stack Software Engineer with a Bachelor's in Computer Science, working in <b>React, .NET, Azure, SQL</b>, and <b>Terraform</b>, delivering web-based SaaS applications that are scalable, intuitive, and impactful. I’ve built tools for companies like <b>Tesla, SpaceX, Nike, Meta</b>, and <b>Intel</b> at Currie & Brown, as well as modernized core systems at WSRB.",
	},
	{
		title: skillsTitle,
		link: `${about}/${skills}`,
		show: false,
		description:
			"Building scalable, cloud-based applications using <b>C#, .NET, React, TypeScript, JavaScript, HCL, and SQL</b>. My work spans intuitive front-end development in <b>React</b>, to back-end systems with <b>Entity Framework</b> and secure <b>REST APIs</b>. Using Microsoft Azure with Terraform, supported by automated testing with <b>Selenium, Jest, Vitest, Xunit, and React Testing Library</b>. I focus on clean architecture, efficient workflows, and mentoring teams to uphold strong coding standards and best practices.",
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
