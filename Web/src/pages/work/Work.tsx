import AboutDetails from "@sections/about/AboutDetails";

const Work = () => {
	/* This will prob end up being it's own page, make sure to show responsibilities and what I did to make the company better. */
	/* TODO:? would also be cool to build a timeline in the work history page */
	/* What was the most fun thing I could work on for each project? C&B was the tree's and what if for blocks */
	/* templates and msal-selenium for wsrb, modernizing things and bringing the team new technologies and best practices, for many a things */
	return (
		<>
			<AboutDetails title="Wsrb" content="wsrb, currie and brown(add clients), arvixe, j crew" />
			<AboutDetails title="Currie & Brown" content="wsrb, currie and brown(add clients), arvixe, j crew" />
			<AboutDetails title="Arvixe" content="wsrb, currie and brown(add clients), arvixe, j crew" />
			<AboutDetails title="J. Crew" content="wsrb, currie and brown(add clients), arvixe, j crew" />
		</>
	);
};
export default Work;
