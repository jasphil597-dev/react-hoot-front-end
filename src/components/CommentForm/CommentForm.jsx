// src/components/CommentForm/CommentForm.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CommentForm.module.css';
import Icon from '../Icon/Icon';
import * as hootService from '../../services/hootService';

const CommentForm = (props) => {
	const [formData, setFormData] = useState({ text: '' });

	const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value });
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		if (hootId && commentId) {
			hootService.updateComment(hootId, commentId, formData);
			navigate(`/hoots/${hootId}`);
		} else {
			props.handleAddComment(formData);
		}
		setFormData({ text: '' });
	};
	const { hootId, commentId } = useParams();
	// src/components/CommentForm/CommentForm.jsx

	useEffect(() => {
		const fetchHoot = async () => {
			const hootData = await hootService.show(hootId);
			// Find comment in fetched hoot data
			setFormData(
				hootData.comments.find((comment) => comment._id === commentId)
			);
		};
		if (hootId && commentId) fetchHoot();
	}, [hootId, commentId]);

	return (
		<main className={styles.container}>
			<form onSubmit={handleSubmit}>
				<h1>Edit Comment</h1>
				<label htmlFor='text-input'>Your comment:</label>
				<textarea
					required
					type='text'
					name='text'
					id='text-input'
					value={formData.text}
					onChange={handleChange}
				/>
				<button type='submit'>
					<Icon category='Create' />
				</button>
			</form>
		</main>
	);
};

export default CommentForm;
