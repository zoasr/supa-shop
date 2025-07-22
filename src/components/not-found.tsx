import { Button } from '$/components/ui/button';
import { Link } from '@tanstack/react-router';

const NotFound = () => {
	return (
		<main className="container flex flex-col gap-8 justify-center items-center py-16 mx-auto text-center h-[70dvh]">
			<h1 className=" text-[clamp(3rem,8vw,9rem)] font-medium">404 Not Found</h1>
			<p>Your visited page not found. You may go home page.</p>
			<Link to="/">
				<Button>Back to home page</Button>
			</Link>
		</main>
	);
};

export default NotFound;
