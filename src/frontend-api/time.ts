export async function getTime(args: number | string | undefined) {
  const route = 'http://localhost:3000/api/data/time';

  try {
    let options: any = {};

    // you decide to revalidate by time intervals by choosing a number as an arg
    if (typeof args === 'number') {
      options.next = { revalidate: args };
      // you decide to revalidate by tags by choosing a string as an arg
    } else if (typeof args === 'string') {
      options.next = { tags: ['collection'] };
    }

    const res = await fetch(route, options);
    return res?.json();
  } catch (e) {
    return;
  }
}
