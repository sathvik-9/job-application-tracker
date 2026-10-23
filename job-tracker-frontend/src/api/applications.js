const API_URI = 'http://localhost:8081/api/job-applications';

export async function fetchApplications() {
    const response = await fetch(API_URI);
    if (!response.ok) {
        throw new Error('Failed to fetch applications');
    }
    return response.json();
}