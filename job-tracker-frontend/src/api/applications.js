const API_URI = 'http://localhost:8081/api/job-applications';

export async function fetchApplications() {
    const response = await fetch(API_URI);
    if (!response.ok) {
        throw new Error('Failed to fetch applications');
    }
    return response.json();
}

export async function createApplication(application) {
  const response = await fetch(API_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(application),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)

    const message =
      errorData?.messages
        ? Object.values(errorData.messages).join(', ')
        : errorData?.message || 'Failed to create application'

    throw new Error(message)
  }

  return response.json()
}