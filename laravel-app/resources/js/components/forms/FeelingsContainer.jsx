import { useDispatch } from 'react-redux';
import { saveFeeling } from '../../api/feelings';
import { setFeelings } from '../../actions/api';

function FeelingsContainer(props) {
    const dispatch = useDispatch();
    let { color, textColor, text, children } = props;
    if (typeof color == 'undefined' || color.length != 3) {
        color = [0,0,0];
    }
    if (typeof textColor == 'undefined' || textColor.length != 3) {
        textColor = [0,0,0];
    }
    const bgColorStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
    const textColorStyle = `rgb(${textColor[0]},${textColor[1]},${textColor[2]})`;
    const className = typeof children === 'undefined' || children.length == 0 ?
        "no-child p-1 grid grid-cols-1 w-full text-sm mb-1" :
        "container p-1 grid grid-cols-1 border rounded-lg mb-2 gap-3";

    const saveFeelingInApi = async(e) => {
        debugger;
        e.target.classList.add('selected');
        const feelingId = e.target.getAttribute('feeling-id');
        try {
            const feelingData = await saveFeeling(feelingId);
            if (feelingData) {
                dispatch(setFeelings(feelingData));
            }
        } catch (error) {
            console.error('There was an error submitting your feelings. Please try again.');
        }
    }

	return (
		<div style={{ backgroundColor: bgColorStyle,  color: textColorStyle }} className={className}>
			<span feeling-id={props.id} className="feeling" onClick={saveFeelingInApi}>{text}</span>
            {typeof children === 'undefined' || children.length == 0  ? '' : <div>{children}</div>}
		</div>
	)
}

export default FeelingsContainer;