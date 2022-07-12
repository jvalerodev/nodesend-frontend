const ErrorForm = ({ value }) => {
  return (
    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4 rounded">
      <p className="font-bold">Error</p>
      <p>{value}</p>
    </div>
  );
};

export default ErrorForm;