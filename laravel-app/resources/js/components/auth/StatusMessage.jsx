import React from 'react';

function StatusMessage({ message }) {
	// 

	return (
		<div className="mb-4 status-message">
			<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
				<span className="block sm:inline">{ message }</span>
			</div>
		</div>
	);
}

export default StatusMessage;