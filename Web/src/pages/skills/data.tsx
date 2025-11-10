import {
	cSharp,
	currieAndBrown,
	dotNet,
	entityFramework,
	hcl,
	javaScript,
	jest,
	react,
	reactTestingLibrary,
	selenium,
	sql,
	typeScript,
	vitestLabel,
	wsrb,
	xunit,
} from "@constants/common";
import dayjs, { Dayjs } from "dayjs";

import BusinessIcon from "@mui/icons-material/Business";
import CloudIcon from "@mui/icons-material/Cloud";
import CodeIcon from "@mui/icons-material/Code";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

type Category = {
	title: string;
	skills: SkillBase[] | ProgrammingSkill[];
};

type SkillBase = {
	title: string;
	start: Dayjs;
	end?: Dayjs;
};

export type ProgrammingSkill = {
	companies: string[];
	rating: "beginner" | "intermediate" | "advanced";
} & SkillBase;

const languages: Category = {
	title: "Languages",
	skills: [
		{
			title: cSharp,
			start: dayjs("2017-01-01"),
			companies: [currieAndBrown, wsrb],
			rating: "advanced",
		},
		{
			title: typeScript,
			start: dayjs("2022-01-01"),
			companies: [wsrb],
			rating: "advanced",
		},
		{
			title: javaScript,
			start: dayjs("2017-01-01"),
			companies: [wsrb],
			rating: "advanced",
		},
		{
			title: sql,
			start: dayjs("2017-01-01"),
			companies: [currieAndBrown, wsrb],
			rating: "intermediate",
		},
		{
			title: hcl,
			start: dayjs("2024-01-01"),
			companies: [wsrb],
			rating: "intermediate",
		},
	],
};
const frameworks: Category = {
	title: "Frameworks",
	skills: [
		{
			title: dotNet,
			start: dayjs("2017-01-01"),
			companies: [currieAndBrown, wsrb],
			rating: "advanced",
		},
		{
			title: react,
			start: dayjs("2019-01-01"),
			companies: [currieAndBrown, wsrb],
			rating: "advanced",
		},
		{
			title: entityFramework,
			start: dayjs("2017-01-01"),
			companies: [currieAndBrown, wsrb],
			rating: "advanced",
		},
	],
};
const testing: Category = {
	title: "Testing",
	skills: [
		{
			title: selenium,
			start: dayjs("2021-01-01"),
			companies: [wsrb],
			rating: "intermediate",
		},
		{ title: xunit, start: dayjs("2017-01-01"), companies: [currieAndBrown, wsrb], rating: "intermediate" },

		{
			title: jest,
			start: dayjs("2021-01-01"),
			end: dayjs("2023-01-01"),
			companies: [wsrb],
			rating: "intermediate",
		},
		{
			title: vitestLabel,
			start: dayjs("2023-01-01"),
			companies: [wsrb],
			rating: "intermediate",
		},
		{
			title: reactTestingLibrary,
			start: dayjs("2021-01-01"),
			companies: [wsrb],
			rating: "intermediate",
		},
	],
};

export const categories: Category[] = [languages, frameworks, testing];

const programmingAndDevelopment = [
	"<b>Algorithm design & debugging</b>: applied in large-scale procurement and contractor comparison tools",
	"<b>REST API Development</b> with secure authentication (JWT, OAuth2, Identity)",
];

const cloudAndInfrastructure = [
	"<b>Microsoft Azure</b> (App Services, CosmosDB, SQL Server, Pipelines, Blob Storage)",
	"<b>Terraform </b>for Infrastructure as Code (IAC)",
	"<b>Azure DevOps</b> (CI/CD pipelines, YAML releases)",
	"<b>Cloud migration</b> of legacy apps to Azure",
	"<b>Sentry.io</b> for monitoring and debugging in production",
];

const architectureAndDesign = [
	"<b>Application architecture & solution design</b> (enterprise SaaS procurement systems, Unit Rate app, internal web apps)",
	"<b>UI/UX Design</b> with Figma and Photoshop. Creating reusable design patterns and React hooks for authentication & auto-saving",
	"<b>Cloud-scale systems:</b> tools managing over $1B in procurement items for clients like Tesla & SpaceX",
	"<b>PWA/SPA Proof of Concepts</b> for modern application experiences",
];

const collaborationAndLeadership = [
	"<b>Cross-team coordination</b>: facilitated technical meetings across engineering, QA, and operations",
	"<b>Mentorship</b>: React subject matter expert, presented TypeScript adoption, led code-first DB practices",
	"<b>Knowledge sharing</b>: presentations, proof-of-concepts, non-technical storytelling for stakeholders",
	"<b>Code quality & best practices</b>: enforced standards for maintainability and consistency across teams",
];

const domainExpertise = [
	"<b>Procurement & Cost Management Systems</b>: Built and maintained enterprise tools for Tesla, SpaceX, Nike, Meta, Intel",
	"<b>Contractor rate comparison systems</b>: Helped clients save millions in vendor negotiations",
	"<b>Insurance / Risk Data Applications</b>: Modernized WSRB’s core systems with cloud-based solutions",
];

export type SkillCard = {
	description: string[];
	categories?: Category[];
	title: string;
	icon: React.ReactElement;
};

const programming: SkillCard = {
	categories: categories,
	description: programmingAndDevelopment,
	title: "Programming & Development",
	icon: <CodeIcon sx={{ pr: 1 }} />,
};
const cloud: SkillCard = {
	description: cloudAndInfrastructure,
	title: "Cloud & Infrastructure",
	icon: <CloudIcon sx={{ pr: 1 }} />,
};
const architecture: SkillCard = {
	description: architectureAndDesign,
	title: "Architecture & Design",
	icon: <DesignServicesIcon sx={{ pr: 1 }} />,
};
const leadership: SkillCard = {
	description: collaborationAndLeadership,
	title: "Collaboration & Leadership",
	icon: <EmojiPeopleIcon sx={{ pr: 1 }} />,
};
const domain: SkillCard = {
	description: domainExpertise,
	title: "Domain Expertise",
	icon: <BusinessIcon sx={{ pr: 1 }} />,
};

const skillsList: SkillCard[] = [programming, cloud, architecture, leadership, domain];

export { skillsList };

const skillsHeader = [
	"<b>Languages & Frameworks</b>: C#, .NET (Core & Framework), React, TypeScript, JavaScript, SQL, Entity Framework (Code-First), HCL",
	"<b>Cloud & DevOps</b>: Microsoft Azure, Terraform (IaC), Azure DevOps (CI/CD, YAML pipelines), Docker, CosmosDB",
	"<b>Testing & QA</b>: Selenium, Jest, Vitest, Xunit, React Testing Library, Test Automation Strategy",
	"<b>Architecture & Design</b>: Application architecture, Cloud-scale systems, UI/UX design (Figma), REST API development",
	"<b>Collaboration & Leadership</b>: Mentoring, Technical presentations, Cross-team coordination, Code standards & best practices",
	"<b>Domain Expertise</b>: Procurement & cost management systems, Contract negotiation tools, Insurance & risk data platforms",
];

export default skillsHeader;
