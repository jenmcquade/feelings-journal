import React from 'react';

function FeelingsContainer(props) {
    let { bgColor, textColor, value, children } = props;
    if (typeof bgColor == 'undefined' || bgColor.length != 3) {
        bgColor = [0,0,0];
    }
    if (typeof textColor == 'undefined' || textColor.length != 3) {
        textColor = [255,255,255];
    }
    const bgColorStyle = `rgb(${bgColor[0]},${bgColor[1]},${bgColor[2]})`;
    const textColorStyle = `rgb(${textColor[0]},${textColor[1]},${textColor[2]})`;
    
	return (
		<div style={{ backgroundColor: bgColorStyle,  color: textColorStyle }} className="p-1 gap-2 border border-white grid grid-cols-1">
			<span>{value}</span>
			<div className="border border-white">
				{children}
			</div>
		</div>
	)
}

export default FeelingsContainer;