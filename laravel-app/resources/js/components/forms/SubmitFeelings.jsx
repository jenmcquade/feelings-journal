
import { React, useState } from 'react';
import { submitFeelings } from '../../api/feelings';
import { setLoadingContext } from '../../actions/api';
import { useDispatch, useSelector } from 'react-redux';
import FeelingsContainer from './FeelingsContainer';
import Feeling from './Feeling';

function SubmitFeelings() {
	const [feelings, setFeelings] = useState('');
	const dispatch = useDispatch();
	const feelingsData = [
        {
            bgColor: [255,0,0],
            value: 'Anger',
            feelings: [
				{
					value: 'Enraged',
					feelings: [
						{ value: 'Hateful' },
						{ value: 'Hostile' },
					]
				},
				{
					value: 'Exasperated',
					feelings: [
						{ value: 'Frustrated' },
						{ value: 'Agitated' },
					]
				},
				{
					value: 'Irritable',
					feelings: [
						{ value: 'Annoyed' },
						{ value: 'Aggravated' },
					]
				},
				{
					value: 'Jealous',
					feelings: [
						{ value: 'Envious' },
						{ value: 'Resentful' },
					]
				},
				{
					value: 'Disgusted',
					feelings: [
						{ value: 'Revolted' },
						{ value: 'Contemptuous' },
					]
				},
			],
		},
	].map((container) => {
		container.feelings = container.feelings.map((feeling) => {
			feeling.bgColor = container.bgColor.map((color, index) => {
				return color + (index * 75);
			});
			feeling.feelings = feeling.feelings.map((innerFeeling) => {
				innerFeeling.bgColor = feeling.bgColor.map((color, index) => {
					return color + (index * 50);
				});
				return innerFeeling;
			});
			return feeling;
		});
		return container;
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			dispatch(setLoadingContext(true));
			const response = await submitFeelings(feelings);
		} catch (error) {
			console.error('There was an error submitting your feelings.');
		} finally {
			dispatch(setLoadingContext(false));
		}
	};

	return (
		<div>
			<h2 className="text-lg">How are you feeling today?</h2>
			<div className="grid grid-cols-6 gap-4 text-center font-bold text-white">
				{feelingsData.map((container, index) => (
					<FeelingsContainer key={index} bgColor={container.bgColor} value={container.value}>
						{container.feelings.map((feelingL1, index) => (
							<FeelingsContainer key={index} bgColor={feelingL1.bgColor} value={feelingL1.value}>
								{feelingL1.feelings.map((feelingL2, index) => (
									<Feeling key={index} value={feelingL2.value} bgColor={feelingL2.bgColor} />
								))}
							</FeelingsContainer>
					))}
					</FeelingsContainer>
				))}
			</div>
			<form onSubmit={handleSubmit}>
				<input type="text" value={feelings} onChange={(e) => setFeelings(e.target.value)} />
				<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
			</form>
		</div>

	);
}

export default SubmitFeelings;