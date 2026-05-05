export async function getAllCoursesClient() {
  const response = await fetch('/api/course', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Erro ao buscar cursos: ${response.status}`);
  }
  return response.json();
}

export async function getCourseByIdClient(id: string) {
  const response = await fetch(`/api/course/${encodeURIComponent(id)}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Erro ao buscar curso ${id}: ${response.status}`);
  }
  return response.json();
}

export async function createCourseClient(payload: unknown) {
  const response = await fetch('/api/course', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Erro ao criar curso: ${response.status}`);
  }
  return response.json();
}

export async function deleteCourseClient(id: string) {
  const response = await fetch(`/api/course/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    cache: 'no-store',
  });

  console.log('Delete Response Status:', response.status);
  console.log('Delete Response Headers:', {
    contentType: response.headers.get('content-type'),
  });

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    try {
      const responseText = await response.text();
      console.log('Delete Response Text:', responseText);

      if (responseText) {
        const errorData = JSON.parse(responseText);
        console.log('Parsed Error Data:', errorData);
        errorMessage =
          errorData?.message ||
          errorData?.error ||
          errorData?.detail ||
          errorMessage;
      }
    } catch (e) {
      console.log('Error parsing response:', (e as Error).message);
    }
    throw new Error(`Erro ao deletar curso: ${errorMessage}`);
  }
  return response.json();
}
