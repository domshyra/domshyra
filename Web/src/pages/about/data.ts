import { about, work } from "@constants/routes";

export const workHistory = "Work History";

export const data = [
	{
		title: workHistory,
		link: `${about}/${work}`,
		description:
			"Senior Full Stack Software Engineer with a Bachelor's in Computer Science, working in <b>React, .NET, Azure, SQL</b>, and <b>Terraform</b>, delivering web-based SaaS applications that are scalable, intuitive, and impactful. I’ve built tools for companies like <b>Tesla, SpaceX, Nike, Meta</b>, and <b>Intel</b> at Currie & Brown, as well as modernized core systems at WSRB.",
	},
	{
		title: "Skills",
		link: `${about}#skills`,
		show: false,
		description: "Web, backend, dev ops, code quality and making connections across teams, managing templates and ensuring testing.",
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
