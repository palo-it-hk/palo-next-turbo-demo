'use server';

export async function handleSubmitForm(data: FormData) {
  'use server';
  console.log('data is', data.get('name'));
  const name = data.get('name');
  console.log('I am from the server, your name is ', name);

  return JSON.stringify({ message: `Hello there, ${name}` });

  // do something with the data
}

export async function handleSubmitButton(id: string) {
  console.log('id is ', id);
}

let message = ['Hi Ho!'];

export async function send(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //   const newMessage = formData.get('message');
  console.log('this ran');
  message.push('decoyed!');
  return;
}

export async function getMessage() {
  return JSON.stringify({ message: message });
}
