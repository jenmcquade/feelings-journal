import call from './utils';

export async function submitFeelings(feelings) {
    try {
        const response = await call('/api/feelings', 'POST', { feelings });

        if (response.status !== 200) {
            return 'There was an error submitting your feelings. Please try again.';
        } else {
            return response.data;
        }
    } catch (error) {
        return 'There was an error submitting your feelings. Please try again.';
    }
}
