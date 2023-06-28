'use server';

export async function handleSubmitForm(data: FormData) {
  console.log('data is', data.get('name'));
  const name = data.get('name');
  console.log('I am from the server, your name is ', name);

  return JSON.stringify({ message: `Hello there, ${name}` });

  // do something with the data
}

export async function handleSubmitButton(id: string) {
  return JSON.stringify({ id: id });
}

let tasks = ['Mow the lawn'];

export async function send(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //   const newMessage = formData.get('message');
  tasks.push('decoyed!');
  return;
}

export async function getTasks() {
  return JSON.stringify({ tasks: tasks });
}

export async function doSomething() {
  console.log('task received');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log('did something');
  return;
}
