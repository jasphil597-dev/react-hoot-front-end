import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import Icon from '../Icon/Icon';
import Loading from '../Loading/Loading';
import styles from './HootDetails.module.css';
import CommentForm from '../CommentForm/CommentForm';
import * as hootService from '../../services/hootService';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';

const HootDetails = (props) => {
	const user = useContext(AuthedUserContext);
	const { hootId } = useParams();
	const [hoot, setHoot] = useState();

	useEffect(() => {
		const fetchHoot = async () => {
			const hoot = await hootService.show(hootId);
			setHoot(hoot);
		};
		fetchHoot();
	}, [hootId]);

	const handleAddComment = async (commentFormData) => {
		const newComment = await hootService.createComment(hootId, commentFormData);
		setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
	};

	const handleDeleteComment = async (commentId) => {
		console.log('commentId:', commentId);
		// Eventually the service function will be called upon here
		hootService.deleteComment(hootId, commentId);
		setHoot({
			...hoot,
			comments: hoot.comments.filter((comment) => comment._id !== commentId),
		});
	};

	return (
		<>
			if (!hoot) return <Loading />
			return ( ... ) : (
			<main className={styles.container}>
				<header>
					<p>{hoot.category.toUpperCase()}</p>
					<h1>{hoot.title}</h1>
					// New div element:
					<div>
						<p>
							{hoot.author.username} posted on
							{new Date(hoot.createdAt).toLocaleDateString()}
						</p>
						{hoot.author._id === user._id && (
							<>
								<Link to={`/hoots/${hootId}/comments/${comment._id}/edit`}>
									<Icon category='Edit' />
								</Link>
								<button onClick={() => handleDeleteComment(comment._id)}>
									<Icon category='Trash' />
								</button>
							</>
						)}
					</div>
				</header>
				<p>{hoot.text}</p>
				{hoot.author._id === user._id && (
					<>
						<Link to={`/hoots/${hootId}/edit`}>Edit</Link>
						<button onClick={() => props.handleDeleteHoot(hootId)}>
							Delete
						</button>
					</>
				)}
				<>
					{hoot.comments.map((comment) => (
						<article key={comment._id}>
							<header>
								<AuthorInfo content={comment} />

								{comment.author._id === user._id && (
									<>
										<Link to={`/hoots/${hootId}/comments/${comment._id}/edit`}>
											<Icon category='Edit' />
										</Link>

										<button onClick={() => handleDeleteComment(comment._id)}>
											<Icon category='Trash' />
										</button>
									</>
								)}
							</header>
							<p>{comment.text}</p>
						</article>
					))}
					;
				</>

				{hoot.author._id === user._id && (
					<>
						<Link to={`/hoots/${hootId}/edit`}>Edit</Link>
						<link to={`/hoots/${hootId}/comments/${comment._id}/edit`} />
						<button
							onClick={() => {
								props.handleDeleteHoot(hootId);
							}}
						>
							Delete
						</button>
					</>
				)}
			</main>
		</>
	);
};

export default HootDetails;
