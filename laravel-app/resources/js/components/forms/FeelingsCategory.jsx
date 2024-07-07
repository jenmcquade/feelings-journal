import FeelingsContainer from "./FeelingsContainer";

const FeelingsCategory = ({ feelingData, topLevel }) => {
	if (typeof feelingData.color == 'undefined' || feelingData.color.length != 3) {
		feelingData.color = [0,0,0];
	}
	if (typeof feelingData.textColor == 'undefined' || feelingData.textColor.length != 3) {
		feelingData.textColor = [0,0,0];
	}

	return (
	  <FeelingsContainer topLevel={topLevel ?? false} key={feelingData.id} {...feelingData}>
		{feelingData.children && feelingData.children.map(function (nestedFeeling, index) {
		  return <FeelingsCategory key={nestedFeeling.id} feelingData={{...nestedFeeling, index}} />
		})}
	  </FeelingsContainer>
	);
  };

export default FeelingsCategory;