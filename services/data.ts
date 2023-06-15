type Data = {
  message: string;
};

export async function getData(): Promise<Data> {
  try {
    const res = await fetch(`http://localhost:3000/api/data`, {
      cache: 'no-store',
    });
    return res.json();
  } catch (e) {
    return {
      message: '',
    };
  }
}
