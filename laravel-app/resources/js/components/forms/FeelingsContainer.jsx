import { useMemo, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveFeeling } from '../../api/feelings';
import { setFeelings, setLoadingContext } from '../../actions/api';
import { deepClone } from '../../api/utils';

function FeelingsContainer(props) {
    const dispatch = useDispatch();
    const todaysFeelings = useSelector(state => state.api.todaysFeelings);
    const allFeelings = useSelector(state => state.api.allFeelings);

    let { id, color, textColor, text, children, topLevel } = props;
    if (typeof color == 'undefined' || color.length != 3) {
        color = [0,0,0];
    }
    if (typeof textColor == 'undefined' || textColor.length != 3) {
        textColor = [0,0,0];
    }
    const bgColorStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
    const textColorStyle = `rgb($π{textColor[0]},${textColor[1]},${textColor[2]})`;
    const containerLevel = topLevel ? 'l1' : 'l2';
    const className = typeof children === 'undefined' || children.length == 0 ?
        "no-child p-1 grid grid-cols-1 w-full mb-1 l3" :
        "feelings-container p-1 grid grid-cols-1 border rounded-lg mb-2 gap-1 " + containerLevel;
    const feeling = useMemo(() => todaysFeelings.find(f => f.id == id) || {}, [todaysFeelings, id]);

    const findFeeling = (feelingContainer, targetId) => {
        if (feelingContainer.id == targetId) {
            delete feelingContainer.children;
            return feelingContainer;
        }
        if (feelingContainer.children && feelingContainer.children.length > 0) {
            for (const child of feelingContainer.children) {
                const result = findFeeling(child, targetId);
                if (result) return result;
            }
        }
        return null;
    }

    const sendSaveFeelings = async(e) => {
        e.target.classList.toggle('selected');
        try {
            dispatch(setLoadingContext(true));
        } catch (error) {
            console.error('There was an error setting the loading context.');
        }

        const feelingId = e.target.getAttribute('feeling-id');
        let foundFeeling = null;
        const feelingInTodaysFeelings = todaysFeelings.find(f => f.id == feelingId);

        if (feelingInTodaysFeelings) {
            const updatedTodaysFeelings = todaysFeelings.filter(f => f.id != feelingId);
            const action = setFeelings(updatedTodaysFeelings);

            try {
                dispatch(action);
                await saveFeeling(feelingId);
            }
            catch (error) {
                console.error('There was an error submitting your feelings. Please try again.');
            } finally {
                dispatch(setLoadingContext(false));
            }
            return;
        }

        const allFeelingsCopy = deepClone(allFeelings);
        for (const feelingContainer of allFeelingsCopy) {
            foundFeeling = findFeeling(feelingContainer, feelingId);
            if (foundFeeling) break;
        }
        if (foundFeeling) {
            const updatedTodaysFeelings = [...todaysFeelings, foundFeeling];
            const action = setFeelings(updatedTodaysFeelings);
            try {
                dispatch(action);
                await saveFeeling(feelingId);
            } catch (error) {
                console.error('There was an error submitting your feelings. Please try again.');
            } finally {
                dispatch(setLoadingContext(false));
            }
        }
    }

	return (
		<div style={{ backgroundColor: bgColorStyle,  color: textColorStyle }} className={className}>
			<span className={feeling.hasOwnProperty('id') ? 'feeling selected' : 'feeling'} feeling-id={props.id} onClick={sendSaveFeelings}>{text}</span>
            {typeof children === 'undefined' || children.length == 0  ? '' : <div>{children}</div>}
		</div>
	)
}

export default FeelingsContainer;