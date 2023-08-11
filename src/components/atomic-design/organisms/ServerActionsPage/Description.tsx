type Params = {
  params: {
    description: string;
    method: string;
  };
  optionNumber: number;
};

function InvocationDescription({ params, optionNumber }: Params) {
  const { description, method } = params;
  return (
    <>
      <p className="font-bold">
        Option {optionNumber}: Invocation with{' '}
        <span className="text-primary">{method}</span>
      </p>
      <p className="mb-3">{description}</p>
    </>
  );
}

export default InvocationDescription;
