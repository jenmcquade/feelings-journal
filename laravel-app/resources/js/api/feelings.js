import call from './utils';

export async function saveFeeling(feelingId) {
    try {
        const response = await call('/api/feelings/feeling', 'POST', { "feeling_id": feelingId });

        if (response.status !== 200) {
            return 'There was an error submitting your feelings. Please try again.';
        } else {
            return response.data;
        }
    } catch (error) {
        return 'There was an error submitting your feelings. Please try again.';
    }
}

export async function submitNote(note) {
    try {
        const response = await call('/api/feelings/note', 'POST', { note });

        if (response.status !== 200) {
            return 'There was an error submitting your note. Please try again.';
        } else {
            return response.data.note;
        }
    } catch (error) {
        return 'There was an error submitting your note. Please try again.';
    }
}

export async function getAllFeelings() {
    try {
        const response = await call('/api/feelings/all', 'GET', {});

        if (response.status !== 200) {
            return 'There was an error retrieving feelings. Please try again.';
        } else {
            return response.data;
        }
    } catch (error) {
        return 'There was an error retrieving feelings. Please try again.';
    }
}
