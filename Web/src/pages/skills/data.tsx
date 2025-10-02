import BusinessIcon from "@mui/icons-material/Business";
import CloudIcon from "@mui/icons-material/Cloud";
import CodeIcon from "@mui/icons-material/Code";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const programmingAndDevelopment = [
	"<b>Languages</b>: C#, JavaScript, TypeScript, SQL, HCL",
	"<b>Frameworks</b>: .NET (Framework & Core), React (Hooks, Redux, RTK Query), Entity Framework (Code-First)",
	"<b>Testing</b>: Selenium, Jest, Vitest, Xunit, React Testing Library",
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

export type Skill = {
	description: string[];
	title: string;
	icon: React.ReactElement;
};

const programming: Skill = {
	description: programmingAndDevelopment,
	title: "Programming & Development",
	icon: <CodeIcon sx={{ pr: 1 }} />,
};
const cloud: Skill = {
	description: cloudAndInfrastructure,
	title: "Cloud & Infrastructure",
	icon: <CloudIcon sx={{ pr: 1 }} />,
};
const architecture: Skill = {
	description: architectureAndDesign,
	title: "Architecture & Design",
	icon: <DesignServicesIcon sx={{ pr: 1 }} />,
};
const leadership: Skill = {
	description: collaborationAndLeadership,
	title: "Collaboration & Leadership",
	icon: <EmojiPeopleIcon sx={{ pr: 1 }} />,
};
const domain: Skill = {
	description: domainExpertise,
	title: "Domain Expertise",
	icon: <BusinessIcon sx={{ pr: 1 }} />,
};

const skillsList: Skill[] = [programming, cloud, architecture, leadership, domain];

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
