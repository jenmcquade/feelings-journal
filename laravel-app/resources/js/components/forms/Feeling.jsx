import React from 'react';

function Feeling(props) {
    let { bgColor, textColor, value } = props;

    if (typeof bgColor == 'undefined' || bgColor.length != 3) {
        bgColor = [0,0,0];
    }
    if (typeof textColor == 'undefined' || textColor.length != 3) {
        textColor = [255,255,255];
    }
    const bgColorStyle = `rgb(${bgColor[0]},${bgColor[1]},${bgColor[2]})`;
    const textColorStyle = `rgb(${textColor[0]},${textColor[1]},${textColor[2]})`;
    
	return (
		<div cclassName="w-full" style={{ backgroundColor: bgColorStyle, color: textColorStyle }}>
			<span>{value}</span>
		</div>
	)
}

export default Feeling;