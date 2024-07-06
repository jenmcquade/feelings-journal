
import { React, useState, useEffect } from 'react';
import { submitNote } from '../../api/feelings';
import { setLoadingContext } from '../../actions/api';
import { useDispatch, useSelector } from 'react-redux';
import FeelingsCategory from './FeelingsCategory';

function applyFeelingStyles(feeling, parentBgColor, depth = 1) {
	feeling.color = typeof feeling.children != 'undefined' && feeling.children?.length > 0 ? parentBgColor.map(color => {
		const modifiedColor = color + (depth * 10);
		return modifiedColor > 255 ? 255 : modifiedColor;
	}) : parentBgColor;

	// Recursively apply styles to nested feelings, if any
	if (feeling.children && feeling.children.length > 0) {
		feeling.children = feeling.children.map((innerFeeling, index) => 
			applyFeelingStyles(innerFeeling, feeling.color, index + 1)
		);
	}
	
	return feeling;
}

function SubmitFeelings() {
	const [note, setNote] = useState('');
	const todaysNote = useSelector(state => state.api.todaysNote);
	const [submittedNote, setSubmittedNote] = useState(todaysNote);
	const [allFeelingsState, setAllFeelingsState] = useState([]);
	const allFeelings = useSelector(state => state.api.allFeelings);
	const dispatch = useDispatch();
	const feelingGroupColors = [
		[229, 135, 175],
		[238, 155, 151],
		[253, 235, 81],
		[151, 185, 122],
		[102, 173, 187],
		[142, 142, 185],
	];

	useEffect(() => {
		// Update allFeelings with updated styles
		if (!allFeelings || allFeelings.length == 0) {
			return;
		}

		const updatedFeelings = allFeelings.map((container, index) => {
			const updatedContainer = { ...container };
			updatedContainer.color = feelingGroupColors[index];
			updatedContainer.children = container.children.map((feeling, childIndex) => 
				applyFeelingStyles(feeling, updatedContainer.color, childIndex + 1)
			);
			return updatedContainer;
		});

		setAllFeelingsState(updatedFeelings);
	}, [allFeelings]);

	if (!allFeelings || allFeelings.length == 0) {
		return <div>Loading ...</div>;
	}

	const handleNoteInputChange = (e) => {
		setNote(e.target.value);
	};

	const handleNoteSubmit = async (e) => {
		e.preventDefault();

		try {
			dispatch(setLoadingContext(true));
			const setNote = await submitNote(note);

			if (setNote) {
				setSubmittedNote(setNote);
			}
		} catch (error) {
			console.error('There was an error submitting your note.');
		} finally {
			dispatch(setLoadingContext(false));
		}
	};

	return (
		<div>
			<h2 className="font-bold text-2xl text-center mb-4">How are you feeling today?</h2>
			{submittedNote != null
				? <div className="submitted-note mb-5 text-2xl text-center p-2 rounded-lg">
						<span>Your submitted note for today:</span> <br/>
						<span className="note-value">{submittedNote}</span>
				</div>
				: null
			}
			<div className="mb-5 text-center text-black">
				<form onSubmit={handleNoteSubmit}>
					<input placeholder="A small note about today ..." className="p-2 w-1/2 rounded-lg" type="text" value={note} onChange={handleNoteInputChange} />
					<button type="submit" className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
				</form>
			</div>

			<div className="grid lg:grid-cols-6 sm:grid-cols-3 gap-4 text-center font-bold text-white items-start">
			{allFeelingsState.map((container, index) => (
				<FeelingsCategory key={container.id} feelingData={{...container, index}} />
			))}
			</div>
		</div>
	);
}

export default SubmitFeelings;