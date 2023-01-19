import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

const NotFound = () => {
	return (
		<Layout>
			<section>
				<div className="container">
					<div className="--center-all">
						<h1>Opps!!! Looks like you are lost</h1>
						<p>It appears this page does not exist, please go back to home</p>
						<br />
						<Link href="/">
							<button className="--btn --btn-primary">Back To Home</button>
						</Link>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default NotFound;
