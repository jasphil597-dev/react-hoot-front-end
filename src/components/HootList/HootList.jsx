// src/components/HootList/HootList.jsx
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './HootList.module.css';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';

const HootList = (props) => {
	return (
		<main className={styles.container}>
			{props.hoots.map((hoot) => (
				<Link key={hoot._id} to={`/hoots/${hoot._id}`}>
					<article>
						<header>
							<div>
								<h2>{hoot.title}</h2>
								<Icon category={hoot.category} />
							</div>
							<p>
								<AuthorInfo content={hoot} />
								{new Date(hoot.createdAt).toLocaleDateString()}
							</p>
						</header>
						<p>{hoot.text}</p>
					</article>
				</Link>
			))}
		</main>
	);
};

export default HootList;
