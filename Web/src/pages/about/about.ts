import { AboutDetailsProps } from "@sections/about/AboutDetails";

//TODO! add bold facing some how to the data
const jobDescription: AboutDetailsProps[] = [
	{
		company: "Currie & Brown",
		title: "Full Stack Developer / Lead UI/UX Designer",
		description:
			"At Currie & Brown, I designed and built enterprise software that supported some of the world’s most innovative companies, including <b>Tesla, SpaceX, Nike, Meta, and Intel</b>. My work combined usability, performance, and system reliability to solve billion-dollar challenges in procurement and vendor management.",
		bullets: [
			"Built procurement platforms that tracked over <b>$1B in items</b>, ensuring accurate real-time cost visibility for stakeholders, with <b>role-based access controls</b> for data security and business compliance.",
			"Designed the <b>Unit Rate app</b>, a tool that benchmarked contractor bids (e.g., duct wire) and helped companies negotiate from strength, saving <b>millions in vendor contracts.</b>",
			"Created intuitive dashboards, tables, and reporting interfaces that transformed massive datasets into actionable insights.",
			"Delivered scalable solutions in Azure environments using <b>C#, .NET (Framework & Core), SQL Server, JavaScript, jQuery, Sass, Webpack, DevExpress, Xunit</b>.",
		],
	},
	{
		company: "WSRB",
		title: "Software Engineer II",
		description:
			"At WSRB, I worked as a full stack engineer delivering modern web applications for both internal and external customers. My contributions focused on building reusable frameworks, streamlining cloud deployments, and raising technical quality.",
		bullets: [
			"Built <b>React front ends with .NET back ends</b>, including reusable hooks for authentication and autosaving, and acted as the team’s React subject matter expert.",
			"Migrated on-premises applications to the cloud with <b>Azure DevOps pipelines</b>, improving performance and scalability.",
			"Introduced <b>code-first database practices (SQL/C#)</b> and development tools like Redux, RTK Query, and TypeScript, improving maintainability and supporting a fail-fast, fix-quick approach.",
			"Automated testing pipelines with <b>Selenium, Jest, and Xunit</b>, establishing a test-driven development strategy.",
			"Advocated for code standards and best practices, making the codebase more consistent and maintainable.",
			"Shared knowledge through presentations, proof-of-concepts, and team discussions, often explaining technical concepts with stories and analogies to make them accessible.",
		],
	},
	{
		company: "WSRB",
		title: "Senior Software Engineer",
		description:
			"As a Senior Software Engineer, I focused on architecture, DevOps automation, and building reusable systems that accelerated development across teams.",
		bullets: [
			"Created <b>templates for React components, APIs, databases, pipelines, and Terraform modules</b>, giving new projects a strong foundation and saving significant time modernizing legacy applications.",
			"Designed and collaborated on <b>UI/UX flows in Figma</b>, ensuring functional and user-friendly interfaces.",
			"Refactored Azure DevOps pipelines into YAML, simplifying deployments and creating a consistent release process.",
			"Partnered with DevOps to adopt Terraform (IaC), moving from manual Azure portal configurations to automated, reliable infrastructure.",
			"Introduced Sentry.io for monitoring and troubleshooting, reducing debugging time and improving reliability.",
			"Automated <b>GIS testing workflows</b>, reducing hours of manual monthly testing into repeatable, automated integration tests driven by Excel inputs.",
			"Developed proofs of concept for <b>progressive web apps (PWAs) and single-page applications (SPAs) to modernize legacy systems.</b>",
		],
	},
];

export { jobDescription };
